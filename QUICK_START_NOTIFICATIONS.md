# ⚡ QUICK START - Push Notifications LUMI

## 3 Passos (5 minutos)

### PASSO 1: Obter seu Access Token (2 min)

1. Abrir: https://app.supabase.com
2. Clicar na sua foto/avatar (canto superior direito)
3. **Account Settings** → **Access Tokens**
4. Clicar em **Generate New Token**
5. Nome: `lumi-notifications`
6. Expiração: 24 horas (é só pra setup)
7. Clicar em **Generate**
8. **COPIAR O TOKEN** (clicar no ícone de cópia)

**Resultado:** Você tem um token como:
```
sbp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

### PASSO 2: Executar Script de Setup (2 min)

Abrir Terminal (Windows CMD ou PowerShell) e executar:

```bash
cd C:\Users\Mateus\lumi

# 1. Definir token (cole o token que copiou acima)
set SUPABASE_ACCESS_TOKEN=sbp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# 2. Executar script
bash scripts/setup-secrets-auto.sh

# 3. Fazer deploy
supabase db push
supabase functions deploy send-push-notifications
```

**Resultado esperado:**
```
✅ Secrets configurados!
✅ Migrations deployadas
✅ Edge Function deployada
```

---

### PASSO 3: Testar (1 min)

```bash
npx ts-node scripts/send-test-notification.ts
```

**Resultado:**
```
✅ Notificação enviada com sucesso!
📤 Enviadas: 1
```

---

## ✨ É Isso!

Seu sistema de notificações está 100% funcional! 🎉

---

## Se der erro...

### "Token inválido"
→ Colar token exatamente como aparece (não esquecer `sbp_`)

### "Permission denied"
→ Verificar se token tem permissão de "create"

### "Function not found"
→ Verificar se `supabase functions deploy` completou sem erros

---

## 🎯 Próximo: Testar em Produção

```bash
# 1. Instalar em celular
# Abrir: https://lumiensina.app.br
# Menu → Instalar LUMI

# 2. Ativar notificações
# Aguardar popup "Quer receber lembretes?"
# Clicar "Ativar lembretes"

# 3. Enviar teste
npx ts-node scripts/send-test-notification.ts

# 4. Fechar app e aguardar notificação
```

---

**Pronto! Sistema 100% ativo em produção! 🚀**
