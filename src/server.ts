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
app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Rotas da API
app.use('/api', apiRouter);

// Servir Frontend SPA Estático
const publicDir = path.resolve(process.cwd(), 'public');
app.use(express.static(publicDir));

// Fallback para SPA (qualquer rota desconhecida entrega o index.html)
app.get('*', (req, res) => {
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
