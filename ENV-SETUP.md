# 🔐 Setup Environment Variables — LUMI v3.0

**Data:** 01-OUT-2026  
**Objetivo:** Configurar variáveis locais e de produção  
**Tempo:** 5 min  

---

## 📋 Quick Start

### Local (Desenvolvimento)

```bash
# 1. Copiar template
cp .env.example .env.local

# 2. Abrir arquivo
nano .env.local
# ou
code .env.local

# 3. Preencher com seus valores (ver abaixo)

# 4. Salvar (Ctrl+S ou Ctrl+O)
```

### Produção (Hostinger)

```bash
# 1. SSH no servidor
ssh usuario@89.117.7.178

# 2. Navegar
cd /var/www/lumi

# 3. Criar .env
nano .env

# 4. Preencher APENAS com valores de produção
# (NUNCA use dev keys em produção)
```

---

## 🔑 Como Obter Cada Variável

### **VITE_SUPABASE_URL**

```
1. Abrir: https://app.supabase.com
2. Projeto → Settings → API
3. Copiar: Project URL
4. Colar em .env.local
```

**Exemplo:** `https://xyzabc.supabase.co`

---

### **VITE_SUPABASE_ANON_KEY**

```
1. Supabase → Settings → API
2. Copiar: anon (public key)
3. Colar em .env.local
```

**Exemplo:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

**⚠️ IMPORTANTE:**
- Esta chave é PÚBLICA
- Seguro exposar no código
- Usar APENAS no frontend (VITE_)

---

### **SUPABASE_SERVICE_ROLE_KEY**

```
1. Supabase → Settings → API
2. Copiar: service_role (secret key)
3. APENAS em .env (não fazer commit!)
```

**Exemplo:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

**🔴 CRÍTICO:**
- Esta chave é PRIVADA
- NUNCA exposar publicamente
- NUNCA fazer commit
- Usar APENAS server-side

---

### **VITE_SENTRY_DSN** (Optional)

```
Se quiser error tracking em produção:

1. Criar conta: https://sentry.io
2. Novo projeto: JavaScript + React
3. Copiar: DSN (Data Source Name)
4. Colar em .env.local

Se não usar, deixar vazio ou comentado
```

**Exemplo:** `https://abc123@def456.ingest.sentry.io/789012`

---

## 📝 .env.local Completo (Exemplo)

```bash
# ===== LOCAL DEVELOPMENT =====

# Supabase
VITE_SUPABASE_URL=https://seu-projeto-xyz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Analytics
VITE_SENTRY_DSN=

# Environment
NODE_ENV=development

# Features
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_PERFORMANCE_MONITORING=true

# Dev Server
VITE_PORT=5173

# Logging
LOG_LEVEL=debug
```

---

## 🚀 .env Produção (Hostinger)

```bash
# ===== PRODUCTION =====

# Supabase (MESMAS CHAVES da conta)
VITE_SUPABASE_URL=https://seu-projeto-xyz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Analytics (INCLUIR em produção)
VITE_SENTRY_DSN=https://abc123@def456.ingest.sentry.io/789012

# Environment
NODE_ENV=production

# Features
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_PERFORMANCE_MONITORING=true

# Production URL
VITE_PUBLIC_URL=https://lumiensina.app.br

# Logging
LOG_LEVEL=warn
```

---

## ✅ Checklist de Setup

### Local (Você)

- [ ] Copiar .env.example → .env.local
- [ ] Obter VITE_SUPABASE_URL (Supabase)
- [ ] Obter VITE_SUPABASE_ANON_KEY (Supabase)
- [ ] Obter SUPABASE_SERVICE_ROLE_KEY (Supabase)
- [ ] Testar: `npm run dev`
- [ ] Verificar que não há erros de variáveis

### Produção (Hostinger)

- [ ] SSH no servidor
- [ ] Criar `.env` em `/var/www/lumi/.env`
- [ ] Preencher valores de produção
- [ ] Reiniciar app: `pm2 restart lumi`
- [ ] Verificar logs: `pm2 logs lumi`
- [ ] Testar: `https://lumiensina.app.br`

---

## 🔒 Segurança (CRÍTICO!)

### ✅ Fazer

```bash
# ✅ Adicionar .env em .gitignore (não commitar!)
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
echo ".env.production" >> .gitignore

# ✅ Commitar apenas .env.example
git add .env.example
git commit -m "docs: add env template"

# ✅ Usar variáveis de ambiente
export VITE_SUPABASE_URL="..."
npm run dev

# ✅ Em produção: usar secrets do Hostinger
# Hostinger → App → Environment Variables
```

### ❌ NÃO Fazer

```bash
# ❌ NUNCA fazer commit de .env
git add .env
git commit "bad: add secrets"  # NÃO FAZER!

# ❌ NUNCA usar chaves privadas no frontend
VITE_SUPABASE_SERVICE_ROLE_KEY=...  # NÃO!

# ❌ NUNCA colocar keys em código
const key = "eyJhbGc..."  // NÃO!

# ❌ NUNCA compartilhar keys em mensagens
"Minha chave é eyJhbGc..."  // NÃO!
```

---

## 🧪 Testar Setup

### Local

```bash
# 1. Verificar que arquivo existe
ls -la .env.local

# 2. Rodar app
npm run dev

# 3. Abrir browser
http://localhost:5173

# 4. Abrir Console (F12)
# Deve estar sem erros de variáveis
# Se ver erro: "undefined SUPABASE_URL"
#  → Variável não está sendo lida corretamente
```

### Produção

```bash
# Via SSH no Hostinger

# 1. Verificar arquivo
cat /var/www/lumi/.env

# 2. Verificar permissões
ls -la /var/www/lumi/.env
# Deve ser: -rw-r--r--

# 3. Reiniciar app
pm2 restart lumi

# 4. Ver logs
pm2 logs lumi | tail -20
# Deve estar sem erros de variáveis

# 5. Testar via browser
curl https://lumiensina.app.br
# Deve retornar HTTP 200
```

---

## 🚨 Troubleshooting

### "Cannot find VITE_SUPABASE_URL"

**Causa:** Variável não definida  
**Solução:**
```bash
# 1. Verificar que .env.local existe
ls -la .env.local

# 2. Verificar conteúdo
grep VITE_SUPABASE_URL .env.local

# 3. Se vazio, preencher novamente
nano .env.local

# 4. Reiniciar dev server
npm run dev
```

---

### "Supabase connection refused"

**Causa:** URL ou keys erradas  
**Solução:**
```bash
# 1. Verificar URL
grep VITE_SUPABASE_URL .env.local
# Deve ser: https://xxxxx.supabase.co

# 2. Verificar chave
grep VITE_SUPABASE_ANON_KEY .env.local
# Deve ser: eyJhbGc... (token JWT)

# 3. Se ainda não funciona:
# - Obter valores novamente no Supabase
# - Copiar exatamente (sem espaços extras)
# - Reiniciar dev server
```

---

### "Permission denied on .env"

**Causa:** Arquivo com permissões erradas  
**Solução:**
```bash
# No servidor (Hostinger)
chmod 600 /var/www/lumi/.env
# Agora: -rw------- (leitura/escrita apenas dono)

pm2 restart lumi
```

---

## 📚 Referências

- Supabase Docs: https://supabase.com/docs
- Vite Env: https://vitejs.dev/guide/env-and-mode.html
- Security Best Practices: https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html

---

## ✨ Resumo

```
LOCAL (npm run dev):
1. cp .env.example .env.local
2. Preencher 3 variáveis Supabase
3. npm run dev
4. Testar em http://localhost:5173

PRODUÇÃO (Hostinger):
1. SSH para servidor
2. Criar /var/www/lumi/.env
3. Preencher MESMAS variáveis
4. pm2 restart lumi
5. Testar em https://lumiensina.app.br
```

---

**Responsável:** Claude Haiku 4.5  
**Data:** 01-OUT-2026  
**Status:** ✅ Pronto para usar
