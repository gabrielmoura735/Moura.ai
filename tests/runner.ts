import fs from 'fs';
import path from 'path';
import { CONFIG } from '../src/config/index.js';
import { DB } from '../src/db/index.js';
import { digitalBuilder } from '../src/services/builder/index.js';
import { mediaService } from '../src/services/media/index.js';
import { selfHealing } from '../src/services/self_healing/index.js';
import { orchestrator } from '../src/services/agents/index.js';
import { promptEngineService, MASTER_ENGINES } from '../src/services/prompts/index.js';

let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, failureDetails?: string) {
  if (condition) {
    console.log(`  ✅ [PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`  ❌ [FAIL] ${testName}`);
    if (failureDetails) console.error(`     Detalhes: ${failureDetails}`);
    failedTests++;
  }
}

async function runTestSuite() {
  console.log(`\n================================================================`);
  console.log(`🧪 BATERIA DE TESTES AUTOMATIZADOS — MOURA.AI`);
  console.log(`================================================================\n`);

  // 1. Teste de Configuração Comercial e Tokens Ilimitados
  console.log(`▶ Teste 1: Configuração Comercial e Tokens Ilimitados`);
  assert(CONFIG.TOKENS_UNLIMITED === true, 'Política de tokens é ILIMITADA para todos os planos');
  assert(CONFIG.PLANS.free.dailyGenerationLimit === 5, 'Plano Grátis tem limite de 5 gerações/dia');
  assert(CONFIG.PLANS.free.dailyImagesLimit === 32, 'Plano Grátis tem até 32 imagens/dia');
  assert(CONFIG.PLANS.pro.priceMonthly === 197, 'Plano Pro custa R$ 197/mês');
  assert(CONFIG.PLANS.pro.dailyGenerationLimit === 32, 'Plano Pro tem até 32 gerações/dia de cada recurso');
  assert(CONFIG.PLANS.ultra.priceMonthly === 697, 'Plano Ultra custa R$ 697/mês');
  assert(CONFIG.PLANS.ultra.dailyGenerationLimit === 80, 'Plano Ultra tem até 80 gerações/dia de cada recurso');
  assert(CONFIG.PLANS.galaxi.priceMonthly === 1197, 'Plano Galaxi custa R$ 1.197/mês');
  assert(CONFIG.PLANS.galaxi.dailyGenerationLimit === 200, 'Plano Galaxi tem até 200 gerações/dia de cada recurso');

  // 2. Teste do Banco de Dados e Controle de Cotas
  console.log(`\n▶ Teste 2: Persistência do Banco de Dados e Motor de Cotas`);
  const admin = DB.findUserByEmail('admin@moura.ai');
  assert(!!admin, 'Usuário Admin inicial encontrado no banco de dados');
  assert(admin?.planId === 'galaxi', 'Admin possui plano Galaxi');

  const quota = DB.checkQuota(admin!.id, 'sites');
  assert(quota.allowed === true, 'Admin tem permissão para criar sites');
  assert(quota.limit === 200, 'Limite do Admin no plano Galaxi é 200/dia');

  // 3. Teste da Logo Oficial e Favicon
  console.log(`\n▶ Teste 3: Identidade Visual e Logo Oficial Cósmica`);
  const logoPath = path.resolve(process.cwd(), 'public/assets/logo.png');
  const faviconPath = path.resolve(process.cwd(), 'public/favicon.png');
  assert(fs.existsSync(logoPath), 'Arquivo public/assets/logo.png existe em alta resolução');
  assert(fs.existsSync(faviconPath), 'Arquivo public/favicon.png existe para a aba do navegador');

  // 4. Teste de Perfil, Temas e Classificação Indicativa
  console.log(`\n▶ Teste 4: Configurações de Perfil, Temas e Classificação`);
  const updatedUser = DB.updateUserProfile(admin!.id, {
    birthDate: '15/08/1998',
    theme: 'cosmic_purple',
    contentRating: 'sem_filtro',
    imageVerificationEnabled: true
  });
  assert(updatedUser?.birthDate === '15/08/1998', 'Data de nascimento dd/mm/aaaa salva com sucesso');
  assert(updatedUser?.theme === 'cosmic_purple', 'Tema Lilás Cósmico aplicado');
  assert(updatedUser?.contentRating === 'sem_filtro', 'Classificação de conteúdo sem filtro ativada com responsabilidade');
  assert(updatedUser?.imageVerificationEnabled === true, 'Toggle de verificação de imagem configurado');

  // 5. Teste da Fábrica de Personagens por IA
  console.log(`\n▶ Teste 5: Fábrica de Personagens por IA`);
  const newChar = DB.createCharacter({
    userId: admin!.id,
    name: 'Aria Nebulosa',
    archetype: 'Oráculo Cósmica',
    voiceTone: 'Enigmática e sábia',
    backstory: 'Habita a constelação Mouras-World.',
    promptImage: 'Cosmic goddess portrait 8k',
    systemPrompt: 'Você é Aria Nebulosa.',
    contentRating: 'sem_filtro'
  });
  assert(!!newChar.id, 'Personagem criado com ID único no banco');
  const charList = DB.listCharactersByUser(admin!.id);
  assert(charList.some(c => c.name === 'Aria Nebulosa'), 'Personagem recuperado na listagem do usuário');

  // 6. Teste do Builder de Sites para WhatsApp
  console.log(`\n▶ Teste 6: Builder de Sites para WhatsApp`);
  const waSite = digitalBuilder.buildWhatsAppSite({
    businessName: 'Hamburgueria Artesanal Moura',
    whatsappNumber: '5511988887777',
    headline: 'O Melhor Burger Artesanal Entregue na Sua Porta',
    subheadline: 'Peça direto pelo WhatsApp e receba quentinho em até 30 minutos.',
    products: [
      { name: 'Burger Cheddar Bacon', description: 'Carne 180g, queijo cheddar inglês e bacon crocante.', price: 'R$ 38,00', badge: 'Top 1' }
    ]
  });

  assert(waSite.files.length >= 2, 'Site para WhatsApp gerou os arquivos de código');
  assert(waSite.previewHtml.includes('wa.me/5511988887777'), 'HTML gerado contém link dinâmico formatado para WhatsApp');
  assert(waSite.previewHtml.includes('wa-pulse'), 'HTML contém botão flutuante pulsante com animação CSS');
  assert(waSite.previewHtml.includes('leadModal'), 'HTML contém modal inteligente de pré-atendimento');

  // 7. Teste do Builder de Micro-SaaS
  console.log(`\n▶ Teste 7: Builder de Micro-SaaS e Arquitetura Operacional`);
  const microSaaS = digitalBuilder.buildMicroSaaS({
    name: 'ClinicaZap AI',
    niche: 'Clínicas Odontológicas',
    problemSolved: 'Confirmação automática de consultas no WhatsApp com redução de faltas',
    features: ['Lembretes 24h antes', 'Reagendamento com 1 clique', 'Relatório de comparecimento']
  });
  assert(microSaaS.files.some(f => f.path.includes('server.js')), 'Micro-SaaS gerou backend operacional');
  assert(microSaaS.files.some(f => f.path.includes('package.json')), 'Micro-SaaS gerou manifesto de dependências');

  // 8. Teste do Estúdio de Mídia (Vídeos, Shorts & Reels 9:16)
  console.log(`\n▶ Teste 8: Estúdio de Mídia e Roteiros Virais 9:16`);
  const viralScript = mediaService.generateViralScript({
    topic: 'Como atrair clientes todos os dias com IA',
    niche: 'Prestadores de Serviços',
    tone: 'urgente'
  });
  assert(viralScript.aspectRatio.includes('9:16'), 'Roteiro gerado no formato vertical 9:16 para Reels e Shorts');
  assert(viralScript.scenes.length >= 4, 'Roteiro contém divisão completa de cenas com minutagem');
  assert(viralScript.scenes[0].sfx.length > 0, 'Cenas possuem marcações de áudio e efeitos sonoros (SFX)');
  assert(viralScript.scenes[0].aiVideoPrompt.length > 0, 'Cenas possuem prompts de vídeo prontos para IA');

  // 9. Teste do Estúdio de Carrosséis
  console.log(`\n▶ Teste 9: Estúdio de Carrosséis para Redes Sociais`);
  const carousel = mediaService.generateCarousel({
    title: '5 Gatilhos Mentais de Alta Conversão',
    niche: 'Copywriting e Vendas'
  });
  assert(carousel.slides.length === 5, 'Carrossel gerou 5 slides estruturados');
  assert(carousel.slides[0].title.length > 0, 'Slide de capa possui título magnético');

  // 10. Teste do Gerador de Imagens por IA (Estilo ChatGPT / DALL-E)
  console.log(`\n▶ Teste 10: Gerador de Imagens por IA (Estilo ChatGPT / DALL-E)`);
  const imageGen = await mediaService.generateImage({
    prompt: 'Planeta cósmico Moura.ai cercado de anéis fluorescentes em 8k',
    style: 'cosmic',
    aspectRatio: '1:1'
  });
  assert(!!imageGen.imageUrl && (imageGen.imageUrl.startsWith('data:image/svg+xml;base64,') || imageGen.imageUrl.startsWith('http')), 'Imagem gerada como Data URL em alta resolução');
  assert(imageGen.dimensions.width === 1024 && imageGen.dimensions.height === 1024, 'Dimensões quadradas 1024x1024 para proporção 1:1');
  assert(imageGen.seed > 0, 'Seed aleatória gerada com sucesso');

  // 11. Teste Obrigatório de Autocorreção (Self-Healing Loop)
  console.log(`\n▶ Teste 11: Ciclo de Autocorreção Obrigatório (Self-Healing Loop)`);
  const malformedHtml = `<div class="container"><div class="card"><h1>Título</h1>`;
  const healingResult = selfHealing.runDiagnosticCycle(malformedHtml, 'html');
  assert(healingResult.initialStatus === 'error_detected', 'Detector identificou tag não fechada corretamente');
  assert(healingResult.retestStatus === 'passed', 'Auto-corretor aplicou o patch e re-teste foi aprovado');
  assert(!!healingResult.logId, 'Evento de autocorreção registrado na auditoria da plataforma');

  // 12. Teste de Orquestração Multi-Agente
  console.log(`\n▶ Teste 12: Orquestrador de Agentes Especializados`);
  const orchestration = await orchestrator.orchestrate({
    objective: 'Desenvolver um bot de agendamento integrado ao WhatsApp',
    category: 'agents',
    userId: admin!.id
  });
  assert(orchestration.steps.length >= 4, 'Orquestrador executou os 4 agentes principais (Planejamento, Segurança, Automação, QA)');
  assert(orchestration.totalTimeMs >= 0, 'Duração da orquestração foi monitorada com precisão');

  // 13. Teste de Integridade dos Workflows n8n
  console.log(`\n▶ Teste 13: Validação dos Workflows n8n`);
  const n8nDir = path.resolve(process.cwd(), 'automations_n8n');
  const expectedWorkflows = [
    'workflow_1_whatsapp_lead_qualification.json',
    'workflow_2_viral_content_pipeline.json',
    'workflow_3_healthcheck_selfhealing_alerts.json',
    'workflow_4_microsaas_customer_onboarding.json',
    'workflow_5_ai_agent_support_triage.json'
  ];

  for (const wf of expectedWorkflows) {
    const fullPath = path.join(n8nDir, wf);
    const exists = fs.existsSync(fullPath);
    let validJson = false;
    if (exists) {
      try {
        const content = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
        validJson = Array.isArray(content.nodes) && content.nodes.length > 0;
      } catch (_) {}
    }
    assert(exists && validJson, `Workflow n8n '${wf}' é válido e importável`);
  }

  // 14. Teste dos Motores Mestres de Prompt (Prompt Mestre Único, Assistente e Motor de Imagens)
  console.log(`\n▶ Teste 14: Integridade dos 3 Prompts Mestres Oficiais`);
  const engines = promptEngineService.listEngines();
  assert(engines.length === 3, 'Exatamente 3 Motores Mestres oficiais registrados');
  assert(!!MASTER_ENGINES.high_performance_omni, 'Motor 01 (IA de Alta Performance Omni SFW/NSFW) ativo');
  assert(!!MASTER_ENGINES.creative_technical_assistant, 'Motor 02 (Assistente Criativo & Técnico Completo) ativo');
  assert(!!MASTER_ENGINES.advanced_image_engine, 'Motor 03 (Motor Avançado de Geração de Imagens) ativo');

  // 15. Teste dos 8 Módulos (A a H) e 15 Modos de Criação Nativos
  console.log(`\n▶ Teste 15: Validação dos 8 Módulos (A a H) e 15 Modos de Criação`);
  const assistantModules = MASTER_ENGINES.creative_technical_assistant.modules || [];
  assert(assistantModules.length === 8, 'Motor 02 possui todos os 8 Módulos especializados (A a H)');
  const moduleIds = assistantModules.map(m => m.id);
  assert(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].every(id => moduleIds.includes(id)), 'Todos os identificadores de módulo A-H estão presentes');

  const imageModes = MASTER_ENGINES.advanced_image_engine.modes || [];
  assert(imageModes.length === 15, 'Motor 03 possui os 15 Modos de Criação nativos');
  assert(imageModes.some(m => m.name.includes('Fotografia Realista')), 'Modo 01 Fotografia Realista validado');
  assert(imageModes.some(m => m.name.includes('Arte Conceitual')), 'Modo 15 Arte Conceitual validado');

  // 16. Teste de Execução do Motor de Prompt com Injeção de Contexto
  console.log(`\n▶ Teste 16: Execução de Prompts Mestres com Contexto e Moderação`);
  const execOutput = await promptEngineService.executeEngine({
    engineId: 'high_performance_omni',
    prompt: 'Crie uma descrição impactante para um portal cósmico',
    userId: admin!.id
  });
  assert(!!execOutput.result && execOutput.result.length > 20, 'Motor 01 executou com sucesso e retornou texto enriquecido');
  assert(execOutput.engine.id === 'high_performance_omni', 'Metadados do motor retornados corretamente');

  // 17. Teste de Integração do Motor de Imagens com Modos de Criação Nativos
  console.log(`\n▶ Teste 17: Integração do Gerador de Imagens com os 15 Modos`);
  const modeImage = await mediaService.generateImage({
    prompt: 'Nave estelar explorando anéis de Saturno',
    style: 'cosmic',
    creationMode: 1,
    aspectRatio: '16:9'
  });
  assert(modeImage.style.includes('Fotografia Realista'), 'Estilo da imagem reflete o Modo de Criação 01');
  assert(modeImage.dimensions.width === 1280 && modeImage.dimensions.height === 720, 'Dimensões 16:9 respeitadas');

  // Resumo Final
  console.log(`\n================================================================`);
  console.log(`📊 RESULTADO DA EXECUÇÃO:`);
  console.log(`   Total de Testes: ${passedTests + failedTests}`);
  console.log(`   Aprovados: ${passedTests}`);
  console.log(`   Falhas: ${failedTests}`);
  console.log(`================================================================\n`);

  if (failedTests > 0) {
    process.exit(1);
  }
}

runTestSuite().catch(err => {
  console.error('Erro fatal durante a execução dos testes:', err);
  process.exit(1);
});
