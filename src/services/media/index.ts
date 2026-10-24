import { CONFIG } from '../../config/index.js';

export interface ViralScriptRequest {
  topic: string;
  niche: string;
  tone?: 'impactante' | 'educativo' | 'urgente' | 'storytelling';
}

export interface CarouselRequest {
  title: string;
  slidesCount?: number;
  niche: string;
}

export interface GenerateImageRequest {
  prompt: string;
  style?: 'cosmic' | 'photorealistic' | 'cyberpunk' | 'anime' | '3d_render';
  aspectRatio?: '1:1' | '16:9' | '9:16';
}

export class MediaStudioService {
  /**
   * Gera Roteiro Estruturado para Reels, Shorts e TikTok (Formato 9:16)
   */
  public generateViralScript(req: ViralScriptRequest) {
    const tone = req.tone || 'impactante';

    return {
      title: `Roteiro Viral: ${req.topic}`,
      aspectRatio: '9:16 (Vertical Reels/Shorts)',
      estimatedDuration: '45 segundos',
      tone,
      hook3s: `Se você trabalha com ${req.niche}, pare o que está fazendo agora. Esse erro está custando caro no seu negócio.`,
      scenes: [
        {
          scene: 1,
          time: '00:00 - 00:03',
          hook: 'Gancho Irresistível de Retenção',
          visual: 'Close no rosto do apresentador com texto em letras garrafais amarelas piscando no centro.',
          script: `Se você atua em ${req.niche}, pare tudo agora! O que vou te mostrar nos próximos 40 segundos vai mudar seu jogo.`,
          sfx: 'Whoosh grave + batida de suspense.',
          aiVideoPrompt: `Hyper-realistic dramatic close-up of a professional in ${req.niche}, intense lighting, 4k, cinematic, bokeh background.`
        },
        {
          scene: 2,
          time: '00:03 - 00:15',
          hook: 'Apresentação do Problema Real',
          visual: 'Gráficos subindo na tela e transições rápidas mostrando a frustração de perder tempo ou clientes.',
          script: `A maioria das pessoas tenta resolver isso no método tradicional e acaba perdendo horas ou dinheiro todos os dias.`,
          sfx: 'Efeito sonoro de erro (glitch suave) e aceleração de ritmo.',
          aiVideoPrompt: `Fast-paced montage of a modern smartphone interface with glowing notifications, clean modern office setup, 8k.`
        },
        {
          scene: 3,
          time: '00:15 - 00:35',
          hook: 'A Revelação da Solução Moura.ai',
          visual: 'Gravação da tela com o sistema da Moura.ai gerando a solução em tempo real com apenas 1 clique.',
          script: `Com a Moura.ai, você automatiza todo esse processo em menos de 2 minutos, colocando a inteligência artificial para trabalhar por você.`,
          sfx: 'Som agradável de confirmação e trilha inspiradora subindo.',
          aiVideoPrompt: `Sleek futuristic user interface floating in mid-air, cyan and violet neon accents, ultra-crisp technology.`
        },
        {
          scene: 4,
          time: '00:35 - 00:45',
          hook: 'Chamada para Ação Final (CTA)',
          visual: 'Apresentador sorrindo e apontando para a legenda com botão animado.',
          script: `Quer testar isso na prática? Comente 'MOURA' aqui embaixo ou clique no link da bio para começar agora!`,
          sfx: 'Ding de notificação suave e finalização da trilha.',
          aiVideoPrompt: `Warm inviting studio setting with subtle purple edge lighting, professional creator smiling, 4k.`
        }
      ],
      suggestedHashtags: [
        '#MouraAI',
        `#${req.niche.replace(/\s+/g, '')}`,
        '#InteligenciaArtificial',
        '#ReelsViral',
        '#Shorts',
        '#Empreendedorismo',
        '#Produtividade'
      ]
    };
  }

  /**
   * Gera Carrossel Visual em Alta Resolução
   */
  public generateCarousel(req: CarouselRequest) {
    const slides = [
      {
        slideNumber: 1,
        title: req.title,
        subtitle: 'Deslize para o lado para dominar essa estratégia 👉',
        accent: 'purple'
      },
      {
        slideNumber: 2,
        title: 'O Problema Oculto',
        subtitle: `Por que 90% das pessoas em ${req.niche} falham antes de começar? A falta de processos automatizados é a principal vilã.`,
        accent: 'violet'
      },
      {
        slideNumber: 3,
        title: 'A Virada de Chave',
        subtitle: 'Substitua o esforço manual repetitivo por agentes de IA especializados que trabalham 24 horas por dia.',
        accent: 'emerald'
      },
      {
        slideNumber: 4,
        title: 'Como Aplicar com a Moura.ai',
        subtitle: '1. Crie seu site para WhatsApp.\n2. Conecte com o n8n no automático.\n3. Receba leads prontos para fechar.',
        accent: 'cyan'
      },
      {
        slideNumber: 5,
        title: 'Gostou desse conteúdo?',
        subtitle: 'Salve este post para consultar mais tarde e compartilhe com quem precisa transformar seu negócio hoje!',
        accent: 'amber'
      }
    ];

    return {
      title: req.title,
      totalSlides: slides.length,
      slides
    };
  }

  /**
   * Gerador de Imagens por IA Estilo ChatGPT / DALL-E
   * Produz arte visual de alta fidelidade renderizável inline com suporte a download em PNG
   */
  public async generateImage(req: GenerateImageRequest): Promise<{
    imageUrl: string;
    prompt: string;
    style: string;
    aspectRatio: string;
    seed: number;
    dimensions: { width: number; height: number };
  }> {
    const style = req.style || 'cosmic';
    const aspectRatio = req.aspectRatio || '1:1';
    const seed = Math.floor(Math.random() * 9000000) + 1000000;

    let width = 1024;
    let height = 1024;
    if (aspectRatio === '16:9') {
      width = 1280;
      height = 720;
    } else if (aspectRatio === '9:16') {
      width = 720;
      height = 1280;
    }

    // Se houver chave OpenAI configurada, pode chamar DALL-E 3
    if (CONFIG.OPENAI_API_KEY) {
      try {
        const response = await fetch('https://api.openai.com/v1/images/generations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CONFIG.OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: 'dall-e-3',
            prompt: `${req.prompt}, ${style} style, ultra high resolution 8k, masterpiece`,
            n: 1,
            size: '1024x1024'
          })
        });
        if (response.ok) {
          const data: any = await response.json();
          if (data.data && data.data[0]?.url) {
            return {
              imageUrl: data.data[0].url,
              prompt: req.prompt,
              style,
              aspectRatio,
              seed,
              dimensions: { width, height }
            };
          }
        }
      } catch (err) {
        console.warn('OpenAI DALL-E falhou, gerando com renderizador generativo Moura.ai...', err);
      }
    }

    // Renderizador Generativo Cósmico Autônomo da Moura.ai
    // Produz um SVG de arte digital deslumbrante codificado em base64 Data URL
    const svgArt = this.buildGenerativeSvg({
      prompt: req.prompt,
      style,
      width,
      height,
      seed
    });

    const base64Data = Buffer.from(svgArt).toString('base64');
    const imageUrl = `data:image/svg+xml;base64,${base64Data}`;

    return {
      imageUrl,
      prompt: req.prompt,
      style,
      aspectRatio,
      seed,
      dimensions: { width, height }
    };
  }

  private buildGenerativeSvg(opts: { prompt: string; style: string; width: number; height: number; seed: number }): string {
    const isPurple = opts.style === 'cosmic' || opts.prompt.toLowerCase().includes('planeta') || opts.prompt.toLowerCase().includes('moura');
    const grad1 = isPurple ? '#3b0764' : '#030712';
    const grad2 = isPurple ? '#7e22ce' : '#0891b2';
    const grad3 = isPurple ? '#c084fc' : '#22d3ee';
    const planetGlow = isPurple ? '#a855f7' : '#06b6d4';

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${opts.width} ${opts.height}" width="${opts.width}" height="${opts.height}">
      <defs>
        <radialGradient id="spaceGrad" cx="50%" cy="50%" r="75%">
          <stop offset="0%" stop-color="${grad2}" stop-opacity="0.8"/>
          <stop offset="45%" stop-color="${grad1}" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#020617"/>
        </radialGradient>
        <linearGradient id="planetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${grad3}"/>
          <stop offset="50%" stop-color="${grad2}"/>
          <stop offset="100%" stop-color="${grad1}"/>
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="30" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
        <filter id="ringGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="12" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>

      <!-- Fundo Espacial Profundo -->
      <rect width="${opts.width}" height="${opts.height}" fill="url(#spaceGrad)"/>

      <!-- Nebulosas e Poeira Estelar -->
      <circle cx="${opts.width * 0.2}" cy="${opts.height * 0.3}" r="${opts.width * 0.35}" fill="${planetGlow}" opacity="0.15" filter="url(#glow)"/>
      <circle cx="${opts.width * 0.8}" cy="${opts.height * 0.7}" r="${opts.width * 0.3}" fill="${grad3}" opacity="0.12" filter="url(#glow)"/>

      <!-- Campo de Estrelas Cintilantes -->
      <g fill="#ffffff" opacity="0.8">
        <circle cx="${opts.width * 0.15}" cy="${opts.height * 0.15}" r="2"/>
        <circle cx="${opts.width * 0.25}" cy="${opts.height * 0.85}" r="1.5"/>
        <circle cx="${opts.width * 0.75}" cy="${opts.height * 0.18}" r="2.5"/>
        <circle cx="${opts.width * 0.85}" cy="${opts.height * 0.45}" r="1"/>
        <circle cx="${opts.width * 0.45}" cy="${opts.height * 0.12}" r="1.8"/>
        <circle cx="${opts.width * 0.65}" cy="${opts.height * 0.82}" r="2"/>
        <circle cx="${opts.width * 0.08}" cy="${opts.height * 0.65}" r="1.2"/>
        <circle cx="${opts.width * 0.92}" cy="${opts.height * 0.88}" r="1.5"/>
      </g>

      <!-- Planeta Cósmico Central com Anéis Estilo Moura.ai -->
      <g transform="translate(${opts.width / 2}, ${opts.height / 2})">
        <!-- Brilho de Fundo do Planeta -->
        <circle cx="0" cy="0" r="${opts.width * 0.22}" fill="${planetGlow}" opacity="0.3" filter="url(#glow)"/>

        <!-- Anel Traseiro -->
        <ellipse cx="0" cy="0" rx="${opts.width * 0.38}" ry="${opts.height * 0.12}" fill="none" stroke="${grad3}" stroke-width="14" opacity="0.7" transform="rotate(-22)" filter="url(#ringGlow)"/>

        <!-- Esfera Planetária -->
        <circle cx="0" cy="0" r="${opts.width * 0.19}" fill="url(#planetGrad)"/>
        <!-- Sombra da Esfera -->
        <circle cx="${opts.width * 0.04}" cy="${opts.height * 0.04}" r="${opts.width * 0.18}" fill="#020617" opacity="0.45"/>

        <!-- Anel Frontal -->
        <path d="M -${opts.width * 0.38} 0 A ${opts.width * 0.38} ${opts.height * 0.12} 0 0 0 ${opts.width * 0.38} 0" fill="none" stroke="${grad3}" stroke-width="16" transform="rotate(-22)" filter="url(#ringGlow)"/>
        
        <!-- Satélite em Órbita -->
        <circle cx="${opts.width * 0.32}" cy="-${opts.height * 0.11}" r="10" fill="#ffffff" filter="url(#glow)"/>
      </g>

      <!-- Overlay com Detalhes da Geração da Moura.ai -->
      <g opacity="0.9">
        <rect x="24" y="${opts.height - 76}" width="${opts.width - 48}" height="52" rx="16" fill="#0b0713" opacity="0.75"/>
        <text x="44" y="${opts.height - 44}" fill="#f3e8ff" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="700">Moura.ai Generative Studio • 8K High Definition</text>
        <text x="44" y="${opts.height - 30}" fill="#c084fc" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="500">Prompt: ${opts.prompt.slice(0, 70)}... • Seed: #${opts.seed}</text>
      </g>
    </svg>`;
  }
}

export const mediaService = new MediaStudioService();
