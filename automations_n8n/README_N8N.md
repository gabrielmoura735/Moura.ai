# Guia de Automação Automática Moura.ai no n8n

Este diretório contém os **5 Workflows Oficiais Prontos para Uso** da plataforma **Moura.ai** para rodar no **n8n**.

---

## 🚀 Como Importar no seu n8n em 1 Minuto

1. Abra o painel do seu **n8n** (seja na nuvem, VPS ou local).
2. Clique no menu superior **Workflows** → **Add Workflow** (`+`).
3. No canto superior direito, clique nos três pontinhos (`⋮`) → **Import from File...**
4. Selecione qualquer um dos arquivos `.json` desta pasta:
   - `workflow_1_whatsapp_lead_qualification.json`
   - `workflow_2_viral_content_pipeline.json`
   - `workflow_3_healthcheck_selfhealing_alerts.json`
   - `workflow_4_microsaas_customer_onboarding.json`
   - `workflow_5_ai_agent_support_triage.json`
5. Clique no botão **Active** (Ativar) no topo do n8n.
6. Pronto! O fluxo passará a responder e se comunicar automaticamente com a sua **Moura.ai**!

---

## 📦 Detalhes dos 5 Workflows Inclusos

### 1. `workflow_1_whatsapp_lead_qualification.json`
- **Gatilho:** Webhook disparado assim que um visitante preenche o formulário no seu **Site para WhatsApp** gerado pela Moura.ai.
- **Ação:** Envia os dados para a Moura.ai qualificar a intenção e notificar a equipe de vendas com o link da conversa pronta.

### 2. `workflow_2_viral_content_pipeline.json`
- **Gatilho:** Cron agendado diariamente às 08:00 da manhã.
- **Ação:** Solicita à Moura.ai a geração de um roteiro viral para **Reels/Shorts (9:16)** e um **Carrossel de 5 slides**, deixando pronto para postar.

### 3. `workflow_3_healthcheck_selfhealing_alerts.json`
- **Gatilho:** Intervalo a cada 15 minutos.
- **Ação:** Verifica o status da API da Moura.ai. Se detectar qualquer anomalia ou lentidão, dispara o ciclo de **Autocorreção (Self-Healing)** e notifica você no WhatsApp/Telegram.

### 4. `workflow_4_microsaas_customer_onboarding.json`
- **Gatilho:** Webhook de confirmação de pagamento (Kiwify, Hotmart, Eduzz, Stripe).
- **Ação:** Realiza o upgrade imediato da conta do aluno/cliente para o plano contratado (Pro, Ultra ou Galaxi) e envia mensagem automática no WhatsApp com os dados de acesso.

### 5. `workflow_5_ai_agent_support_triage.json`
- **Gatilho:** Nova mensagem recebida no WhatsApp Business (Evolution API, Z-API, Baileys, Chatwoot ou Twilio).
- **Ação:** O Agente de Atendimento Especializado da Moura.ai responde o cliente com tom humanizado em menos de 3 segundos.

---

## 🔐 Configuração de Segurança dos Webhooks

Ao chamar os endpoints da Moura.ai pelo n8n, utilize o cabeçalho seguro:
```http
X-Moura-Signature: moura_n8n_secure_token_key
Content-Type: application/json
```
Essa chave garante que apenas a sua instância autorizada do n8n possa acionar tarefas e agentes dentro da plataforma.
