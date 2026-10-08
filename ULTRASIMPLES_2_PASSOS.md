# ⚡ ULTRA SIMPLES - 2 PASSOS, 2 MINUTOS

## ✨ Você Tem TUDO Pronto

Sistema completo está no seu código. Faltam apenas 2 passos manuais.

---

## 📋 PASSO 1: ADICIONAR 3 SECRETS (90 segundos)

### Abrir Supabase Dashboard

1. Ir para: **https://app.supabase.com**
2. Selecionar projeto **LUMI**
3. Ir em: **Project Settings** (canto inferior esquerdo)

### Encontrar Secrets

4. Menu lateral → **Edge Functions**
5. Clicar em **Secrets**

### Adicionar Secrets (copie e cole!)

6. Clicar **+ New Secret**

**Adicionar Secret 1:**
```
Name: VAPID_PUBLIC_KEY
Value: BPrLqY1C6rE_zrPu3BNC34uvRhKdVw6iAzXvUjoT-p_VJrIXcSSN6qr4YCSOXK3YaC4GLnaYAGJRzSBR3vHvgG0
```
→ Clicar **Save**

**Adicionar Secret 2:**
```
Name: VAPID_PRIVATE_KEY
Value: QRdMnQgxEb7UGhYGOeiOrHDxq89dkNSMfz-JMOL5WPA
```
→ Clicar **Save**

**Adicionar Secret 3:**
```
Name: VAPID_SUBJECT
Value: mailto:notificacoes@lumiensina.app.br
```
→ Clicar **Save**

**Pronto!** Você verá:
```
✓ VAPID_PUBLIC_KEY
✓ VAPID_PRIVATE_KEY
✓ VAPID_SUBJECT
```

---

## 💻 PASSO 2: EXECUTAR 2 COMANDOS (30 segundos)

Abrir Terminal e copiar/colar:

### Comando 1: Deploy Migrations
```bash
cd C:\Users\Mateus\lumi
supabase db push
```

**Esperado:**
```
✓ 2 tables created
✓ 2 indexes created
✓ 1 function created
✓ 1 trigger created
```

### Comando 2: Deploy Edge Function
```bash
supabase functions deploy send-push-notifications
```

**Esperado:**
```
✓ Function created: send-push-notifications
```

---

## 🎉 PRONTO!

Sistema está 100% ativo!

---

## 🧪 TESTAR (Opcional)

```bash
npx ts-node scripts/send-test-notification.ts
```

Resultado:
```
✅ Notificação enviada com sucesso!
📤 Enviadas: 1
```

---

## 📱 TESTAR EM CELULAR

1. Abrir: https://lumiensina.app.br
2. Instalar como app (Menu → Install)
3. Ativar notificações
4. Fechar app
5. **Você receberá uma notificação!**

---

## ✅ CHECKLIST

```
[ ] Passo 1: 3 secrets adicionados no Supabase
[ ] Passo 2: supabase db push executado
[ ] Passo 2: supabase functions deploy executado
[ ] (Opcional) Teste com send-test-notification.ts
[ ] (Opcional) Teste em celular
```

---

**É só isso! Sistema pronto para seus 100k+ usuários!** 🚀
