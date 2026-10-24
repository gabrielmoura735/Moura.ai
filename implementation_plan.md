# PLANO DE IMPLEMENTAÇÃO — MOURA.AI (ESTRATÉGIA DE PRECIFICAÇÃO E EXECUÇÃO)
## Plataforma de IA Avançada, Autônoma, Criação de Produtos, Sites para WhatsApp, Micro-SaaS e Automação Global

> **Documento Arquitetural, Estratégia Comercial e Plano de Execução**  
> **Status:** Aguardando Aprovação Final do Usuário (Planning Mode)  
> **Nome da IA / Marca:** **Moura.ai**  
> **Organização:** Mouras-World  
> **Repositório GitHub Alvo:** `gabrielmoura735/Moura.ai`

---

## 1. Estratégia de Precificação Profissional Definida

Para maximizar a conversão de vendas, o ticket médio e a receita recorrente mensal (MRR), estruturamos a precificação com base em psicologia de consumo SaaS consagrada (terminações em 97, âncoras de alto valor e planos anuais com 20% de desconto):

### 1.1. Tabela Oficial de Planos da Moura.ai

| Detalhes do Plano | Plano Grátis | Plano Pro (Criador & Dev) | Plano Ultra (Agências & PMEs) | Plano Galaxi (Enterprise) |
| :--- | :--- | :--- | :--- | :--- |
| **Valor Mensal** | **R$ 0** | **R$ 197 / mês** *(~R$ 6,50/dia)* | **R$ 697 / mês** *(~R$ 23/dia)* | **R$ 1.197 / mês** *(~R$ 39/dia)* |
| **Valor Anual (20% OFF)** | **R$ 0** | **R$ 1.890 / ano** *(12x R$ 157)* | **R$ 6.690 / ano** *(12x R$ 557)* | **R$ 11.490 / ano** *(12x R$ 957)* |
| **Tokens de IA** | **Ilimitado** | **Ilimitado** | **Ilimitado** | **Ilimitado** |
| **Capacidade de IA** | Padrão | **15x Mais Potente** | **30x Mais Potente (Complexo)** | **Potência Máxima Galaxi** |
| **Imagens de Alta Fidelidade** | Até 32 / dia | Até 32 / dia (HD) | Até 80 / dia (4K Ultra) | Até 200 / dia (Estúdio VIP) |
| **Criação de Sites & Sites WhatsApp** | Até 5 / dia | Até 32 / dia | Até 80 / dia | Até 200 / dia |
| **Criação de SaaS & Micro-SaaS** | Até 5 / dia | Até 32 / dia | Até 80 / dia | Até 200 / dia |
| **Criação de Empresas Completas** | Até 5 / dia | Até 32 / dia | Até 80 / dia | Até 200 / dia |
| **Vídeos, Shorts, Reels & Roteiros** | Até 5 / dia | Até 32 / dia | Até 80 / dia | Até 200 / dia |
| **Pesquisas Avançadas de Mercado** | Até 5 / dia | Até 32 / dia | Até 80 / dia | Até 200 / dia |
| **Agentes de IA Especializados** | Até 5 / dia | Até 32 / dia | Até 80 / dia | Até 200 / dia |
| **Automações n8n & Webhooks** | 1 webhook | 10 webhooks ativos | 50 webhooks ativos | Ilimitado + Prioridade Zero |
| **Configuração de Preços** | *Configurável* | *Editável no Painel Admin* | *Editável no Painel Admin* | *Editável no Painel Admin* |

> **Nota Estratégica:** Todos esses valores estarão configurados no banco de dados e no arquivo de configuração da aplicação. Você poderá alterá-los a qualquer momento pelo Painel Administrativo ou pelo arquivo `.env` sem precisar mexer em nenhuma linha de código!

---

## 2. Visão Geral dos Módulos Funcionais da Moura.ai

1. **Frontend Premium Obsidian Cyber (Dark & Light Mode):**
   - Design de classe mundial inspirado em ferramentas líderes globais.
   - Alternância de temas instantânea, tipografia ultra legível, micro-interações elegantes.
   - Navegação fluida: Dashboard, Studio Multi-Agente, Builder de Sites/WhatsApp, Fábrica de Micro-SaaS, Estúdio de Mídia (Reels/Shorts/Carrosséis), Central n8n, Console de Autocorreção e Planos.

2. **Módulo de Sites para WhatsApp (Ultra Conversão):**
   - Criação de páginas de captura focadas em conversão no WhatsApp.
   - Botão flutuante inteligente, links dinâmicos formatados (`wa.me`), catálogos com botão direto "Pedir no WhatsApp" e formulários de pré-qualificação.

3. **Fábrica de Agentes Especializados:**
   - Agente SDR / Vendas.
   - Agente Atendimento & Suporte SAC.
   - Agente Imobiliário.
   - Agente Clínicas e Consultórios.
   - Agente Delivery & Restaurantes.
   - Agente Desenvolvedor & Arquiteto de Software.

4. **Estúdio de Vídeos, Shorts, Reels & Carrosséis:**
   - Roteiros virais (9:16) com ganchos de 3 segundos, timestamps e chamadas para ação.
   - Gerador de carrosséis visuais e cards exportáveis.

5. **Motor de Autocorreção (Self-Healing Loop - Seção 9 Obrigatória):**
   - Ciclo fechado: Planejar → Executar → Testar → Detectar → Diagnosticar → Corrigir → Testar Novamente → Registrar Auditoria.

6. **Pacote de Automações n8n (5 Workflows Prontos em JSON):**
   - `lead_whatsapp_qualification_n8n.json`
   - `viral_content_shorts_reels_pipeline.json`
   - `microsaas_customer_onboarding.json`
   - `self_healing_health_alert.json`
   - `ai_agent_webhook_bridge.json`

7. **Publicação no GitHub & CI/CD:**
   - Criação automática do repositório `gabrielmoura735/Moura.ai` na sua conta do GitHub.
   - Workflows de CI/CD para testes contínuos e integridade de automações.

---

## 3. Fases de Execução Propostas

1. **Fase 1: Preparação e Preservação de Dados Anteriores**  
   Mover os arquivos do projeto anterior para a pasta isolada `legacy_oracao_365/`.
2. **Fase 2: Fundação Backend, Banco de Dados e Motor de Cotas**  
   Inicializar o projeto Node.js/TypeScript, SQLite em modo WAL, tabelas de usuários, planos com os preços definidos, controle diário de 5/32/80/200 gerações e tokens ilimitados.
3. **Fase 3: Orquestrador de IA, Multi-Provider e Sites para WhatsApp**  
   Implementar os serviços centrais com fallback automático, geração de sites para WhatsApp e gerador de Micro-SaaS.
4. **Fase 4: Fábrica de Agentes Especializados e Estúdio de Vídeos/Reels**  
   Implementar os agentes sob demanda e os geradores de scripts/storyboards.
5. **Fase 5: Motor de Autocorreção (Self-Healing)**  
   Implementar o ciclo de teste, diagnóstico de falhas, patch localizado e histórico de auditoria.
6. **Fase 6: Interface Web Premium Completa**  
   Desenvolver a aplicação SPA funcional, com todas as páginas, preview em sandbox ao vivo e troca de temas.
7. **Fase 7: Pacote de Automações n8n**  
   Criar os 5 arquivos JSON de automação e o manual de importação.
8. **Fase 8: Bateria de Testes Automatizados**  
   Executar testes unitários e de integração de todos os módulos.
9. **Fase 9: Publicação no GitHub (`gabrielmoura735/Moura.ai`)**  
   Criar o repositório oficial no GitHub via `gh`, subir todo o código com commits semânticos e configurar GitHub Actions.
10. **Fase 10: Relatório Final de Conclusão**  
    Apresentação das funcionalidades, manual de uso e próximos passos.

---

## 4. Solicitação de Aprovação

Com a precificação profissional definida e todos os módulos mapeados, estamos prontos para executar.

**Você aprova a execução imediata deste plano para construirmos a Moura.ai e publicá-la no seu GitHub?**
