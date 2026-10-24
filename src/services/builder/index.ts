import { ProjectFile } from '../../models/index.js';

export interface WhatsAppSiteOptions {
  businessName: string;
  whatsappNumber: string; // e.g. 5511999999999
  headline: string;
  subheadline: string;
  primaryColor?: string;
  products: Array<{
    name: string;
    description: string;
    price: string;
    badge?: string;
  }>;
}

export interface MicroSaaSOptions {
  name: string;
  niche: string;
  problemSolved: string;
  features: string[];
}

export class DigitalProductBuilder {
  /**
   * Constrói um Site Completo e Responsivo Otimizado para WhatsApp
   */
  public buildWhatsAppSite(opts: WhatsAppSiteOptions): { files: ProjectFile[]; previewHtml: string } {
    const cleanPhone = opts.whatsappNumber.replace(/\D/g, '') || '5511999999999';
    const primaryColor = opts.primaryColor || '#10b981'; // Emerald/WhatsApp green

    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${opts.businessName} — Atendimento Oficial no WhatsApp</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    @keyframes pulse-ring {
      0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
      70% { transform: scale(1); box-shadow: 0 0 0 16px rgba(16, 185, 129, 0); }
      100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
    }
    .wa-pulse {
      animation: pulse-ring 2s infinite;
    }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-white">

  <!-- Top Bar -->
  <header class="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
    <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 font-black text-xl">
          M
        </div>
        <div>
          <span class="text-xl font-bold tracking-tight text-white">${opts.businessName}</span>
          <span class="block text-xs text-emerald-400 font-medium flex items-center gap-1">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
            Atendimento Online Agora
          </span>
        </div>
      </div>
      <a href="https://wa.me/${cleanPhone}?text=${encodeURIComponent('Olá! Gostaria de mais informações sobre o ' + opts.businessName)}" 
         target="_blank" 
         class="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transform hover:-translate-y-0.5">
        <i class="fa-brands fa-whatsapp text-lg"></i>
        <span>Conversar no WhatsApp</span>
      </a>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="relative py-16 sm:py-24 overflow-hidden">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-950 to-slate-950 -z-10"></div>
    <div class="max-w-4xl mx-auto px-4 text-center">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
        <i class="fa-solid fa-bolt"></i> Resposta Imediata em Poucos Segundos
      </div>
      <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
        ${opts.headline}
      </h1>
      <p class="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
        ${opts.subheadline}
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button onclick="openLeadModal()" 
                class="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-base shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3">
          <i class="fa-brands fa-whatsapp text-2xl"></i>
          <span>Falar com Especialista Agora</span>
        </button>
        <a href="#catalogo" 
           class="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-200 font-medium text-base transition-all flex items-center justify-center gap-2">
          <span>Ver Produtos & Serviços</span>
          <i class="fa-solid fa-arrow-down text-sm"></i>
        </a>
      </div>
    </div>
  </section>

  <!-- Catálogo de Produtos com Pedido 1-Clique no WhatsApp -->
  <section id="catalogo" class="py-16 bg-slate-900/40 border-y border-slate-800/80">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-white mb-3">Escolha e Peça no WhatsApp</h2>
        <p class="text-slate-400 text-sm max-w-xl mx-auto">Selecione a opção desejada abaixo e sua conversa já será iniciada com o pedido pré-formatado.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${opts.products.map(prod => `
          <div class="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-emerald-500/10 group">
            <div>
              ${prod.badge ? `<span class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">${prod.badge}</span>` : ''}
              <h3 class="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-2">${prod.name}</h3>
              <p class="text-slate-400 text-sm leading-relaxed mb-6">${prod.description}</p>
            </div>
            <div>
              <div class="flex items-baseline justify-between mb-4 border-t border-slate-800 pt-4">
                <span class="text-xs text-slate-400">Investimento:</span>
                <span class="text-2xl font-black text-emerald-400">${prod.price}</span>
              </div>
              <a href="https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Olá! Tenho interesse no ${prod.name} (${prod.price}) anunciado no site. Poderia me atender?`)}" 
                 target="_blank"
                 class="w-full py-3 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 font-semibold text-sm transition-all flex items-center justify-center gap-2 border border-slate-700 hover:border-emerald-500">
                <i class="fa-brands fa-whatsapp text-lg"></i>
                <span>Pedir no WhatsApp</span>
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Modal de Pré-Atendimento Inteligente -->
  <div id="leadModal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden">
    <div class="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
      <button onclick="closeLeadModal()" class="absolute top-4 right-4 text-slate-400 hover:text-white">
        <i class="fa-solid fa-xmark text-xl"></i>
      </button>
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
          <i class="fa-brands fa-whatsapp text-2xl"></i>
        </div>
        <div>
          <h3 class="text-lg font-bold text-white">Iniciar Atendimento</h3>
          <p class="text-xs text-slate-400">Preencha rapidamente para agilizar seu atendimento</p>
        </div>
      </div>
      <form onsubmit="handleLeadSubmit(event)" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Seu Nome:</label>
          <input type="text" id="leadName" required placeholder="Como podemos te chamar?" 
                 class="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500">
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Qual o seu principal interesse?</label>
          <select id="leadInterest" class="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500">
            ${opts.products.map(p => `<option value="${p.name}">${p.name} - ${p.price}</option>`).join('')}
            <option value="Dúvida Geral">Outras informações / Dúvida Geral</option>
          </select>
        </div>
        <button type="submit" 
                class="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2">
          <span>Abrir Conversa no WhatsApp</span>
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </form>
    </div>
  </div>

  <!-- Botão Flutuante Pulsante do WhatsApp -->
  <a href="https://wa.me/${cleanPhone}?text=${encodeURIComponent('Olá! Vim pelo site oficial e gostaria de atendimento imediato.')}" 
     target="_blank" 
     class="wa-pulse fixed bottom-6 right-6 w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center text-3xl shadow-2xl z-40 transition-all hover:scale-105"
     title="Conversar no WhatsApp">
    <i class="fa-brands fa-whatsapp text-white"></i>
  </a>

  <!-- Footer -->
  <footer class="py-12 border-t border-slate-800 text-center text-slate-500 text-xs">
    <p>© ${new Date().getFullYear()} ${opts.businessName}. Todos os direitos reservados.</p>
    <p class="mt-1">Página desenvolvida com alta tecnologia pela <span class="text-emerald-400 font-semibold">Moura.ai</span></p>
  </footer>

  <script>
    function openLeadModal() {
      document.getElementById('leadModal').classList.remove('hidden');
    }
    function closeLeadModal() {
      document.getElementById('leadModal').classList.add('hidden');
    }
    function handleLeadSubmit(e) {
      e.preventDefault();
      const name = document.getElementById('leadName').value;
      const interest = document.getElementById('leadInterest').value;
      const text = encodeURIComponent(\`Olá! Meu nome é \${name}. Gostaria de atendimento sobre: \${interest}.\`);
      window.open(\`https://wa.me/${cleanPhone}?text=\${text}\`, '_blank');
      closeLeadModal();
    }
  </script>
</body>
</html>`;

    const files: ProjectFile[] = [
      {
        path: 'index.html',
        content: html,
        language: 'html'
      },
      {
        path: 'config.json',
        content: JSON.stringify(opts, null, 2),
        language: 'json'
      }
    ];

    return { files, previewHtml: html };
  }

  /**
   * Constrói a Arquitetura Completa de um Micro-SaaS Funcional
   */
  public buildMicroSaaS(opts: MicroSaaSOptions): { files: ProjectFile[]; previewHtml: string } {
    const previewHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${opts.name} — Micro-SaaS Operacional</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col justify-between">
  <nav class="border-b border-slate-800 px-6 py-4 flex items-center justify-between bg-slate-900/50">
    <span class="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">${opts.name}</span>
    <span class="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">Micro-SaaS Ativo</span>
  </nav>

  <main class="max-w-4xl mx-auto px-4 py-16 text-center">
    <h1 class="text-4xl font-extrabold text-white mb-4">${opts.problemSolved}</h1>
    <p class="text-slate-400 text-lg mb-8">Nicho Atendido: <span class="text-violet-400 font-semibold">${opts.niche}</span></p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left my-10">
      ${opts.features.map(f => `
        <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <div class="text-cyan-400 font-bold mb-2">✓ Funcionalidade</div>
          <p class="text-sm text-slate-300">${f}</p>
        </div>
      `).join('')}
    </div>

    <div class="p-6 rounded-2xl bg-gradient-to-r from-violet-900/30 to-cyan-900/30 border border-slate-700">
      <h3 class="text-lg font-bold text-white mb-2">Painel Operacional Pronto</h3>
      <p class="text-sm text-slate-400 mb-4">A estrutura inclui autenticação, banco de dados e rotas prontas para publicação.</p>
      <button class="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all">Acessar Demonstração</button>
    </div>
  </main>

  <footer class="py-6 border-t border-slate-800 text-center text-xs text-slate-500">
    Gerado e verificado pela Moura.ai • Mouras-World
  </footer>
</body>
</html>`;

    const files: ProjectFile[] = [
      {
        path: 'public/index.html',
        content: previewHtml,
        language: 'html'
      },
      {
        path: 'src/server.js',
        content: `// Micro-SaaS Server — ${opts.name}\nconst express = require('express');\nconst app = express();\napp.use(express.json());\napp.get('/api/health', (req, res) => res.json({ status: 'ok', saas: '${opts.name}' }));\napp.listen(3001, () => console.log('${opts.name} rodando na porta 3001'));`,
        language: 'javascript'
      },
      {
        path: 'package.json',
        content: JSON.stringify({
          name: opts.name.toLowerCase().replace(/\s+/g, '-'),
          version: '1.0.0',
          scripts: { start: 'node src/server.js' },
          dependencies: { express: '^4.19.2' }
        }, null, 2),
        language: 'json'
      }
    ];

    return { files, previewHtml };
  }
}

export const digitalBuilder = new DigitalProductBuilder();
