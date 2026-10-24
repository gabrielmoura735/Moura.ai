import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { User, DailyUsage, Project, CustomAgent, SelfHealingLog, AuditLog, N8NWebhook } from '../models/index.js';
import { CONFIG } from '../config/index.js';

interface DatabaseSchema {
  users: User[];
  dailyUsage: DailyUsage[];
  projects: Project[];
  agents: CustomAgent[];
  selfHealingLogs: SelfHealingLog[];
  auditLogs: AuditLog[];
  n8nWebhooks: N8NWebhook[];
}

class DatabaseService {
  private dbPath: string;
  private data: DatabaseSchema;
  private saveTimeout: NodeJS.Timeout | null = null;

  constructor() {
    const dataDir = path.resolve(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    this.dbPath = path.join(dataDir, 'moura_database.json');
    this.data = this.loadDatabase();
    this.seedDefaultData();
  }

  private loadDatabase(): DatabaseSchema {
    if (fs.existsSync(this.dbPath)) {
      try {
        const raw = fs.readFileSync(this.dbPath, 'utf-8');
        return JSON.parse(raw);
      } catch (err) {
        console.warn('Erro ao carregar banco de dados, inicializando nova base limpa.', err);
      }
    }
    return {
      users: [],
      dailyUsage: [],
      projects: [],
      agents: [],
      selfHealingLogs: [],
      auditLogs: [],
      n8nWebhooks: []
    };
  }

  private persist() {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    this.saveTimeout = setTimeout(() => {
      try {
        const tempPath = `${this.dbPath}.tmp`;
        fs.writeFileSync(tempPath, JSON.stringify(this.data, null, 2), 'utf-8');
        fs.renameSync(tempPath, this.dbPath);
      } catch (err) {
        console.error('Erro ao persistir banco de dados:', err);
      }
    }, 100);
  }

  private seedDefaultData() {
    if (this.data.users.length === 0) {
      const salt = bcrypt.genSaltSync(10);
      
      // Admin padrão (Mouras-World)
      const adminUser: User = {
        id: uuidv4(),
        name: 'Gabriel Moura (Admin)',
        email: 'admin@moura.ai',
        passwordHash: bcrypt.hashSync('moura123456', salt),
        role: 'admin',
        planId: 'galaxi',
        organizationId: 'org_mouras_world',
        createdAt: new Date().toISOString()
      };

      // Usuário Demonstração (Plano Pro)
      const demoUser: User = {
        id: uuidv4(),
        name: 'Empreendedor Pro Demo',
        email: 'demo@moura.ai',
        passwordHash: bcrypt.hashSync('demo123456', salt),
        role: 'creator',
        planId: 'pro',
        organizationId: 'org_demo_lab',
        createdAt: new Date().toISOString()
      };

      this.data.users.push(adminUser, demoUser);

      // Seed Agentes Especializados Padrão da Moura.ai
      const defaultAgents: CustomAgent[] = [
        {
          id: uuidv4(),
          userId: adminUser.id,
          name: 'Moura SDR — Vendas & WhatsApp',
          specialty: 'vendas_sdr',
          systemPrompt: 'Você é um especialista em conversão e vendas no WhatsApp. Aborda o cliente com empatia, descobre necessidades, contorna objeções com segurança e conduz ao fechamento com link direto.',
          tools: ['wa_link_generator', 'faq_kb', 'checkout_bridge'],
          status: 'active',
          createdAt: new Date().toISOString()
        },
        {
          id: uuidv4(),
          userId: adminUser.id,
          name: 'Moura SAC — Suporte & Triagem',
          specialty: 'atendimento_sac',
          systemPrompt: 'Você é o agente de suporte inteligente. Resolve dúvidas instantaneamente, consulta pedidos e escalona chamados complexos para atendimento humano com resumo estruturado.',
          tools: ['ticket_creator', 'order_status', 'sentiment_analyzer'],
          status: 'active',
          createdAt: new Date().toISOString()
        },
        {
          id: uuidv4(),
          userId: adminUser.id,
          name: 'Moura Imóveis — Consultor Imobiliário',
          specialty: 'imobiliario',
          systemPrompt: 'Você é o consultor de imóveis de alta performance. Identifica localização, orçamento, número de quartos e agenda visitas no WhatsApp dos corretores.',
          tools: ['property_catalog', 'schedule_calendar', 'lead_scorer'],
          status: 'active',
          createdAt: new Date().toISOString()
        },
        {
          id: uuidv4(),
          userId: adminUser.id,
          name: 'Moura Dev — Engenheiro Full-Stack',
          specialty: 'software_dev',
          systemPrompt: 'Você é o arquiteto e desenvolvedor sênior. Escreve código limpo, cria Micro-SaaS, analisa erros, gera testes automatizados e executa patches de autocorreção.',
          tools: ['code_sandbox', 'test_runner', 'git_automator'],
          status: 'active',
          createdAt: new Date().toISOString()
        }
      ];

      this.data.agents.push(...defaultAgents);

      // Seed Webhook n8n inicial
      this.data.n8nWebhooks.push({
        id: uuidv4(),
        userId: adminUser.id,
        name: 'Disparador de Leads WhatsApp para n8n',
        triggerEvent: 'whatsapp_lead_received',
        targetUrl: CONFIG.N8N_WEBHOOK_URL,
        secretToken: CONFIG.N8N_SECRET_TOKEN,
        status: 'active',
        createdAt: new Date().toISOString()
      });

      this.persist();
    }
  }

  // --- MÉTODOS DE USUÁRIO ---
  public findUserByEmail(email: string): User | undefined {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  public findUserById(id: string): User | undefined {
    return this.data.users.find(u => u.id === id);
  }

  public createUser(user: Omit<User, 'id' | 'createdAt'>): User {
    const newUser: User = {
      ...user,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };
    this.data.users.push(newUser);
    this.persist();
    return newUser;
  }

  public updateUserPlan(userId: string, planId: 'free' | 'pro' | 'ultra' | 'galaxi'): boolean {
    const user = this.findUserById(userId);
    if (!user) return false;
    user.planId = planId;
    this.persist();
    return true;
  }

  public listUsers(): User[] {
    return this.data.users;
  }

  // --- MÉTODOS DE CONTROLE DIÁRIO E COTAS ---
  public getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  public getOrCreateTodayUsage(userId: string): DailyUsage {
    const today = this.getTodayDate();
    let usage = this.data.dailyUsage.find(u => u.userId === userId && u.date === today);
    if (!usage) {
      usage = {
        id: uuidv4(),
        userId,
        date: today,
        imagesCount: 0,
        sitesCount: 0,
        saasCount: 0,
        enterpriseCount: 0,
        videosCount: 0,
        researchCount: 0,
        agentsCount: 0,
        tokensUsed: 0
      };
      this.data.dailyUsage.push(usage);
      this.persist();
    }
    return usage;
  }

  public checkQuota(userId: string, category: 'images' | 'sites' | 'saas' | 'enterprise' | 'videos' | 'research' | 'agents'): {
    allowed: boolean;
    current: number;
    limit: number;
    planName: string;
    unlimitedTokens: boolean;
  } {
    const user = this.findUserById(userId);
    const planId = user ? user.planId : 'free';
    const plan = CONFIG.PLANS[planId] || CONFIG.PLANS.free;
    const usage = this.getOrCreateTodayUsage(userId);

    const limit = category === 'images' ? plan.dailyImagesLimit : plan.dailyGenerationLimit;

    let current = 0;
    if (category === 'images') current = usage.imagesCount;
    else if (category === 'sites') current = usage.sitesCount;
    else if (category === 'saas') current = usage.saasCount;
    else if (category === 'enterprise') current = usage.enterpriseCount;
    else if (category === 'videos') current = usage.videosCount;
    else if (category === 'research') current = usage.researchCount;
    else if (category === 'agents') current = usage.agentsCount;

    return {
      allowed: current < limit,
      current,
      limit,
      planName: plan.name,
      unlimitedTokens: CONFIG.TOKENS_UNLIMITED
    };
  }

  public incrementUsage(userId: string, category: 'images' | 'sites' | 'saas' | 'enterprise' | 'videos' | 'research' | 'agents', tokensAdded = 1500) {
    const usage = this.getOrCreateTodayUsage(userId);
    if (category === 'images') usage.imagesCount += 1;
    else if (category === 'sites') usage.sitesCount += 1;
    else if (category === 'saas') usage.saasCount += 1;
    else if (category === 'enterprise') usage.enterpriseCount += 1;
    else if (category === 'videos') usage.videosCount += 1;
    else if (category === 'research') usage.researchCount += 1;
    else if (category === 'agents') usage.agentsCount += 1;

    usage.tokensUsed += tokensAdded;
    this.persist();
  }

  // --- MÉTODOS DE PROJETOS ---
  public listProjectsByUser(userId: string): Project[] {
    return this.data.projects.filter(p => p.userId === userId);
  }

  public getProjectById(id: string): Project | undefined {
    return this.data.projects.find(p => p.id === id);
  }

  public createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project {
    const newProject: Project = {
      ...project,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.data.projects.unshift(newProject);
    this.persist();
    return newProject;
  }

  public updateProject(id: string, updates: Partial<Project>): Project | undefined {
    const proj = this.getProjectById(id);
    if (!proj) return undefined;
    Object.assign(proj, updates, { updatedAt: new Date().toISOString() });
    this.persist();
    return proj;
  }

  // --- MÉTODOS DE AGENTES ---
  public listAgentsByUser(userId: string): CustomAgent[] {
    return this.data.agents.filter(a => a.userId === userId || a.userId === 'admin');
  }

  public createAgent(agent: Omit<CustomAgent, 'id' | 'createdAt'>): CustomAgent {
    const newAgent: CustomAgent = {
      ...agent,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };
    this.data.agents.unshift(newAgent);
    this.persist();
    return newAgent;
  }

  // --- MÉTODOS DE AUTOCORREÇÃO (SELF-HEALING LOGS) ---
  public logSelfHealing(log: Omit<SelfHealingLog, 'id' | 'createdAt'>): SelfHealingLog {
    const entry: SelfHealingLog = {
      ...log,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };
    this.data.selfHealingLogs.unshift(entry);
    this.persist();
    return entry;
  }

  public listSelfHealingLogs(): SelfHealingLog[] {
    return this.data.selfHealingLogs;
  }

  // --- MÉTODOS DE AUDITORIA ---
  public logAudit(userId: string, action: string, category: AuditLog['category'], details: Record<string, any>): AuditLog {
    const entry: AuditLog = {
      id: uuidv4(),
      userId,
      action,
      category,
      details,
      createdAt: new Date().toISOString()
    };
    this.data.auditLogs.unshift(entry);
    this.persist();
    return entry;
  }

  public listAuditLogs(): AuditLog[] {
    return this.data.auditLogs;
  }

  // --- MÉTODOS DE WEBHOOKS n8n ---
  public listN8NWebhooks(userId: string): N8NWebhook[] {
    return this.data.n8nWebhooks.filter(w => w.userId === userId);
  }

  public createN8NWebhook(webhook: Omit<N8NWebhook, 'id' | 'createdAt'>): N8NWebhook {
    const entry: N8NWebhook = {
      ...webhook,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };
    this.data.n8nWebhooks.unshift(entry);
    this.persist();
    return entry;
  }

  public updateN8NWebhookTriggered(id: string) {
    const hook = this.data.n8nWebhooks.find(w => w.id === id);
    if (hook) {
      hook.lastTriggeredAt = new Date().toISOString();
      this.persist();
    }
  }
}

export const DB = new DatabaseService();
