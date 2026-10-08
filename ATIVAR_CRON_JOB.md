# 🚀 ATIVAR AGENDAMENTO - 3 PASSOS (5 MINUTOS)

## ✅ PASSO 1: Deploy Manual da Edge Function

Execute no terminal:

```bash
curl -X POST "https://khmozcolgdpkvlgctqgk.supabase.co/functions/v1/schedule-notifications" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sb_publishable_WVYBWyB9pYKbqxnqY2cATQ_DeUIyLT8" \
  -d '{"test": true}'
```

**Resultado esperado:**
```json
{
  "success": true,
  "message": "Nenhuma notificação a enviar neste horário",
  "scheduledTime": "HH:MM"
}
```

Se der erro 404, a função não foi deployada ainda. Faça passo 2.

---

## ⏳ PASSO 2: Ativar Cron Job (Escolha Uma Opção)

### OPÇÃO A: EasyCron (Recomendado - Gratuito)

1. **Acessar:** https://easycron.com
2. **Sign up** (gratuito)
3. **Click em "Create Cron Job"**
4. **Preencher:**
   ```
   URL: https://khmozcolgdpkvlgctqgk.supabase.co/functions/v1/schedule-notifications
   
   HTTP Method: POST
   
   HTTP Headers:
   Content-Type: application/json
   Authorization: Bearer sb_publishable_WVYBWyB9pYKbqxnqY2cATQ_DeUIyLT8
   
   Cron Expression: 0 * * * *
   (significa: a cada hora, minuto 0)
   ```

5. **Click "Create"**

**Pronto! ✅ Notificações acionadas a cada hora!**

---

### OPÇÃO B: GitHub Actions (Gratuito)

1. **No seu repo GitHub:**
2. **Criar pasta:** `.github/workflows/`
3. **Criar arquivo:** `schedule-notifications.yml`
4. **Copiar:**

```yaml
name: Schedule Push Notifications

on:
  schedule:
    - cron: '0 * * * *'  # A cada hora
  
  workflow_dispatch:  # Permite disparo manual

jobs:
  notify:
    runs-on: ubuntu-latest
    
    steps:
      - name: Trigger schedule-notifications
        run: |
          curl -X POST \
            "https://khmozcolgdpkvlgctqgk.supabase.co/functions/v1/schedule-notifications" \
            -H "Content-Type: application/json" \
            -H "Authorization: Bearer sb_publishable_WVYBWyB9pYKbqxnqY2cATQ_DeUIyLT8" \
            -d '{}'
```

5. **Commit e push**

**Pronto! ✅ GitHub Actions roda a cada hora!**

---

### OPÇÃO C: PgCron (Supabase Extension)

1. **Ir em:** Supabase Dashboard → Project Settings → Database → Extensions
2. **Procurar:** `pg_cron`
3. **Click em "Enable"**
4. **Ir para:** SQL Editor
5. **Executar:**

```sql
SELECT cron.schedule('push-notifications-hourly', '0 * * * *', $$
  SELECT net.http_post(
    url := 'https://khmozcolgdpkvlgctqgk.supabase.co/functions/v1/schedule-notifications',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer sb_publishable_WVYBWyB9pYKbqxnqY2cATQ_DeUIyLT8'
    ),
    body := '{}'::jsonb
  )
$$);
```

**Pronto! ✅ PgCron roda a cada hora!**

---

## ✅ PASSO 3: Verificar se Está Funcionando

### Teste Manual (Qualquer Hora):

```bash
curl -X POST "https://khmozcolgdpkvlgctqgk.supabase.co/functions/v1/schedule-notifications" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sb_publishable_WVYBWyB9pYKbqxnqY2cATQ_DeUIyLT8" \
  -d '{}'
```

### Resultado Esperado:

```json
{
  "success": true,
  "scheduledTime": "HH:MM",
  "subscriptionsMatched": 0,
  "sent": 0,
  "failed": 0,
  "messageUsed": "📚 Hora do LUMI!"
}
```

Se `subscriptionsMatched: 0` = normal (sem usuários cadastrados ainda)

---

## 🎯 Fluxo Após Ativar

```
⏰ Cada hora (minuto 0)
  ↓
Cron job dispara schedule-notifications
  ↓
Busca: preferred_hour == hora_atual
  ↓
Se houver match → Envia notificação
  ↓
Registra em notification_log
```

---

## 📊 Exemplo Real

Se usuário escolhe **14:00**:

```
14:00:00 → Cron dispara
  ↓
preferred_hour == 14? SIM ✅
  ↓
Envia notificação com mensagem aleatória
  ↓
User recebe push 🔔
```

---

## ✨ Recomendação

**Use OPÇÃO A (EasyCron):**
- ✅ Mais simples
- ✅ Sem código
- ✅ Totalmente gratuito
- ✅ Confiável

**Tempo total:** ~2 minutos

---

## 📝 Checklist Final

- [ ] Passo 1: Teste curl executado
- [ ] Passo 2: Cron job ativado (escolha uma opção)
- [ ] Passo 3: Verificar resposta OK
- [ ] Sistema pronto! ✅

**Após isso:** Notificações automáticas acionadas a cada hora!
