import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { CONFIG } from '../config/index.js';
import { DB } from '../db/index.js';
import { authMiddleware, AuthenticatedRequest, requireRole } from '../middlewares/auth.js';
import { digitalBuilder } from '../services/builder/index.js';
import { mediaService } from '../services/media/index.js';
import { orchestrator } from '../services/agents/index.js';
import { selfHealing } from '../services/self_healing/index.js';

export const apiRouter = Router();

// ==============================================================================
// 1. HEALTHCHECK & STATUS DO SISTEMA
// ==============================================================================
apiRouter.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    system: 'Moura.ai Core Engine',
    version: '1.0.0',
    tokensUnlimited: CONFIG.TOKENS_UNLIMITED,
    timestamp: new Date().toISOString(),
    github: CONFIG.GITHUB_REPO,
    activePlans: Object.keys(CONFIG.PLANS)
  });
});

// ==============================================================================
// 2. AUTENTICAÇÃO E SESSÃO
// ==============================================================================
apiRouter.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    return;
  }

  const user = DB.findUserByEmail(email);
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    res.status(401).json({ error: 'Credenciais inválidas. Verifique seu email e senha.' });
    return;
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role, planId: user.planId },
    CONFIG.JWT_SECRET,
    { expiresIn: '7d' }
  );

  DB.logAudit(user.id, 'user_login', 'auth', { email: user.email });

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      planId: user.planId
    },
    plan: CONFIG.PLANS[user.planId]
  });
});

apiRouter.post('/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
    return;
  }

  if (DB.findUserByEmail(email)) {
    res.status(409).json({ error: 'Este email já está cadastrado na Moura.ai.' });
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  const user = DB.createUser({
    name,
    email,
    passwordHash: bcrypt.hashSync(password, salt),
    role: 'creator',
    planId: 'free',
    organizationId: `org_${Date.now()}`
  });

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role, planId: user.planId },
    CONFIG.JWT_SECRET,
    { expiresIn: '7d' }
  );

  DB.logAudit(user.id, 'user_registered', 'auth', { email: user.email });

  res.status(201).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      planId: user.planId
    },
    plan: CONFIG.PLANS.free
  });
});

apiRouter.get('/auth/me', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const user = DB.findUserById(req.user!.id);
  if (!user) {
    res.status(404).json({ error: 'Usuário não encontrado.' });
    return;
  }

  const usage = DB.getOrCreateTodayUsage(user.id);
  const plan = CONFIG.PLANS[user.planId] || CONFIG.PLANS.free;

  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      planId: user.planId
    },
    plan,
    usage,
    tokensUnlimited: CONFIG.TOKENS_UNLIMITED
  });
});

// ==============================================================================
// 3. PLANOS, COTAS E UPGRADE
// ==============================================================================
apiRouter.get('/plans', (req, res) => {
  res.json({
    plans: CONFIG.PLANS,
    tokensUnlimited: CONFIG.TOKENS_UNLIMITED
  });
});

apiRouter.post('/plans/upgrade', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const { planId } = req.body;
  if (!planId || !CONFIG.PLANS[planId]) {
    res.status(400).json({ error: 'Plano inválido especificado.' });
    return;
  }

  DB.updateUserPlan(req.user!.id, planId);
  DB.logAudit(req.user!.id, 'plan_upgraded', 'plan_change', { newPlan: planId });

  res.json({
    success: true,
    message: `Plano atualizado com sucesso para ${CONFIG.PLANS[planId].name}!`,
    plan: CONFIG.PLANS[planId]
  });
});

// ==============================================================================
// 4. DIGITAL PRODUCT BUILDER (SITES WHATSAPP & MICRO-SAAS)
// ==============================================================================
apiRouter.post('/builder/whatsapp-site', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const quota = DB.checkQuota(userId, 'sites');

  if (!quota.allowed) {
    res.status(429).json({
      error: `Limite diário de criação de sites atingido para o ${quota.planName} (${quota.current}/${quota.limit}). Faça upgrade para o Plano Pro (32/dia), Ultra (80/dia) ou Galaxi (200/dia)!`,
      quota
    });
    return;
  }

  const { businessName, whatsappNumber, headline, subheadline, products } = req.body;

  const site = digitalBuilder.buildWhatsAppSite({
    businessName: businessName || 'Minha Empresa Digital',
    whatsappNumber: whatsappNumber || '5511999999999',
    headline: headline || 'Atendimento Rápido e Fechamento Direto no WhatsApp',
    subheadline: subheadline || 'Tire suas dúvidas, veja produtos e faça seu pedido em menos de 1 minuto.',
    products: products || [
      { name: 'Consultoria Especializada', description: 'Diagnóstico estratégico completo com plano de ação.', price: 'R$ 197,00', badge: 'Mais Procurado' },
      { name: 'Implementação Rápida', description: 'Configuração e entrega em até 48 horas úteis.', price: 'R$ 497,00', badge: 'Recomendado' },
      { name: 'Suporte VIP Mensal', description: 'Acompanhamento prioritário e evolução contínua.', price: 'R$ 297,00/mês' }
    ]
  });

  // Salva no banco de projetos
  const project = DB.createProject({
    userId,
    name: businessName || 'Site para WhatsApp',
    type: 'website_whatsapp',
    description: `Site de alta conversão para WhatsApp com foco em fechamento direto.`,
    files: site.files,
    previewHtml: site.previewHtml,
    status: 'completed'
  });

  DB.incrementUsage(userId, 'sites', 1200);
  DB.logAudit(userId, 'whatsapp_site_created', 'generation', { projectId: project.id });

  res.json({
    success: true,
    projectId: project.id,
    previewHtml: site.previewHtml,
    files: site.files,
    remainingDaily: quota.limit - (quota.current + 1)
  });
});

apiRouter.post('/builder/microsaas', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const quota = DB.checkQuota(userId, 'saas');

  if (!quota.allowed) {
    res.status(429).json({
      error: `Limite diário de criação de Micro-SaaS atingido para o ${quota.planName} (${quota.current}/${quota.limit}). Faça upgrade para ter cotas de até 200/dia!`,
      quota
    });
    return;
  }

  const { name, niche, problemSolved, features } = req.body;

  const saas = digitalBuilder.buildMicroSaaS({
    name: name || 'LeadFlow AI',
    niche: niche || 'Imobiliárias e Corretores',
    problemSolved: problemSolved || 'Captura e qualificação autônoma de leads via WhatsApp',
    features: features || [
      'Disparo de mensagens no fechamento',
      'Painel de métricas em tempo real',
      'Integração com n8n e CRM'
    ]
  });

  const project = DB.createProject({
    userId,
    name: name || 'Micro-SaaS Operacional',
    type: 'micro_saas',
    description: `Micro-SaaS para ${niche}`,
    files: saas.files,
    previewHtml: saas.previewHtml,
    status: 'completed'
  });

  DB.incrementUsage(userId, 'saas', 2500);
  DB.logAudit(userId, 'microsaas_created', 'generation', { projectId: project.id });

  res.json({
    success: true,
    projectId: project.id,
    previewHtml: saas.previewHtml,
    files: saas.files,
    remainingDaily: quota.limit - (quota.current + 1)
  });
});

// ==============================================================================
// 5. ESTÚDIO DE MÍDIA (VÍDEOS, REELS, SHORTS & CARROSSEIS)
// ==============================================================================
apiRouter.post('/media/viral-script', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const quota = DB.checkQuota(userId, 'videos');

  if (!quota.allowed) {
    res.status(429).json({
      error: `Limite diário de geração de roteiros de vídeos/reels atingido para o ${quota.planName} (${quota.current}/${quota.limit}).`,
      quota
    });
    return;
  }

  const { topic, niche, tone } = req.body;
  const script = mediaService.generateViralScript({
    topic: topic || 'Como vender 3x mais no WhatsApp',
    niche: niche || 'Vendas Digitais',
    tone: tone || 'impactante'
  });

  DB.incrementUsage(userId, 'videos', 900);
  DB.logAudit(userId, 'viral_script_generated', 'generation', { topic });

  res.json({
    success: true,
    script,
    remainingDaily: quota.limit - (quota.current + 1)
  });
});

apiRouter.post('/media/carousel', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const quota = DB.checkQuota(userId, 'images');

  if (!quota.allowed) {
    res.status(429).json({
      error: `Limite diário de imagens/carrosséis atingido para o ${quota.planName} (${quota.current}/${quota.limit}).`,
      quota
    });
    return;
  }

  const { title, niche } = req.body;
  const carousel = mediaService.generateCarousel({
    title: title || '5 Passos para Criar seu Negócio de IA em 2026',
    niche: niche || 'Tecnologia & Negócios'
  });

  DB.incrementUsage(userId, 'images', 800);
  DB.logAudit(userId, 'carousel_generated', 'generation', { title });

  res.json({
    success: true,
    carousel,
    remainingDaily: quota.limit - (quota.current + 1)
  });
});

// ==============================================================================
// 6. ORQUESTRADOR MULTI-AGENTE & AGENTES ESPECIALIZADOS
// ==============================================================================
apiRouter.post('/agents/orchestrate', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const quota = DB.checkQuota(userId, 'agents');

  if (!quota.allowed) {
    res.status(429).json({
      error: `Limite diário de tarefas com agentes atingido para o ${quota.planName}.`,
      quota
    });
    return;
  }

  const { objective, category } = req.body;
  if (!objective) {
    res.status(400).json({ error: 'O objetivo da solicitação é obrigatório.' });
    return;
  }

  try {
    const result = await orchestrator.orchestrate({
      objective,
      category: category || 'research',
      userId
    });

    DB.incrementUsage(userId, 'agents', 3200);
    DB.logAudit(userId, 'multi_agent_orchestration', 'generation', { objective });

    res.json({
      success: true,
      result,
      remainingDaily: quota.limit - (quota.current + 1)
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Erro durante orquestração de agentes: ' + err.message });
  }
});

apiRouter.get('/agents', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const agents = DB.listAgentsByUser(req.user!.id);
  res.json({ agents });
});

apiRouter.post('/agents', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const { name, specialty, systemPrompt, tools } = req.body;
  if (!name || !specialty || !systemPrompt) {
    res.status(400).json({ error: 'Nome, especialidade e prompt do sistema são obrigatórios.' });
    return;
  }

  const agent = DB.createAgent({
    userId: req.user!.id,
    name,
    specialty,
    systemPrompt,
    tools: tools || ['wa_bridge', 'n8n_trigger'],
    status: 'active'
  });

  DB.logAudit(req.user!.id, 'custom_agent_created', 'generation', { agentId: agent.id });

  res.status(201).json({ success: true, agent });
});

// ==============================================================================
// 7. CONSOLE DE AUTOCORREÇÃO (SELF-HEALING LOOP)
// ==============================================================================
apiRouter.post('/self-healing/diagnose', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const { code, language } = req.body;
  if (!code || !language) {
    res.status(400).json({ error: 'Código e linguagem são obrigatórios.' });
    return;
  }

  const result = selfHealing.runDiagnosticCycle(code, language);
  res.json(result);
});

apiRouter.get('/self-healing/logs', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const logs = DB.listSelfHealingLogs();
  res.json({ logs });
});

// ==============================================================================
// 8. AUTOMAÇÕES N8N & WEBHOOKS
// ==============================================================================
apiRouter.get('/n8n/webhooks', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const webhooks = DB.listN8NWebhooks(req.user!.id);
  res.json({ webhooks });
});

apiRouter.post('/n8n/trigger', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const { webhookId, eventName, payload } = req.body;
  
  if (webhookId) {
    DB.updateN8NWebhookTriggered(webhookId);
  }

  DB.logAudit(req.user!.id, 'n8n_triggered', 'n8n_webhook', { eventName, payload });

  // Tenta disparo HTTP real para a URL configurada se informada
  let externalStatus = 'simulated';
  if (CONFIG.N8N_WEBHOOK_URL) {
    try {
      await fetch(CONFIG.N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Moura-Signature': CONFIG.N8N_SECRET_TOKEN
        },
        body: JSON.stringify({
          event: eventName || 'moura_ai_event',
          userId: req.user!.id,
          payload,
          timestamp: new Date().toISOString()
        })
      });
      externalStatus = 'sent';
    } catch (_) {
      externalStatus = 'queued';
    }
  }

  res.json({
    success: true,
    message: 'Evento disparado para a esteira do n8n com sucesso.',
    event: eventName,
    externalStatus,
    timestamp: new Date().toISOString()
  });
});

// Endpoint seguro receptor de webhooks vindos do n8n
apiRouter.post('/n8n/receiver', (req, res) => {
  const signature = req.headers['x-moura-signature'];
  if (signature !== CONFIG.N8N_SECRET_TOKEN) {
    res.status(403).json({ error: 'Assinatura de webhook n8n inválida ou ausente.' });
    return;
  }

  const { action, data } = req.body;
  DB.logAudit('system_n8n', 'n8n_incoming_webhook', 'n8n_webhook', { action, data });

  res.json({
    success: true,
    message: 'Webhook n8n processado pela Moura.ai com sucesso.',
    receivedAt: new Date().toISOString()
  });
});

// ==============================================================================
// 9. PAINEL ADMINISTRATIVO PROTEGIDO
// ==============================================================================
apiRouter.get('/admin/metrics', authMiddleware, requireRole(['admin']), (req: AuthenticatedRequest, res: Response) => {
  const users = DB.listUsers();
  const auditLogs = DB.listAuditLogs();
  const selfHealingLogs = DB.listSelfHealingLogs();

  const totalTokens = users.reduce((acc, u) => {
    const usage = DB.getOrCreateTodayUsage(u.id);
    return acc + usage.tokensUsed;
  }, 0);

  res.json({
    totalUsers: users.length,
    usersByPlan: {
      free: users.filter(u => u.planId === 'free').length,
      pro: users.filter(u => u.planId === 'pro').length,
      ultra: users.filter(u => u.planId === 'ultra').length,
      galaxi: users.filter(u => u.planId === 'galaxi').length
    },
    totalTokensConsumedToday: totalTokens,
    tokensPolicy: 'ILIMITADO PARA TODOS OS PLANOS',
    totalSelfHealingEvents: selfHealingLogs.length,
    recentAuditLogs: auditLogs.slice(0, 20),
    systemHealth: '100% Operacional'
  });
});

apiRouter.get('/admin/users', authMiddleware, requireRole(['admin']), (req: AuthenticatedRequest, res: Response) => {
  const users = DB.listUsers().map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    planId: u.planId,
    createdAt: u.createdAt
  }));
  res.json({ users });
});
