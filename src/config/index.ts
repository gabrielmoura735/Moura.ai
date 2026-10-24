import dotenv from 'dotenv';
dotenv.config();

export interface PlanConfig {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  dailyGenerationLimit: number;
  dailyImagesLimit: number;
  aiMultiplier: number;
  n8nWebhooksLimit: number;
  description: string;
  features: string[];
}

export const CONFIG = {
  PORT: parseInt(process.env.PORT || '3000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET || 'moura_ai_default_secret_key_2026',
  TOKENS_UNLIMITED: process.env.TOKENS_UNLIMITED === 'true' || true,
  GITHUB_REPO: process.env.GITHUB_REPO || 'gabrielmoura735/Moura.ai',
  N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/moura-ai',
  N8N_SECRET_TOKEN: process.env.N8N_SECRET_TOKEN || 'moura_n8n_secure_token_key',

  // Chaves de IA
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || '',
  GROQ_API_KEY: process.env.GROQ_API_KEY || '',

  // Planos Oficiais da Moura.ai
  PLANS: {
    free: {
      id: 'free',
      name: 'Plano Grátis',
      priceMonthly: parseInt(process.env.PLAN_FREE_PRICE || '0', 10),
      priceYearly: 0,
      dailyGenerationLimit: parseInt(process.env.PLAN_FREE_DAILY_LIMIT || '5', 10),
      dailyImagesLimit: parseInt(process.env.PLAN_FREE_IMAGES_LIMIT || '32', 10),
      aiMultiplier: 1,
      n8nWebhooksLimit: 1,
      description: 'Ideal para experimentar o poder da Moura.ai e validar ideias digitais.',
      features: [
        'Tokens Ilimitados',
        'Até 5 criações por dia (Sites, SaaS, Vídeos, Pesquisas)',
        'Até 32 imagens de alta qualidade por dia',
        'Builder de Sites para WhatsApp Básico',
        '1 Webhook n8n ativo',
        'Suporte Comunitário'
      ]
    },
    pro: {
      id: 'pro',
      name: 'Plano Pro (Criador & Dev)',
      priceMonthly: parseInt(process.env.PLAN_PRO_PRICE || '197', 10),
      priceYearly: parseInt(process.env.PLAN_PRO_YEARLY_PRICE || '1890', 10),
      dailyGenerationLimit: parseInt(process.env.PLAN_PRO_DAILY_LIMIT || '32', 10),
      dailyImagesLimit: parseInt(process.env.PLAN_PRO_IMAGES_LIMIT || '32', 10),
      aiMultiplier: 15,
      n8nWebhooksLimit: 10,
      description: 'Para criadores, freelancers e desenvolvedores que buscam alta produtividade.',
      features: [
        'Tokens Ilimitados',
        'IA 15x mais potente e rápida',
        'Até 32 criações por dia para CADA categoria',
        'Até 32 imagens HD por dia',
        'Builder Avançado de Sites para WhatsApp',
        'Fábrica de Micro-SaaS e Criação de Empresas',
        '10 Webhooks n8n integrados',
        'Exportação direta de código (.zip e GitHub)'
      ]
    },
    ultra: {
      id: 'ultra',
      name: 'Plano Ultra (Agências & PMEs)',
      priceMonthly: parseInt(process.env.PLAN_ULTRA_PRICE || '697', 10),
      priceYearly: parseInt(process.env.PLAN_ULTRA_YEARLY_PRICE || '6690', 10),
      dailyGenerationLimit: parseInt(process.env.PLAN_ULTRA_DAILY_LIMIT || '80', 10),
      dailyImagesLimit: parseInt(process.env.PLAN_ULTRA_IMAGES_LIMIT || '80', 10),
      aiMultiplier: 30,
      n8nWebhooksLimit: 50,
      description: 'Para agências digitais e empresas escalando múltiplos produtos simultaneamente.',
      features: [
        'Tokens Ilimitados',
        'IA 30x mais potente com raciocínio complexo',
        'Até 80 criações por dia para CADA categoria',
        'Até 80 imagens 4K Ultra por dia',
        'Fábrica Completa de Agentes de IA Especializados',
        'Estúdio de Vídeos, Shorts & Reels Virais',
        '50 Webhooks n8n com processamento concorrente',
        'Suporte Prioritário VIP'
      ]
    },
    galaxi: {
      id: 'galaxi',
      name: 'Plano Galaxi (Enterprise VIP)',
      priceMonthly: parseInt(process.env.PLAN_GALAXI_PRICE || '1197', 10),
      priceYearly: parseInt(process.env.PLAN_GALAXI_YEARLY_PRICE || '11490', 10),
      dailyGenerationLimit: parseInt(process.env.PLAN_GALAXI_DAILY_LIMIT || '200', 10),
      dailyImagesLimit: parseInt(process.env.PLAN_GALAXI_IMAGES_LIMIT || '200', 10),
      aiMultiplier: 100,
      n8nWebhooksLimit: 999,
      description: 'Nível máximo para corporações, grandes agências e ecossistemas digitais globais.',
      features: [
        'Tokens Ilimitados',
        'Potência Máxima Galaxi sem filas',
        'Até 200 criações por dia para CADA categoria',
        'Até 200 imagens de estúdio por dia',
        'Acesso irrestrito a todos os agentes e builders',
        'Webhooks e automações n8n ilimitados',
        'SLA com tempo de resposta garantido 24/7',
        'Consultoria de arquitetura inclusa'
      ]
    }
  } as Record<string, PlanConfig>
};
