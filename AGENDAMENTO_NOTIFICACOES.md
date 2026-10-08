# ⏰ Agendamento Automático de Notificações - LUMI

## Status Atual

✅ **Sistema de notificações funcionando**  
⏳ **Scheduling automático: CONFIGURÁVEL**

---

## Como Funciona

### 1️⃣ Edge Function `schedule-notifications`
- ✅ **Criada e pronta para deploy**
- Verifica hora atual (São Paulo)
- Busca subscriptions com horário que coincida
- Envia notificações com mensagens variadas (8 opções)
- Registra logs de sucesso/falha

---

## 3 Opções para Ativar Agendamento

### Opção 1: Cron Job Externo (⭐ Recomendado)

**Usar serviço gratuito como:**
- **EasyCron** (easycron.com) - gratuito
- **cron-job.org** - gratuito
- **GitHub Actions** - gratuito

**Configurar:**
```bash
# Acessar https://easycron.com
# URL to call: https://khmozcolgdpkvlgctqgk.supabase.co/functions/v1/schedule-notifications
# Schedule: Hourly (a cada hora)
# Method: POST
```

**Resultado:** Notificações enviadas a cada hora para usuários cujo horário coincida!

---

### Opção 2: PgCron (Supabase Extension)

**Ativar no Supabase:**
1. Ir para: Project Settings → Database → Extensions
2. Procurar por `pg_cron`
3. Habilitar a extensão

**Criar trigger SQL:**
```sql
-- Executar a cada hora
SELECT cron.schedule('send-notifications-hourly', '0 * * * *', $$
  SELECT net.http_post(
    url := 'https://khmozcolgdpkvlgctqgk.supabase.co/functions/v1/schedule-notifications',
    headers := jsonb_build_object('Content-Type', 'application/json'),
    body := '{}'::jsonb
  ) as request_id
$$);
```

---

### Opção 3: GitHub Actions (Gratuito)

**Criar `.github/workflows/notify-schedule.yml`:**

```yaml
name: Schedule Notifications

on:
  schedule:
    - cron: '0 * * * *'  # A cada hora

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger notifications
        run: |
          curl -X POST \
            "https://khmozcolgdpkvlgctqgk.supabase.co/functions/v1/schedule-notifications" \
            -H "Content-Type: application/json" \
            -H "Authorization: Bearer ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}" \
            -d '{}'
```

---

## Resultado Final

```
Hora: 14:00 (ou qualquer hora que o usuário configurou)
↓
Edge Function `schedule-notifications` é acionada
↓
Busca subscriptions com preferred_hour = 14
↓
Envia notificação com mensagem aleatória das 8 opções
↓
Atualiza last_notification_at no banco
↓
Registra em notification_log
```

---

## Teste Rápido

```bash
# Chamar a função manualmente (sem esperar a hora):
curl -X POST \
  "https://khmozcolgdpkvlgctqgk.supabase.co/functions/v1/schedule-notifications" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sb_publishable_WVYBWyB9pYKbqxnqY2cATQ_DeUIyLT8" \
  -d '{}'
```

---

## Próximo Passo (Agora)

### ✅ RECOMENDADO: Usar EasyCron (5 minutos)

1. Acessar: https://easycron.com
2. Sign up (gratuito)
3. Create Cron Job
4. Preencher:
   - **URL:** `https://khmozcolgdpkvlgctqgk.supabase.co/functions/v1/schedule-notifications`
   - **Method:** POST
   - **Cron Expression:** `0 * * * *` (a cada hora)
5. Save

**Pronto!** Notificações enviadas a cada hora! 🎉

---

## 📊 Fluxo Completo

```
User selects time: 14:00
↓
Stores in push_subscriptions.preferred_hour = 14
↓
Cron job runs every hour
↓
schedule-notifications checks: preferred_hour == current_hour
↓
Match found → Send notification
↓
User receives push even if app is closed
↓
Click opens LUMI at /estudos
```

---

## Status

✅ Frontend: Completo  
✅ Backend: Completo  
✅ Scheduling Function: Pronta para deploy  
⏳ Cron Activation: Você escolhe (EasyCron recomendado)

**Total:** 2-3 minutos para ativar!
