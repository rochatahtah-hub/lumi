# Configuração de Push Notifications para LUMI

## 📋 Pré-requisitos

- Projeto Supabase com banco de dados PostgreSQL
- VAPID keys (geradas via web-push)
- Variáveis de ambiente configuradas

## 🔧 Passo 1: Gerar VAPID Keys

Web Push requer um par de chaves VAPID (Voluntary Application Server Identification) para assinar as notificações.

### Opção A: Usando `web-push` (Node.js)

```bash
npm install -g web-push

web-push generate-vapid-keys
```

Isso gerará:
```
Public Key: [CHAVE_PÚBLICA]
Private Key: [CHAVE_PRIVADA]
```

### Opção B: Usando site online
https://web-push-codelab.glitch.me/

## 🌍 Passo 2: Configurar Variáveis de Ambiente

### `.env.local` (Frontend)
```
VITE_VAPID_PUBLIC_KEY=sua_chave_publica_aqui
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_publica_supabase
```

### Supabase Dashboard → Project Settings → Edge Functions Secrets
```
VAPID_PUBLIC_KEY=sua_chave_publica
VAPID_PRIVATE_KEY=sua_chave_privada
VAPID_SUBJECT=mailto:seu_email@example.com
```

## 📊 Passo 3: Criar tabelas no Supabase

Executar o arquivo SQL:
```bash
supabase db push
```

Ou copiar e colar o conteúdo de `supabase/migrations/create_push_subscriptions.sql` no SQL Editor do Supabase Dashboard.

## ☁️ Passo 4: Deploy da Edge Function

```bash
supabase functions deploy send-push-notifications
```

Verificar status:
```bash
supabase functions list
```

## 🧪 Passo 5: Testar

### Teste 1: Em Desenvolvimento
```bash
npm run dev
# Abrir em PWA (chrome://apps ou add to home screen)
# Clicar em "Ativar lembretes"
# Verificar no DevTools > Application > Service Workers
```

### Teste 2: Enviar Notificação
```bash
npx ts-node scripts/send-test-notification.ts
```

### Teste 3: Verificar no Supabase
```sql
SELECT * FROM push_subscriptions;
SELECT * FROM notification_log ORDER BY sent_at DESC LIMIT 5;
```

## 📱 Passo 6: Testar em Produção

1. Instalar LUMI como PWA em https://lumiensina.app.br
   - Chrome: Menu → "Instalar LUMI"
   - Safari: Compartilhar → "Adicionar à tela inicial"
   - Samsung Internet: Menu → "Instalar app"

2. Abrir PWA instalado
3. Clicar em "Ativar lembretes"
4. Fechar o app (não apenas minimizar)
5. Executar:
   ```bash
   npx ts-node scripts/send-test-notification.ts
   ```
6. Verificar se recebeu notificação

## 🔄 Agendamento Automático (Optional)

Para enviar notificações automaticamente no horário escolhido, usar Supabase Cron Extension:

```sql
-- Criar função que chama a Edge Function
CREATE OR REPLACE FUNCTION trigger_scheduled_notifications()
RETURNS void AS $$
BEGIN
  -- Chamar HTTP request para a Edge Function
  -- (requer extensão pgsql_http)
  NULL;
END;
$$ LANGUAGE plpgsql;

-- Agendar para rodar todos os dias
SELECT cron.schedule('send_scheduled_notifications', '*/30 * * * *', 'SELECT trigger_scheduled_notifications()');
```

## 🛡️ Segurança

- [ ] VAPID_PRIVATE_KEY nunca em código (usar Supabase Secrets)
- [ ] Validar `Authorization: Bearer` na Edge Function
- [ ] HTTPS obrigatório (PWA requer HTTPS)
- [ ] Rate limit nas requests
- [ ] Não armazenar senhas de usuários

## 📈 Monitoramento

### Dashboard Supabase
- `push_subscriptions`: Ver quantos usuários têm notificações ativas
- `notification_log`: Ver histórico de envios

### Métricas importantes
```sql
-- Subscriptions ativas
SELECT COUNT(*) FROM push_subscriptions WHERE status = 'active';

-- Taxa de entrega
SELECT 
  COUNT(*) as total,
  SUM(CASE WHEN delivered THEN 1 ELSE 0 END) as delivered,
  ROUND(100.0 * SUM(CASE WHEN delivered THEN 1 ELSE 0 END) / COUNT(*), 2) as delivery_rate
FROM notification_log
WHERE sent_at > NOW() - INTERVAL '7 days';
```

## 🐛 Troubleshooting

### "Push notifications não suportadas"
- Verificar se PWA está instalado
- Verificar se navegador suporta Service Workers
- Verificar console do navegador

### "Erro ao salvar subscription"
- Verificar permissão do banco de dados
- Verificar se tabela foi criada
- Verificar conexão com Supabase

### "Notificação não chega"
- Verificar se Status da subscription é 'active'
- Verificar se `notification_enabled` é true
- Verificar logs da Edge Function
- Testar com navegador aberto primeiro

### "Erro VAPID"
- Verificar se chaves estão corretas
- Verificar se SUBJECT é um email válido
- Regenerar chaves se necessário

## 📚 Referências

- [Web Push API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
- [Service Worker MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [VAPID Spec](https://datatracker.ietf.org/doc/html/draft-thomson-webpush-vapid)
