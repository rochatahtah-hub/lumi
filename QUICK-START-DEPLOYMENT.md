# ⚡ LUMI — Quick Start: Deploy Automático em 5 Minutos

**Para quem quer começar rapidinho, sem ler toda a documentação.**

---

## 🎯 O que você precisa fazer UMA VEZ:

### 1️⃣ Obter credenciais Hostinger

1. Acesse: https://hpanel.hostinger.com/
2. Vá para: **Arquivos** → **Gerenciador de Arquivos**
3. Clique: **Contas de FTP/SSH** (ou equivalente)
4. Anote:
   - **Server** (Host)
   - **Username**
   - **Password**
   - **Root Path** (geralmente `/public_html`)

### 2️⃣ Adicionar Secrets no GitHub

1. Acesse: https://github.com/rochatahtah-hub/lumi/settings/secrets/actions
2. Clique: **New repository secret**
3. Adicione esses Secrets (copie exatamente os nomes):

| Nome | Valor |
|------|-------|
| `HOSTINGER_SERVER` | Host/Server da Hostinger |
| `HOSTINGER_USERNAME` | Username FTP |
| `HOSTINGER_PASSWORD` | Password FTP |
| `HOSTINGER_DEPLOY_PATH` | `/public_html` |
| `HOSTINGER_DOMAIN` | `lumiensina.app.br` |
| `VITE_SUPABASE_URL` | URL do Supabase |
| `VITE_SUPABASE_ANON_KEY` | Chave pública Supabase |

### 3️⃣ Fazer push dos arquivos de configuração

```bash
cd ~/lumi
git add .github/workflows/deploy.yml .htaccess .env.production
git commit -m "feat: configurar deploy automático na Hostinger"
git push origin main
```

**Pronto! Configuração feita. ✅**

---

## 📝 Daqui em diante: Como atualizar

Sempre que precisar atualizar o LUMI:

### 1. Fazer alteração

```bash
# Editar arquivo, adicionar aula, corrigir bug, etc
nano src/pages/Lesson.tsx
```

### 2. Commit e push

```bash
git add .
git commit -m "descrição da alteração"
git push origin main
```

### 3. Pronto! ✨

GitHub Actions faz tudo:
- ✅ Build automático
- ✅ Deploy automático
- ✅ LUMI atualizado

Aguarde 2-5 minutos e verifique em: https://lumiensina.app.br

---

## 🔍 Monitorar deploy

Acesse: https://github.com/rochatahtah-hub/lumi/actions

Veja status em tempo real:
- 🟡 **Em andamento**
- ✅ **Sucesso** (verde)
- ❌ **Erro** (vermelho)

---

## ⚠️ Se der erro

1. Acesse: https://github.com/rochatahtah-hub/lumi/actions
2. Clique no workflow que falhou
3. Veja os logs (rode para baixo)
4. Procure pela mensagem de erro
5. Corrija e tente novamente

Erros comuns:
- **"Permission denied"** → Credenciais SFTP erradas
- **"Build failed"** → Código tem erro (teste localmente: `npm run build`)
- **"Connection timeout"** → Server Hostinger offline

---

## 🧪 Testar antes de usar

1. Faça uma alteração pequena (ex: comentário em um arquivo)
2. Commit e push
3. Verifique se aparece em https://lumiensina.app.br
4. Se funcionar, está tudo certo!

---

## 📚 Documentação completa

Para detalhes e troubleshooting avançado, veja: `HOSTINGER-AUTO-DEPLOY.md`

---

**✅ Pronto! LUMI com deploy automático!**

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
