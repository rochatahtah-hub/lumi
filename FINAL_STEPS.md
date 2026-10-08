# ✅ PUSH NOTIFICATIONS - FINAL STEPS

## 🎉 O Que Já Foi Feito

```
✅ Frontend
  ├─ NotificationRequest.tsx (solicita permissão)
  ├─ NotificationSettings.tsx (painel de config)
  └─ pushNotifications.ts (lib completa)

✅ Backend
  ├─ Schema SQL (2 tabelas)
  ├─ Edge Function pronta
  └─ Service Worker customizado

✅ Configuração
  ├─ .env.local com VITE_VAPID_PUBLIC_KEY ✓
  ├─ VAPID keys geradas ✓
  └─ Build testado ✓

✅ Deploy
  └─ Frontend deployado em lumiensina.app.br ✓

⏳ Falta (MANUAL):
  1. Configurar Supabase Secrets
  2. Deploy migrations
  3. Deploy Edge Function
```

---

## 🚀 PASSO 1: Configurar Supabase Secrets

### O que você precisa fazer:

1. Abrir: https://app.supabase.com
2. Selecionar projeto **LUMI**
3. Ir em: **Project Settings** → **Edge Functions** → **Secrets**
4. Clicar em **+ New Secret**
5. Adicionar **3 secrets** conforme abaixo:

### Secret 1:
```
Name: VAPID_PUBLIC_KEY
Value: BPrLqY1C6rE_zrPu3BNC34uvRhKdVw6iAzXvUjoT-p_VJrIXcSSN6qr4YCSOXK3YaC4GLnaYAGJRzSBR3vHvgG0
```

### Secret 2:
```
Name: VAPID_PRIVATE_KEY
Value: QRdMnQgxEb7UGhYGOeiOrHDxq89dkNSMfz-JMOL5WPA
```

### Secret 3:
```
Name: VAPID_SUBJECT
Value: mailto:notificacoes@lumiensina.app.br
```

**Resultado esperado:**
```
✓ 3 secrets criados
✓ Status: All secrets created successfully
```

---

## 🚀 PASSO 2: Deploy das Migrations

### Abrir Terminal e executar:

```bash
cd C:\Users\Mateus\lumi
supabase db push
```

**Resultado esperado:**
```
✓ 2 tables created: push_subscriptions, notification_log
✓ 2 indexes created
✓ 1 function created: update_push_subscriptions_updated_at
✓ 1 trigger created: update_push_subscriptions_timestamp
```

### Verificar no Supabase:
1. Ir em **Database** → **Tables**
2. Deverá ver:
   - `push_subscriptions` ✓
   - `notification_log` ✓

---

## 🚀 PASSO 3: Deploy da Edge Function

### Abrir Terminal e executar:

```bash
cd C:\Users\Mateus\lumi
supabase functions deploy send-push-notifications
```

**Resultado esperado:**
```
✓ Function created: send-push-notifications
✓ URL: https://khmozcolgdpkvlgctqgk.supabase.co/functions/v1/send-push-notifications
```

### Verificar:
```bash
supabase functions list
```

Deverá listar:
```
send-push-notifications (active)
```

---

## 🧪 PASSO 4: Testar Tudo (6 Testes)

### ✅ Teste 1: Build Local
```bash
npm run build
```
Esperado: `✓ built in 1.15s`

### ✅ Teste 2: Dev Server
```bash
npm run dev
```
Abrir: http://localhost:5173

### ✅ Teste 3: Instalar PWA
1. Abrir no Chrome
2. Menu → **Instalar LUMI**
3. Confirmar instalação

### ✅ Teste 4: Ativar Notificações
1. Abrir PWA instalado
2. Aguardar 2 segundos
3. Clicar **"Ativar lembretes"**
4. Escolher horário (ex: 14:30)
5. Permitir notificações no navegador

### ✅ Teste 5: Enviar Teste
```bash
npx ts-node scripts/send-test-notification.ts
```

Resultado esperado:
```
✅ Notificação enviada com sucesso!
📤 Enviadas: 1
📊 Total de subscriptions: 1
```

**No celular:**
- Feche completamente o PWA
- Você deverá ver a notificação na barra
- Toque nela → abre LUMI em `/estudos`

### ✅ Teste 6: Verificar Histórico
No Supabase → SQL Editor, executar:
```sql
SELECT * FROM notification_log ORDER BY sent_at DESC LIMIT 5;
```

Deverá retornar a notificação de teste com `delivered = true`

---

## 📊 Checklist Visual

```
┌─────────────────────────────────────────┐
│    PUSH NOTIFICATIONS LUMI - CHECKLIST   │
└─────────────────────────────────────────┘

Frontend
  ✅ NotificationRequest.tsx
  ✅ NotificationSettings.tsx
  ✅ pushNotifications.ts
  ✅ Integrado no App.tsx
  ✅ Service Worker
  ✅ .env.local configurado

Backend
  ⏳ Supabase Secrets (manual)
  ⏳ Migrations (manual)
  ⏳ Edge Function (manual)

Testing
  ⏳ Teste 1: Build
  ⏳ Teste 2: Dev Server
  ⏳ Teste 3: PWA Install
  ⏳ Teste 4: Ativar notificações
  ⏳ Teste 5: Enviar teste
  ⏳ Teste 6: Verificar histórico

Production
  ✅ Frontend em produção
  ⏳ Notificações ativas
```

---

## ⏱️ Tempo Estimado

- Configurar Secrets: **2 minutos**
- Deploy migrations: **3 minutos**
- Deploy Edge Function: **2 minutos**
- Testes: **10 minutos**

**Total: ~17 minutos**

---

## 🆘 Se Algo Der Errado

### "Erro ao configurar secrets"
→ Verificar se copió exatamente as chaves  
→ Clicar em "Save" após cada secret

### "Erro ao fazer push de migrations"
→ Verificar se `supabase db push` está conectado  
→ Usar: `supabase link` para reconectar

### "Edge Function retorna erro"
→ Verificar se 3 secrets estão criados  
→ Usar: `supabase functions describe send-push-notifications`

### "Notificação não chega no celular"
→ Verificar se PWA está fechado (não aberto em background)  
→ Testar script `send-test-notification.ts` novamente  
→ Verificar logs da Edge Function

---

## 📞 Referências Rápidas

| Comando | O que faz |
|---------|-----------|
| `supabase db push` | Deploy tabelas e functions |
| `supabase functions deploy send-push-notifications` | Deploy Edge Function |
| `supabase functions list` | Listar functions |
| `npx ts-node scripts/send-test-notification.ts` | Enviar notificação teste |
| `npm run build` | Build frontend |
| `npm run dev` | Dev server local |

---

## 🎯 Seu Progresso

```
[ ] 1. Configurar Supabase Secrets (5 min)
[ ] 2. Deploy migrations (3 min)
[ ] 3. Deploy Edge Function (2 min)
[ ] 4. Testar em produção (10 min)
```

**Pronto? Começar pelos Supabase Secrets! 🚀**
