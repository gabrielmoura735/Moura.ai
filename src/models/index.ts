export type UserRole = 'admin' | 'developer' | 'creator' | 'member';

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  planId: 'free' | 'pro' | 'ultra' | 'galaxi';
  organizationId: string;
  createdAt: string;
}

export interface DailyUsage {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  imagesCount: number;
  sitesCount: number;
  saasCount: number;
  enterpriseCount: number;
  videosCount: number;
  researchCount: number;
  agentsCount: number;
  tokensUsed: number;
}

export type ProjectType = 'website_whatsapp' | 'landing_page' | 'saas' | 'micro_saas' | 'enterprise_system' | 'custom_agent' | 'video_reels';

export interface ProjectFile {
  path: string;
  content: string;
  language: string;
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  type: ProjectType;
  description: string;
  files: ProjectFile[];
  previewHtml?: string;
  status: 'draft' | 'building' | 'completed' | 'error';
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface CustomAgent {
  id: string;
  userId: string;
  name: string;
  specialty: 'vendas_sdr' | 'atendimento_sac' | 'imobiliario' | 'clinicas' | 'delivery' | 'software_dev' | 'personalizado';
  systemPrompt: string;
  webhookUrl?: string;
  tools: string[];
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface SelfHealingLog {
  id: string;
  projectId?: string;
  errorDetected: string;
  rootCause: string;
  patchApplied: string;
  testResult: 'passed' | 'failed';
  status: 'resolved' | 'investigating' | 'escalated';
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  category: 'auth' | 'generation' | 'plan_change' | 'self_healing' | 'n8n_webhook' | 'admin';
  details: Record<string, any>;
  createdAt: string;
}

export interface N8NWebhook {
  id: string;
  userId: string;
  name: string;
  triggerEvent: string;
  targetUrl: string;
  secretToken: string;
  lastTriggeredAt?: string;
  status: 'active' | 'paused' | 'error';
  createdAt: string;
}
