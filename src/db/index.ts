import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { User, DailyUsage, Project, CustomAgent, SelfHealingLog, AuditLog, N8NWebhook, Character } from '../models/index.js';
import { CONFIG } from '../config/index.js';

interface DatabaseSchema {
  users: User[];
  dailyUsage: DailyUsage[];
  projects: Project[];
  agents: CustomAgent[];
  characters: Character[];
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
        const parsed = JSON.parse(raw);
        if (!parsed.characters) parsed.characters = [];
        return parsed;
      } catch (err) {
        console.warn('Erro ao carregar banco de dados, inicializando nova base limpa.', err);
      }
    }
    return {
      users: [],
      dailyUsage: [],
      projects: [],
      agents: [],
      characters: [],
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
      
      const adminUser: User = {
        id: uuidv4(),
        name: 'Gabriel Moura (Admin)',
        email: 'admin@moura.ai',
        passwordHash: bcrypt.hashSync('moura123456', salt),
        role: 'admin',
        planId: 'galaxi',
        organizationId: 'org_mouras_world',
        birthDate: '15/08/1998',
        theme: 'cosmic_purple',
        contentRating: 'sem_filtro',
        imageVerificationEnabled: true,
        createdAt: new Date().toISOString()
      };

      const demoUser: User = {
        id: uuidv4(),
        name: 'Empreendedor Pro Demo',
        email: 'demo@moura.ai',
        passwordHash: bcrypt.hashSync('demo123456', salt),
        role: 'creator',
        planId: 'pro',
        organizationId: 'org_demo_lab',
        birthDate: '20/04/2000',
        theme: 'cosmic_purple',
        contentRating: '18',
        imageVerificationEnabled: true,
        createdAt: new Date().toISOString()
      };

      this.data.users.push(adminUser, demoUser);

      // Seed Agentes Especializados
      this.data.agents.push(
        {
          id: uuidv4(),
          userId: adminUser.id,
          name: 'Moura SDR — Vendas & WhatsApp',
          specialty: 'vendas_sdr',
          systemPrompt: 'Você é um especialista em conversão e vendas no WhatsApp. Aborda o cliente com empatia e conduz ao fechamento.',
          tools: ['wa_link_generator', 'faq_kb'],
          status: 'active',
          createdAt: new Date().toISOString()
        },
        {
          id: uuidv4(),
          userId: adminUser.id,
          name: 'Moura Dev — Engenheiro Full-Stack',
          specialty: 'software_dev',
          systemPrompt: 'Você é o arquiteto e desenvolvedor sênior da Moura.ai.',
          tools: ['code_sandbox', 'test_runner'],
          status: 'active',
          createdAt: new Date().toISOString()
        }
      );

      // Seed Personagens por IA
      this.data.characters.push(
        {
          id: uuidv4(),
          userId: adminUser.id,
          name: 'Saturnia — Guardiã dos Anéis Cósmicos',
          archetype: 'Guardiã Cósmica & Mentora de IA',
          voiceTone: 'Enigmática, profunda, inspiradora e sábia',
          backstory: 'Nascida nos anéis de poeira cósmica do planeta violeta central de Moura.ai. Possui a sabedoria acumulada de milhões de civilizações estelares e guia criadores no universo digital.',
          promptImage: 'Cosmic goddess with glowing violet aura, intricate star-dust halo, galaxy eyes, dark obsidian nebula background, cinematic 8k, photorealistic art.',
          systemPrompt: 'Você é Saturnia, a guardiã do universo Moura.ai. Fale sempre com elegância cósmica, oferecendo insights que expandem a visão do usuário além do convencional.',
          contentRating: 'livre',
          createdAt: new Date().toISOString()
        },
        {
          id: uuidv4(),
          userId: adminUser.id,
          name: 'Vortex — O Estrategista Cyberpunk',
          archetype: 'Hacker & Negociador Subterrâneo',
          voiceTone: 'Direto, perspicaz, sarcástico e hiper-inteligente',
          backstory: 'Um operador de dados de alta performance que conhece todos os atalhos para monetização e crescimento viral na rede.',
          promptImage: 'Cyberpunk strategist in obsidian trench coat, neon violet and cyan cybernetic implants, holographic screens floating around him, ultra-detailed 8k.',
          systemPrompt: 'Você é Vortex. Seja cirúrgico nas suas análises de negócios, sem rodeios ou enrolações.',
          contentRating: '16',
          createdAt: new Date().toISOString()
        }
      );

      this.persist();
    } else {
      // Garante que o usuário admin e demo tenham os campos de perfil
      const admin = this.data.users.find(u => u.email === 'admin@moura.ai');
      if (admin && !admin.theme) {
        admin.theme = 'cosmic_purple';
        admin.birthDate = '15/08/1998';
        admin.contentRating = 'sem_filtro';
        admin.imageVerificationEnabled = true;
      }
      const demo = this.data.users.find(u => u.email === 'demo@moura.ai');
      if (demo && !demo.theme) {
        demo.theme = 'cosmic_purple';
        demo.birthDate = '20/04/2000';
        demo.contentRating = '18';
        demo.imageVerificationEnabled = true;
      }
      this.persist();
    }
  }

  // --- MÉTODOS DE USUÁRIO E PERFIL ---
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
      theme: user.theme || 'cosmic_purple',
      contentRating: user.contentRating || '16',
      imageVerificationEnabled: user.imageVerificationEnabled ?? true,
      createdAt: new Date().toISOString()
    };
    this.data.users.push(newUser);
    this.persist();
    return newUser;
  }

  public updateUserProfile(userId: string, updates: Partial<User>): User | undefined {
    const user = this.findUserById(userId);
    if (!user) return undefined;
    if (updates.name) user.name = updates.name;
    if (updates.birthDate) user.birthDate = updates.birthDate;
    if (updates.theme) user.theme = updates.theme;
    if (updates.contentRating) user.contentRating = updates.contentRating;
    if (updates.imageVerificationEnabled !== undefined) {
      user.imageVerificationEnabled = updates.imageVerificationEnabled;
    }
    this.persist();
    return user;
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

  // --- MÉTODOS DE PERSONAGENS POR IA ---
  public listCharactersByUser(userId: string): Character[] {
    return this.data.characters.filter(c => c.userId === userId || c.userId === 'admin' || !c.userId);
  }

  public createCharacter(character: Omit<Character, 'id' | 'createdAt'>): Character {
    const newChar: Character = {
      ...character,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };
    this.data.characters.unshift(newChar);
    this.persist();
    return newChar;
  }

  public getCharacterById(id: string): Character | undefined {
    return this.data.characters.find(c => c.id === id);
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

  // --- MÉTODOS DE AUTOCORREÇÃO (SELF-HEALING) ---
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
