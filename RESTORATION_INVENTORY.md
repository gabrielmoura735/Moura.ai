# Inventário de restauração — Moura.ai

Atualizado em 2026-11-13.

## Itens preservados

- `rebuild/moura-growth-os-v2`: branch local de reconstrução; commit atual `354c826`.
- `automations_n8n/`: cinco workflows versionados para WhatsApp, conteúdo viral, health check, onboarding e triagem de agente.
- `src/`: servidor, rotas, autenticação, banco, agentes, prompts, mídia, builder e self-healing.
- `public/`: interface, logo e favicon.
- `tests/runner.ts`: suíte local de testes.
- `data/moura_database.json`: dados locais de desenvolvimento.
- `implementation_plan.md`: plano técnico dos prompts e módulos.
- `C:/Users/User/OpenBot/Shared/whatsapp-automation-flow.md`: fluxo operacional do WhatsApp.
- `C:/Users/User/OpenBot/Shared/Transfers/`: blueprints e materiais recebidos preservados.

## Estado

- Produção não foi alterada.
- Nenhum arquivo acima foi excluído nesta restauração.
- Não há evidência local suficiente para reconstruir itens removidos que não estejam no Git, nos transfers ou no inventário acima.
- A branch v2 continua separada da `main` e pronta para novas melhorias e validação.
- Preview Vercel validado: `https://moura-ai-v2-preview-aw3umj7qt-moura-work.vercel.app` (Ready, HTTP 200).
- Segredos `JWT_SECRET` e `N8N_SECRET_TOKEN` foram configurados apenas no ambiente Preview do projeto Vercel de staging.
- Novo projeto Supabase de staging criado em paralelo: `lhtapnwmqttxzdhzftpm` (`https://lhtapnwmqttxzdhzftpm.supabase.co`). O projeto anterior foi preservado.
- RLS automático foi ativado; tabelas `moura_database_snapshots` e `moura_migration_meta` foram criadas com privilégios restritos.
- Snapshot integral do `data/moura_database.json` gravado com sucesso no novo projeto (`1` snapshot verificado via REST).
- `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` do novo projeto estão configurados somente no Preview Vercel.
- Preview final após a conexão: `https://moura-ai-v2-preview-fa7hg7qhg-moura-work.vercel.app` (Ready, HTTP 200).

## Regra de recuperação

Novos itens devem ser adicionados primeiro à v2, testados e registrados aqui. A remoção de versões antigas só deve ocorrer após backup, comparação e aprovação explícita.
