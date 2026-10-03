# 🚀 LUMI v3.1 — Deploy Automático na Hostinger via GitHub

**Objetivo:** Atualizar o LUMI automaticamente quando você faz push no GitHub — **sem precisar gerar ou enviar ZIPs manualmente**.

---

## 📋 Arquitetura

```
Seu Computador
       ↓
  (git push)
       ↓
   GitHub
       ↓
GitHub Actions
       ↓
  (build + npm run build)
       ↓
  (SFTP deploy)
       ↓
  Hostinger
       ↓
   lumiensina.app.br
```

---

## ⚙️ Pré-requisitos

- ✅ Projeto LUMI em GitHub: https://github.com/rochatahtah-hub/lumi
- ✅ Plano Hostinger com **SFTP** habilitado (Business ou superior)
- ✅ Acesso às credenciais SFTP/SSH da Hostinger
- ✅ Domínio: `lumiensina.app.br` (já configurado)

---

## 🔑 Passo 1: Configurar Secrets no GitHub

Os "Secrets" são variáveis cifradas que o GitHub Actions usa para fazer deploy sem expor credenciais.

### Como adicionar:

1. Acesse: https://github.com/rochatahtah-hub/lumi/settings/secrets/actions
2. Clique em **"New repository secret"**
3. Adicione cada um dos Secrets abaixo:

### Secrets necessários:

| Nome | Valor | Exemplo |
|------|-------|---------|
| `HOSTINGER_SERVER` | Host SFTP da Hostinger | `ftp.seu-dominio.com` ou IP |
| `HOSTINGER_USERNAME` | Usuário SFTP | `seu_usuario` |
| `HOSTINGER_PASSWORD` | Senha SFTP | `sua_senha_aqui` |
| `HOSTINGER_DEPLOY_PATH` | Caminho remoto | `/public_html` |
| `HOSTINGER_DOMAIN` | Domínio HTTPS | `lumiensina.app.br` |
| `VITE_SUPABASE_URL` | URL do Supabase | `https://khmozcolgdpkvlgctqgk.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Chave pública Supabase | `sb_publishable_...` |

### Como encontrar credenciais Hostinger:

1. Acesse painel Hostinger: https://hpanel.hostinger.com/
2. Selecione seu plano/domínio
3. Vá para **Arquivos** → **Gerenciador de Arquivos**
4. Clique em **Contas de FTP/SSH** ou **SFTP Details**
5. Copie:
   - **Host/Server**
   - **Username** (usuário FTP)
   - **Password** (senha FTP)
   - **Root Path** (geralmente `/public_html`)

---

## 📦 Passo 2: Preparar o Repositório

Certifique-se de que estes arquivos estão no GitHub:

- ✅ `.github/workflows/deploy.yml` (workflow criado)
- ✅ `.htaccess` (configuração Apache para SPA)
- ✅ `.env.production` (variáveis de produção)
- ✅ `package.json` com script `build`
- ✅ `vite.config.ts` com configuração correta

### Fazer commit e push:

```bash
cd ~/lumi
git add .github/workflows/deploy.yml .htaccess .env.production
git commit -m "feat: adicionar deploy automático na Hostinger via GitHub Actions"
git push origin main
```

---

## 🧪 Passo 3: Testar o Deploy Automático

### Opção A: Ativar manualmente (recomendado para teste)

1. Acesse: https://github.com/rochatahtah-hub/lumi/actions
2. Selecione o workflow: **"Build e Deploy LUMI → Hostinger"**
3. Clique em **"Run workflow"** → **"Run workflow"**
4. Aguarde completar (2-5 minutos)

### Opção B: Fazer push para ativar automaticamente

```bash
# Fazer uma pequena alteração
echo "# Deploy automático teste" >> README.md

# Commit e push
git add README.md
git commit -m "test: testar deploy automático"
git push origin main
```

### Monitorar progresso:

1. Acesse: https://github.com/rochatahtah-hub/lumi/actions
2. Clique no workflow em andamento
3. Veja os logs em tempo real
4. Aguarde o status ✅ (sucesso) ou ❌ (erro)

---

## ✅ Verificar se o Deploy Funcionou

1. **Aguarde 1-2 minutos** (propagação de arquivos)
2. Acesse: https://lumiensina.app.br
3. Pressione **Ctrl+F5** (limpar cache)
4. Verifique:
   - ✅ Página carrega
   - ✅ Logo aparece
   - ✅ Pode fazer login
   - ✅ Pode acessar materias (`/materias`)
   - ✅ Pode responder questões

### Se der erro:

1. Volte ao GitHub Actions (aba Actions)
2. Clique no workflow que falhou
3. Leia os logs para ver qual foi o erro
4. Verifique os Secrets (talvez credenciais erradas)
5. Corrija e tente novamente

---

## 📝 Fluxo de Atualização Normal

Daqui em diante, **este é o fluxo para atualizar o LUMI**:

### 1. Fazer alteração no código

```bash
# Exemplo: corrigir bug, adicionar aula, etc
nano src/pages/Dashboard.tsx
# ... fazer alteração ...
```

### 2. Commit local

```bash
git add src/pages/Dashboard.tsx
git commit -m "fix: corrigir bug no dashboard"
```

### 3. Push para GitHub

```bash
git push origin main
```

### 4. Aguardar deploy automático

- GitHub Actions vai fazer build automaticamente
- Deploy para Hostinger via SFTP
- Arquivos na Hostinger são atualizados
- LUMI recebe a versão nova

### 5. Verificar em produção

Acesse https://lumiensina.app.br e veja a alteração ao vivo!

---

## 🔄 Atualização de Variáveis de Ambiente

Se precisar mudar variáveis (ex: chave Supabase nova):

### 1. Atualizar Secrets no GitHub

- Acesse: https://github.com/rochatahtah-hub/lumi/settings/secrets/actions
- Clique na variável (ex: `VITE_SUPABASE_URL`)
- **Update** → preencha o novo valor

### 2. Fazer commit vazio (para ativar rebuild)

```bash
git commit --allow-empty -m "ci: rebuild com variáveis atualizadas"
git push origin main
```

Ou simplesmente fazer qualquer alteração e push.

---

## 🛡️ Segurança

### ✅ Fazer

- ✅ Armazenar credenciais **APENAS em GitHub Secrets**
- ✅ Usar Secrets para VITE_SUPABASE_ANON_KEY
- ✅ Nunca fazer commit de `.env` com valores reais
- ✅ Revisar código antes de merge

### ❌ Não fazer

- ❌ Colocar senhas em comentários no código
- ❌ Fazer push de `.env.local` com valores reais
- ❌ Compartilhar credenciais Hostinger por email
- ❌ Deixar credenciais no histórico do Git

---

## 🚨 Troubleshooting

### ❌ "Permission denied" ou erro de SFTP

**Causa:** Credenciais SFTP erradas  
**Solução:**

1. Verifique usuário e senha Hostinger
2. Teste conexão SFTP manualmente (usando FileZilla)
3. Atualize Secrets no GitHub

### ❌ "Build failed"

**Causa:** Erro no build (código quebrado)  
**Solução:**

1. Verifique logs do GitHub Actions
2. Teste localmente: `npm run build`
3. Corrija o erro
4. Faça push novamente

### ❌ "Arquivo não foi atualizado no servidor"

**Causa:** Cache do browser  
**Solução:**

1. Pressione **Ctrl+Shift+Delete** (limpar cache completo)
2. Ou use **Ctrl+F5** (hard refresh)
3. Aguarde 2 minutos (propagação)

### ❌ "LUMI abre mas não carrega dados do Supabase"

**Causa:** Variáveis de ambiente não carregadas  
**Solução:**

1. Verifique se `.env.production` foi copiado
2. Verifique Secrets no GitHub
3. Faça trigger manual do workflow: https://github.com/rochatahtah-hub/lumi/actions

---

## 📊 Monitoramento

### Verificar histórico de deploys:

1. Acesse: https://github.com/rochatahtah-hub/lumi/actions
2. Veja lista de todos os workflows
3. Clique em cada um para ver detalhes

### Logs do workflow:

- **Build started** → npm install + npm run build
- **Deploy via SFTP** → arquivos copiados
- **Verification** → verificação de sucesso

---

## 🎯 Checklist de Configuração

- [ ] GitHub Secrets adicionados (HOSTINGER_SERVER, USERNAME, PASSWORD, etc)
- [ ] `.github/workflows/deploy.yml` commitado
- [ ] `.htaccess` commitado
- [ ] `.env.production` commitado
- [ ] Push para GitHub feito
- [ ] Workflow testado manualmente
- [ ] Deploy bem-sucedido verificado
- [ ] LUMI funciona em https://lumiensina.app.br
- [ ] Dados do Supabase carregam
- [ ] Login funciona

---

## 📞 Problemas Comuns

### O workflow não aparece na aba Actions

**Solução:** GitHub Actions é ativado automaticamente. Se não aparecer:
1. Verifique que `.github/workflows/deploy.yml` foi commitado
2. Aguarde 1 minuto
3. Recarregue a página

### Workflow fica "pending" por muito tempo

**Solução:**
1. GitHub Actions pode estar com fila
2. Aguarde 5-10 minutos
3. Ou verifique se há muitos workflows rodan simultaneamente

### SFTP deploy falha mas build passou

**Causa:** Credenciais SFTP erradas  
**Solução:**
1. Teste SFTP com FileZilla: `ftp.seu-dominio.com`
2. Verifique caminho remoto (geralmente `/public_html`)
3. Atualize Secrets

---

## 🎓 Resumo Final

**Antes (manual):**
```
Alterar código
  ↓
Fazer build
  ↓
Fazer ZIP
  ↓
Upload ZIP
  ↓
Extrair
  ↓
Atualizar
```

**Agora (automático):**
```
Alterar código
  ↓
Git push
  ↓
GitHub Actions (automático!)
  ↓
Deploy automático
  ↓
LUMI atualizado
```

---

## 🚀 Próximas Atualizações

Para atualizar o LUMI no futuro:

1. **Desenvolvimento local**
   ```bash
   npm run dev
   # Testar alterações
   ```

2. **Build local (opcional, para testar)**
   ```bash
   npm run build
   npm run preview
   ```

3. **Push para GitHub**
   ```bash
   git add .
   git commit -m "descrição da alteração"
   git push origin main
   ```

4. **Aguardar deploy automático**
   - GitHub Actions faz tudo
   - Verifique em https://lumiensina.app.br

---

**✅ LUMI está pronto para atualização contínua!**

Qualquer dúvida, verifique os logs do GitHub Actions ou teste a conexão SFTP manualmente.

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
