<p align="center">
  <img src="public/assets/logo.png" width="140" alt="Moura.ai Logo Cósmica" />
</p>

# ⚡ Moura.ai — Plataforma Autônoma de Inteligência Artificial & Produtos Digitais
> **Desenvolvida para escala global no ecossistema Mouras-World**  
> **Repositório Oficial:** [github.com/gabrielmoura735/Moura.ai](https://github.com/gabrielmoura735/Moura.ai)

---

## 💎 Visão Geral da Moura.ai

A **Moura.ai** é uma plataforma de Inteligência Artificial de última geração projetada para transformar instruções em linguagem natural em **produtos digitais reais, funcionais, seguros e monetizáveis**.

Equipada com uma identidade cósmica (planeta violeta com anéis orbitais), a plataforma reúne uma **equipe autônoma de agentes especializados**, um **motor obrigatório de autocorreção (Self-Healing Loop)**, **gerador de sites de alta conversão para WhatsApp**, **fábrica de personagens por IA**, **estúdio de carrosséis com visualizador slide a slide**, **roteiros virais (9:16)** e **integração automática com o n8n**.

---

## 🚀 Modelo Comercial & Política de Tokens

A Moura.ai adota uma política de **TOKENS ILIMITADOS** para todos os usuários, estruturando seu valor através de poder computacional e cotas diárias de criação por categoria:

| Recurso / Benefício | Plano Grátis | Plano Pro (Criador & Dev) | Plano Ultra (Agências & PMEs) | Plano Galaxi (Enterprise VIP) |
| :--- | :--- | :--- | :--- | :--- |
| **Valor Mensal** | **R$ 0** | **R$ 197 / mês** *(~R$ 6,50/dia)* | **R$ 697 / mês** *(~R$ 23/dia)* | **R$ 1.197 / mês** *(~R$ 39/dia)* |
| **Valor Anual (20% OFF)** | **R$ 0** | **R$ 1.890 / ano** *(12x R$ 157)* | **R$ 6.690 / ano** *(12x R$ 557)* | **R$ 11.490 / ano** *(12x R$ 957)* |
| **Tokens de IA** | **ILIMITADO** | **ILIMITADO** | **ILIMITADO** | **ILIMITADO** |
| **Poder de Processamento** | Base Padrão | **15x Mais Potente** | **30x Mais Potente** | **Potência Máxima Galaxi** |
| **Imagens de Alta Resolução** | Até 32 / dia | Até 32 / dia (HD) | Até 80 / dia (4K Ultra) | Até 200 / dia (Estúdio VIP) |
| **Criação de Sites & Sites WhatsApp** | Até 5 / dia | Até 32 / dia | Até 80 / dia | Até 200 / dia |
| **Criação de SaaS & Micro-SaaS** | Até 5 / dia | Até 32 / dia | Até 80 / dia | Até 200 / dia |
| **Personagens por IA & Avatares** | Até 5 / dia | Até 32 / dia | Até 80 / dia | Até 200 / dia |
| **Vídeos, Shorts, Reels & Carrosséis** | Até 5 / dia | Até 32 / dia | Até 80 / dia | Até 200 / dia |
| **Pesquisas Avançadas de Mercado** | Até 5 / dia | Até 32 / dia | Até 80 / dia | Até 200 / dia |
| **Agentes de IA Especializados** | Até 5 / dia | Até 32 / dia | Até 80 / dia | Até 200 / dia |
| **Automações n8n & Webhooks** | 1 webhook | 10 webhooks ativos | 50 webhooks ativos | Ilimitado + Prioritário |

*Nota: Todos os valores e limites são configuráveis dinamicamente via arquivo `.env` ou pelo Painel Administrativo.*

---

## 🛠️ Módulos Centrais Implementados

### 1. 🪐 Identidade Visual Cósmica
- Logotipo oficial do planeta violeta com anéis estelares integrado no cabeçalho, menu lateral e favicon da aba do navegador.
- Suporte a múltiplos temas visuais: **Lilás Cósmico** (Padrão), **Escuro Obsidian**, **Azul Cósmico**, **Esmeralda Cyber** e **Claro Tech**.

### 2. 🎭 Fábrica de Personagens por IA (AI Character Studio)
- Criação de personagens e personas para chatbots (estilo Character.ai, agentes de ficção ou mascotes de marcas).
- Ficha completa com Nome, Arquétipo, Tom de Voz, História/Lore, Prompt para Avatar Visual e Prompt de Sistema para Chat.

### 3. 📱 Estúdio de Carrosséis Sociais
- Criação de carrosséis de 5 slides com visualizador interativo slide por slide diretamente na interface.
- Ganchos visuais para capa, blocos de conteúdo e chamada final para engajamento.

### 4. ⚙️ Perfil do Usuário, Classificação Indicativa & Responsabilidade
- Dados do criador com Nome e Data de Nascimento no formato `dd/mm/aaaa`.
- Classificação indicativa configurável: **Livre, 10, 12, 14, 16, 18 e Sem Filtro (Criatividade Livre)**.
- **Autonomia & Responsabilidade:** Toggle para ativar ou desativar a verificação de imagens em sua própria instância, com termo de responsabilidade do criador (proibido o uso indevido da imagem de pessoas reais/difamação).

### 5. 📱 Builder de Sites para WhatsApp
- Criação de páginas responsivas (mobile-first) focadas em fechamento direto.
- Botão flutuante pulsante de WhatsApp com link dinâmico formatado (`wa.me`).
- Catálogo de produtos com botão individual "Pedir no WhatsApp em 1 clique".
- Modal de pré-atendimento que qualifica o lead antes de abrir o aplicativo.

### 6. 🩺 Motor Obrigatório de Autocorreção (Self-Healing Loop)
Operação baseada no ciclo:
$$\text{Planejar} \longrightarrow \text{Executar} \longrightarrow \text{Testar} \longrightarrow \text{Detectar} \longrightarrow \text{Diagnosticar} \longrightarrow \text{Corrigir} \longrightarrow \text{Testar Novamente} \longrightarrow \text{Registrar}$$

### 7. ⚡ Central de Automações Automáticas no n8n
Pacote completo com 5 workflows em formato `.json` prontos para importação em `automations_n8n/`.

---

## 💻 Como Executar Localmente

```bash
# 1. Instalar Dependências
npm install

# 2. Executar Bateria de Testes Automatizados (43 Testes)
npm test

# 3. Compilar TypeScript
npm run build

# 4. Iniciar Servidor
npm start
```

Acesse no navegador: **[http://localhost:3333](http://localhost:3333)**

---

© 2026 **Moura.ai** • Desenvolvido por Gabriel Moura • **Mouras-World**
