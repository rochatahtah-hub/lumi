# ✅ Checklist de Implantação - Push Notifications LUMI

## 🎯 O que foi implementado

### Frontend (Cliente)
- ✅ Componente `NotificationRequest` - solicita permissão amigavelmente
- ✅ Componente `NotificationSettings` - painel de configuração de horários
- ✅ Lib `pushNotifications.ts` - gerencia inscriptions
- ✅ Service Worker customizado com 8 mensagens variadas
- ✅ Integração no `App.tsx`

### Backend (Servidor)
- ✅ Schema SQL com tabelas `push_subscriptions` e `notification_log`
- ✅ Supabase Edge Function `send-push-notifications`
- ✅ Script helper para enviar testes

### Documentação
- ✅ `PUSH_NOTIFICATIONS_SETUP.md` - guia completo de setup
- ✅ Este checklist

## 🚀 Próximos Passos (INDISPENSÁVEL)

### 1️⃣ Gerar VAPID Keys

```bash
npm install -g web-push
web-push generate-vapid-keys
```

Resultado esperado:
```
Public Key: XXXXXXXX...
Private Key: YYYYYYYY...
```

### 2️⃣ Configurar variáveis de ambiente

#### No `.env.local` (Frontend):
```
VITE_VAPID_PUBLIC_KEY=<sua_chave_publica>
```

#### No Supabase → Project Settings → Edge Functions Secrets:
```
VAPID_PUBLIC_KEY=<sua_chave_publica>
VAPID_PRIVATE_KEY=<sua_chave_privada>
VAPID_SUBJECT=mailto:seu_email@lumiensina.com.br
```

### 3️⃣ Executar migrations no Supabase

**Opção A**: Via CLI
```bash
supabase db push
```

**Opção B**: Manual
1. Ir a: https://supabase.com/dashboard
2. Projeto LUMI → SQL Editor
3. Copiar/colar conteúdo de `supabase/migrations/create_push_subscriptions.sql`
4. Executar

### 4️⃣ Deploy da Edge Function

```bash
supabase functions deploy send-push-notifications
```

Verificar:
```bash
supabase functions list
```

## 🧪 Testes (Em Ordem)

### Teste 1: Em Desenvolvimento Local
```bash
npm run dev
```
1. Abrir em Chrome → Menu → "Instalar LUMI"
2. Abrir PWA instalado
3. Clicar em "Ativar lembretes"
4. Verificar: Application → Service Workers → Status "activated"

### Teste 2: Enviar Notificação Local
```bash
npx ts-node scripts/send-test-notification.ts
```

Esperar notificação chegar no PWA instalado.

### Teste 3: Em Produção (IMPORTANTE!)
1. Abrir https://lumiensina.app.br em celular/tablet
2. Menu → "Instalar LUMI"
3. Abrir PWA instalado
4. Clicar em "Ativar lembretes"
5. **Fechar completamente o app** (não apenas minimizar)
6. Aguardar 30 segundos
7. Executar:
   ```bash
   npx ts-node scripts/send-test-notification.ts
   ```
8. Verificar se notificação aparece na barra de notificações

### Teste 4: Clicar na Notificação
- Clicar na notificação
- Verificar se abre LUMI
- Verificar se vai para `/estudos`

### Teste 5: Configurar Horário
1. Abrir LUMI
2. Menu → Mais
3. Encontrar seção "Lembretes de estudo"
4. Mudar horário para 14:30
5. Clicar "Salvar horário"
6. Verificar: Supabase → `push_subscriptions` → `preferred_hour` = 14

### Teste 6: Desativar Notificações
1. Clicar "Desativar"
2. Verificar: Supabase → `push_subscriptions` → `status` = 'revoked'

## 📊 Verificações no Supabase

### Quantos usuários ativaram notificações?
```sql
SELECT COUNT(*) FROM push_subscriptions WHERE status = 'active';
```

### Último envio foi bem-sucedido?
```sql
SELECT * FROM notification_log ORDER BY sent_at DESC LIMIT 5;
```

### Usuários que recusaram ou desativaram?
```sql
SELECT COUNT(*) FROM push_subscriptions 
WHERE status != 'active' OR notification_enabled = false;
```

## 🔐 Segurança - Verificação

- [ ] VAPID_PRIVATE_KEY configurado apenas em Supabase Secrets (NUNCA em código)
- [ ] Variáveis de ambiente em `.env.local` não versionadas (`git ignore`)
- [ ] HTTPS ativado (PWA requer HTTPS)
- [ ] Testar que notificação não vem para quem recusou

## 🛑 Troubleshooting Rápido

### "Push notifications não suportadas"
→ Verificar se é PWA instalado (não apenas navegador)

### "Erro ao salvar subscription"
→ Verificar se Edge Function está deployada
→ Verificar se tabelas foram criadas no Supabase

### "Notificação não chega"
→ Verificar se PWA está fechado (não aberto em background)
→ Testar script `send-test-notification.ts` com mais verbosidade

### "ServiceWorker não encontrado"
→ Fazer hard refresh (Ctrl+Shift+R)
→ Limpar cache do navegador

## 📈 Monitoramento Contínuo

A cada semana, executar:

```sql
-- Tendência de ativações
SELECT 
  DATE(authorized_at) as data,
  COUNT(*) as novas_subscricoes
FROM push_subscriptions
WHERE status = 'active'
GROUP BY DATE(authorized_at)
ORDER BY data DESC LIMIT 7;

-- Taxa de entrega nos últimos 7 dias
SELECT 
  SUM(CASE WHEN delivered THEN 1 ELSE 0 END)::float / COUNT(*) * 100 as taxa_entrega_pct
FROM notification_log
WHERE sent_at > NOW() - INTERVAL '7 days';
```

## ✨ Recursos Futuros (Opcional)

- [ ] Agendamento automático via cron do Supabase
- [ ] Analytics: track se usuário clicou na notificação
- [ ] A/B testing: mensagens diferentes para grupos
- [ ] Integração com progresso: notificar só quem estudou menos essa semana

## 🎯 Status de Implementação

- ✅ Arquitetura de dados
- ✅ Frontend (UI e lógica)
- ✅ Backend (Edge Function)
- ⏳ **Configuração VAPID** (você está aqui)
- ⏳ **Testes em produção**
- ⏳ **Monitoramento**

---

**Tempo estimado para completar**: 30 minutos (incluindo testes)

**Contato para dúvidas**: Consultar `PUSH_NOTIFICATIONS_SETUP.md`
