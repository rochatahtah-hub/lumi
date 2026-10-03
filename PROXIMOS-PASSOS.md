# 🚀 LUMI — Próximos Passos (AGORA!)

Você tem o LUMI preparado com deploy automático. Agora precisa fazer **3 coisas simples**:

---

## 1️⃣ PUSH PARA GITHUB

Se der erro de permissão, use **Personal Access Token**:

### Gerar Token no GitHub

1. Acesse: https://github.com/settings/tokens/new
2. Nome: `LUMI Deploy Token`
3. Marque: `repo` (todas as caixas)
4. Marque: `workflow` (para GitHub Actions)
5. Clique: **Generate token**
6. **Copie o token** (só aparece uma vez!)

### Fazer Push com Token

```bash
# Abrir PowerShell como Admin
cd C:\Users\Mateus\lumi

# Configurar Git para usar token
git config --global credential.helper wincred

# Fazer push (será pedido o token)
git push origin master

# Quando pedir password, colar o token
```

**Ou fazer manualmente via HTTPS:**

```bash
# Clonar com token
git clone https://TOKEN@github.com/rochatahtah-hub/lumi.git
# Trocar TOKEN pelo token gerado
```

---

## 2️⃣ CONFIGURAR GITHUB SECRETS

**Local:** https://github.com/rochatahtah-hub/lumi/settings/secrets/actions

### Encontrar Credenciais Hostinger

1. Acesse: https://hpanel.hostinger.com/
2. Selecione seu plano LUMI
3. Vá para: **Arquivos** → **Gerenciador de Arquivos**
4. No topo, procure: **FTP/SSH Accounts** ou **Contas de FTP/SSH**
5. Clique em seu usuário
6. Copie:
   - **Server** (ex: `ftp.seu-site.com`)
   - **Username** (ex: `seu_usuario`)
   - **Password** (ex: sua senha)

### Encontrar Credenciais Supabase

1. Acesse: https://app.supabase.com
2. Clique no projeto LUMI
3. Vá para: **Settings** → **API**
4. Copie:
   - **Project URL** (ex: `https://khmozcolgdpkvlgctqgk.supabase.co`)
   - **anon public** (chave pública)

### Adicionar 7 Secrets

No GitHub (https://github.com/rochatahtah-hub/lumi/settings/secrets/actions):

Clique **"New repository secret"** e adicione cada um:

| # | Nome | Valor |
|---|------|-------|
| 1 | `HOSTINGER_SERVER` | `ftp.seu-site.com` |
| 2 | `HOSTINGER_USERNAME` | `seu_usuario` |
| 3 | `HOSTINGER_PASSWORD` | `sua_senha_ftp` |
| 4 | `HOSTINGER_DEPLOY_PATH` | `/public_html` |
| 5 | `HOSTINGER_DOMAIN` | `lumiensina.app.br` |
| 6 | `VITE_SUPABASE_URL` | `https://khmozcolgdpkvlgctqgk.supabase.co` |
| 7 | `VITE_SUPABASE_ANON_KEY` | `sb_publishable_...` |

---

## 3️⃣ TESTAR DEPLOYMENT

### Via Manual (mais fácil para testar)

1. Acesse: https://github.com/rochatahtah-hub/lumi/actions
2. Clique: **"Build e Deploy LUMI → Hostinger"**
3. Clique: **"Run workflow"**
4. Clique: **"Run workflow"** novamente
5. Aguarde 3-5 minutos
6. Veja os logs

### Resultado Esperado

✅ Todos os passos com ✓ verde  
✅ Mensagem: "Deploy bem-sucedido!"  
✅ LUMI atualizado em https://lumiensina.app.br

### Se der erro

1. Clique no workflow que falhou
2. Role para baixo
3. Procure pela **mensagem de erro**
4. Verificar:
   - ✓ Secrets adicionados corretamente?
   - ✓ Credenciais Hostinger corretas?
   - ✓ Chaves Supabase corretas?

---

## ✅ Checklist Rápido

- [ ] Token GitHub gerado
- [ ] Git push feito
- [ ] Workflow aparece em https://github.com/rochatahtah-hub/lumi/actions
- [ ] 7 Secrets adicionados
- [ ] Teste manual do workflow
- [ ] LUMI abre em https://lumiensina.app.br
- [ ] Dados do Supabase carregam
- [ ] Login funciona

---

## 🎉 Quando Tudo Funcionar

**Daqui em diante, para atualizar o LUMI:**

```bash
# 1. Fazer alteração
nano src/pages/Dashboard.tsx

# 2. Salvar e commit
git add src/pages/Dashboard.tsx
git commit -m "fix: corrigir bug"

# 3. Push
git push origin master

# 4. Pronto! GitHub faz tudo automaticamente 🚀
```

Verifique em: https://github.com/rochatahtah-hub/lumi/actions

---

## 📞 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| Workflow não aparece | Aguarde 1 min após push |
| "Permission denied" SFTP | Verificar credenciais Hostinger |
| "Build failed" | Testar local: `npm run build` |
| LUMI não atualiza | Aguardar 2 min + Ctrl+Shift+Delete (limpar cache) |
| Supabase não conecta | Verificar Secrets VITE_SUPABASE_* |

---

**Pronto? Bora começar! 🚀**

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
