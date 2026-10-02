-- Atualização mensal automática da base (rodar uma vez, direto no banco).
-- Todo dia 1º às 06:00 (UTC), a rotina pesquisa com a IA as perguntas mais feitas que o LUMI não encontrou.
-- O resultado vai para "Conteúdos encontrados pela IA" — nada entra na base oficial sem revisão humana.
--
-- Os segredos ficam no Vault do Supabase (criptografados), nunca neste arquivo. Antes, rode (uma vez):
--   select vault.create_secret('<URL do projeto>', 'lumi_project_url');
--   select vault.create_secret('<anon key>', 'lumi_anon_key');
--   select vault.create_secret('<mesmo valor do secret CRON_SECRET das funções>', 'lumi_cron_secret');
create extension if not exists pg_cron;
create extension if not exists pg_net;

select cron.unschedule(jobid) from cron.job where jobname = 'lumi-atualizacao-mensal';
select cron.schedule('lumi-atualizacao-mensal', '0 6 1 * *', $$
  select net.http_post(
    url := (select decrypted_secret from vault.decrypted_secrets where name = 'lumi_project_url') || '/functions/v1/kb-admin',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'lumi_anon_key'),
      'x-cron-secret', (select decrypted_secret from vault.decrypted_secrets where name = 'lumi_cron_secret')),
    body := '{"action":"scheduled"}'::jsonb,
    timeout_milliseconds := 300000
  );
$$);
