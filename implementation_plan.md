# PLANO DE IMPLEMENTAÇÃO — IDENTIDADE CÓSMICA, PERSONAGENS POR IA, CARROSSEIS & PERFIL AVANÇADO
## Expansão de Recursos Criativos, Configurações de Temas e Política de Conteúdo da Moura.ai

> **Documento Arquitetural e Funcional**  
> **Status:** Aguardando Aprovação do Usuário (Planning Mode)  
> **Marca / Plataforma:** **Moura.ai** (Mouras-World)  
> **Repositório GitHub:** `gabrielmoura735/Moura.ai`

---

## 1. Visão Geral das Novas Funcionalidades Solicitadas

### 1.1. Integração da Logo Oficial Cósmica 🪐
- Incorporar a imagem do planeta violeta com anéis enviada pelo usuário em `public/assets/logo.png`.
- Configurar como favicon oficial da aba do navegador (`favicon.png`).
- Integrar na Sidebar (menu lateral), Header e no topo do `README.md` do GitHub.

### 1.2. Fábrica de Personagens por IA (AI Character Studio) 🎭
- Criação de personagens e avatares inteligentes com suporte a:
  - **Nome e Arquétipo:** Herói, Mentor, Especialista Técnico, Parceiro Empático, Comediante, Vilão/Anti-herói, Personagem de Ficção/Anime, Mascote de Marca.
  - **Tom de Voz & Estilo:** Informal, Épico, Sedutor, Técnico, Misterioso, Amigável.
  - **História & Lore (Backstory):** Origem, motivações, segredos e universo onde vive.
  - **Prompt de Imagem para Avatar:** Geração de descrição detalhada pronta para Midjourney, Flux, DALL-E e geradores de imagem da Moura.ai.
  - **Exportação para Chatbot:** Formato pronto para importar em chatbots estilo Character.ai, WhatsApp ou agentes próprios da Moura.ai.

### 1.3. Estúdio Interativo de Carrosséis para Redes Sociais 📱
- Geração de carrosséis de 5 a 7 slides para Instagram e LinkedIn.
- **Visualizador Slide por Slide:** O usuário navega entre os slides diretamente na interface, inspeciona o layout visual, copia os textos formatados e exporta o conteúdo.
- Ganchos visuais para capa, slides de conteúdo denso e chamada final para engajamento (salvar/comentar/compartilhar).

### 1.4. Nova Aba de Configurações do Perfil do Usuário ⚙️
- **Dados Pessoais:**
  - Nome completo do usuário.
  - Data de Nascimento no formato `dd/mm/aaaa`.
  - Bio / Descrição do criador.
- **Seletor de Temas do Sistema:**
  - 🌙 **Escuro Obsidian** (Padrão)
  - ☀️ **Claro Tech** (Clean)
  - 🌌 **Lilás Cósmico / Galáctico** (Harmonizado com a Logo)
  - 🌊 **Azul Cósmico Profundo**
  - 🌿 **Esmeralda Cyber**
- **Sistema de Classificação Indicativa de Conteúdo (Content Rating Filter):**
  - Opções selecionáveis: **Livre**, **10**, **12**, **14**, **16**, **18** e **Sem Filtro (Criatividade Total)**.
  - **Termo de Responsabilidade Ética:** Mensagem clara de que o usuário administra sua própria IA com responsabilidade. A criação de conteúdo adulto ou narrativas livres é permitida para chatbots e ficção pessoal, sendo estritamente proibido o uso indevido de imagens ou dados de pessoas reais (antidifamação e anti-deepfake não consensual).
- **Toggle de Verificação de Imagem (Image Guard):**
  - Opção para ativar ou desativar a verificação estrita de imagens ("para que o próprio usuário administre sua IA sob sua responsabilidade").

---

## 2. Arquitetura Técnica e Alterações Planejadas

### 2.1. Alterações no Banco de Dados (`src/models/index.ts` e `src/db/index.ts`)
- Adicionar campos no perfil do usuário:
  - `birthDate`: string (`dd/mm/aaaa`)
  - `theme`: `'dark' | 'light' | 'cosmic_purple' | 'cosmic_blue' | 'cyber_emerald'`
  - `contentRating`: `'livre' | '10' | '12' | '14' | '16' | '18' | 'sem_filtro'`
  - `imageVerificationEnabled`: boolean
- Criar modelo `Character`:
  - `id, userId, name, archetype, voiceTone, backstory, promptImage, systemPrompt, contentRating, createdAt`

### 2.2. Alterações nas Rotas da API (`src/routes/api.ts`)
- `POST /api/user/profile`: Atualiza dados do perfil (nome, data nascimento, tema, classificação, toggle de imagens).
- `POST /api/characters/generate`: Gera personagem estruturado com IA (lore, tom de voz, prompt de imagem, prompt de chatbot).
- `GET /api/characters`: Lista personagens do usuário.

### 2.3. Alterações na Interface (`public/index.html`)
- Inclusão da logo cósmica oficial na barra lateral e favicon.
- Nova aba de navegação: **Personagens por IA** (`#view-characters`).
- Nova aba de navegação: **Configurações do Perfil** (`#view-profile`).
- Atualização do **Estúdio de Carrosséis** com visualizador interativo slide a slide.
- Sistema de temas reativo em CSS que altera instantaneamente as cores da interface (Escuro, Claro, Lilás Cósmico, Azul e Esmeralda).

### 2.4. Testes Automatizados (`tests/runner.ts`)
- Testes para criação de personagens, validação de temas, classificação de conteúdo e persistência das configurações de perfil.

### 2.5. Sincronização no GitHub
- Commit e push automático para `gabrielmoura735/Moura.ai`.

---

## 3. Solicitação de Aprovação

Conforme a regra do *Planning Mode*, nenhuma alteração de código foi realizada ainda.

**Você aprova a execução deste plano para adicionarmos a logo oficial, a fábrica de personagens, os carrosséis interativos, as configurações de perfil com múltiplos temas e o controle de classificação indicativa com responsabilidade do usuário?**
