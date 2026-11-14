import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { CONFIG } from './config/index.js';
import { apiRouter } from './routes/api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares Globais
app.disable('x-powered-by');
app.use(cors({
  origin: CONFIG.CORS_ORIGINS,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id']
}));
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Rotas da API
app.use('/api', apiRouter);

// Servir Frontend SPA Estático
const publicDir = path.resolve(process.cwd(), 'public');
app.use(express.static(publicDir));

// Fallback para SPA (qualquer rota desconhecida entrega o index.html)
app.use((req, res) => {
  const indexPath = path.join(publicDir, 'index.html');
  res.sendFile(indexPath);
});

// Inicialização
const server = app.listen(CONFIG.PORT, () => {
  console.log(`================================================================`);
  console.log(`⚡ MOURA.AI CORE ENGINE ATIVO — MOURAS-WORLD ⚡`);
  console.log(`================================================================`);
  console.log(`🌐 Servidor: http://localhost:${CONFIG.PORT}`);
  console.log(`🔑 Política de Tokens: ILIMITADO`);
  console.log(`🚀 Planos Configurados:`);
  console.log(`   - Grátis: R$ ${CONFIG.PLANS.free.priceMonthly}/mês (Até 5/dia, 32 imgs/dia)`);
  console.log(`   - Pro: R$ ${CONFIG.PLANS.pro.priceMonthly}/mês (Até 32/dia de cada)`);
  console.log(`   - Ultra: R$ ${CONFIG.PLANS.ultra.priceMonthly}/mês (Até 80/dia de cada)`);
  console.log(`   - Galaxi: R$ ${CONFIG.PLANS.galaxi.priceMonthly}/mês (Até 200/dia de cada)`);
  console.log(`📦 Repositório GitHub: ${CONFIG.GITHUB_REPO}`);
  console.log(`================================================================`);
});

export default app;
