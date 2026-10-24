# ⚡ Moura.ai — Plataforma Autônoma de Inteligência Artificial & Produtos Digitais
> **Desenvolvida para escala global no ecossistema Mouras-World**  
> **Repositório Oficial:** [github.com/gabrielmoura735/Moura.ai](https://github.com/gabrielmoura735/Moura.ai)

---

## 💎 Visão Geral da Moura.ai

A **Moura.ai** é uma plataforma de Inteligência Artificial de última geração projetada para transformar instruções em linguagem natural em **produtos digitais reais, funcionais, seguros e monetizáveis**.

Diferente de interfaces convencionais de chat ou protótipos estáticos, a Moura.ai opera com uma **equipe autônoma de agentes especializados**, um **motor obrigatório de autocorreção (Self-Healing Loop)**, **gerador de sites de alta conversão para WhatsApp**, **fábrica de Micro-SaaS**, **estúdio de mídias virais (9:16)** e **integração automática com o n8n**.

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
| **Criação de Empresas Digitais** | Até 5 / dia | Até 32 / dia | Até 80 / dia | Até 200 / dia |
| **Vídeos, Shorts, Reels & Roteiros** | Até 5 / dia | Até 32 / dia | Até 80 / dia | Até 200 / dia |
| **Pesquisas Avançadas de Mercado** | Até 5 / dia | Até 32 / dia | Até 80 / dia | Até 200 / dia |
| **Agentes de IA Especializados** | Até 5 / dia | Até 32 / dia | Até 80 / dia | Até 200 / dia |
| **Automações n8n & Webhooks** | 1 webhook | 10 webhooks ativos | 50 webhooks ativos | Ilimitado + Prioritário |

*Nota: Todos os valores e limites são configuráveis dinamicamente via arquivo `.env` ou pelo Painel Administrativo sem alterar o código.*

---

## 🛠️ Módulos Centrais Implementados

### 1. 📱 Builder de Sites para WhatsApp
- Criação instantânea de páginas responsivas (mobile-first) focadas em fechamento direto.
- Botão flutuante pulsante de WhatsApp com link dinâmico formatado (`wa.me`).
- Catálogo de produtos com botão individual "Pedir no WhatsApp em 1 clique".
- Modal de pré-atendimento que qualifica o lead antes de abrir o aplicativo.

### 2. 🤖 Esquadrão de Agentes Especializados
- **Planner Agent:** Análise de requisitos, escopo e dependências.
- **Architect & Security Agent:** Verificação de segurança (OWASP), isolamento de dados e escalabilidade.
- **Automation Agent:** Configuração de pontes e gatilhos para o n8n.
- **QA & Reviewer Agent:** Validação de critérios de aceitação e testes de integridade.

### 3. 🩺 Motor Obrigatório de Autocorreção (Self-Healing Loop)
Operação baseada no ciclo:
$$\text{Planejar} \longrightarrow \text{Executar} \longrightarrow \text{Testar} \longrightarrow \text{Detectar} \longrightarrow \text{Diagnosticar} \longrightarrow \text{Corrigir} \longrightarrow \text{Testar Novamente} \longrightarrow \text{Registrar}$$
- Detecção em tempo real de falhas de sintaxe e quebra de regras.
- Aplicação de patch localizado sem destruição de código prévio.
- Histórico completo gravado em log de auditoria.

### 4. ⚡ Central de Automações Automáticas no n8n
Pacote completo com 5 workflows em formato `.json` prontos para importação em `automations_n8n/`:
1. `workflow_1_whatsapp_lead_qualification.json`: Qualificação autônoma de leads recebidos pelo site.
2. `workflow_2_viral_content_pipeline.json`: Geração automática diária de roteiros de Reels/Shorts às 08h.
3. `workflow_3_healthcheck_selfhealing_alerts.json`: Monitoramento de saúde com autocorreção ativa.
4. `workflow_4_microsaas_customer_onboarding.json`: Liberação instantânea de acesso após confirmação de pagamento.
5. `workflow_5_ai_agent_support_triage.json`: Ponte inteligente para responder clientes no WhatsApp em segundos.

### 5. 🎬 Estúdio de Vídeos, Shorts & Reels (9:16)
- Roteiros virais com ganchos de 3 segundos, marcações temporais e sugestão de SFX.
- Prompts prontos para ferramentas de geração de vídeo por IA (Runway, Sora, Luma, Pika).

---

## 💻 Como Executar a Moura.ai Localmente

### Pré-requisitos
- Node.js `v20+` (testado e verificado no Node.js v26)
- npm `v10+`

### 1. Instalar Dependências
```bash
npm install
```

### 2. Executar a Bateria de Testes Automatizados (33 Testes)
```bash
npm test
```

### 3. Compilar o Projeto TypeScript
```bash
npm run build
```

### 4. Iniciar a Plataforma
```bash
# Modo de desenvolvimento com hot-reload:
npm run dev

# Modo de produção compilado:
npm start
```

Acesse no navegador: **[http://localhost:3000](http://localhost:3000)**

---

## 🔒 Segurança & Boas Práticas
- Autenticação por token JWT com expiração configurável.
- Hashing de senhas com `bcryptjs`.
- Separação estrita de dados por organização (Multi-Tenancy).
- Proteção contra injeção e sanitização de payloads de webhooks via assinatura `X-Moura-Signature`.

---

## 🌐 Publicação & CI/CD
O repositório está configurado com **GitHub Actions** em `.github/workflows/`:
- `ci.yml`: Validação automática de build e execução de 100% dos testes a cada commit ou pull request.
- `self_healing_check.yml`: Auditoria diária de integridade e verificação das automações n8n.

---

© 2026 **Moura.ai** • Desenvolvido por Gabriel Moura • **Mouras-World**
