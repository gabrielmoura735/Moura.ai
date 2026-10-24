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
   * Gera Carrossel Visual em Alta Resolução (SVG / HTML)
   */
  public generateCarousel(req: CarouselRequest) {
    const slides = [
      {
        slideNumber: 1,
        title: req.title,
        subtitle: 'Deslize para o lado para dominar essa estratégia 👉',
        accent: 'cyan'
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
}

export const mediaService = new MediaStudioService();
