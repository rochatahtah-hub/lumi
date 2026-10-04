# 🚀 DEPLOYMENT PARA HOSTINGER — LUMI

## ⚠️ SITUAÇÃO ATUAL
- Código corrigido e commitado no GitHub (master branch)
- Build gerado localmente em `dist/`
- GitHub Actions NÃO faz upload automático para Hostinger (conectividade SFTP desabilitada)
- Site publicado em `lumiensina.app.br` ainda está desatualizado (versão velha)

## ✅ CORREÇÕES FEITAS
1. ✓ ExamPrepForm: input+datalist em vez de select (melhor event handling)
2. ✓ ExamSimulator: layout/spacing corrigido, alternativas não sobrepõem mais
3. ✓ Console logs removidos
4. ✓ attempt_number agora calcula real (não hardcoded em 1)

## 📋 COMO FAZER DEPLOY

### OPÇÃO 1: Git Pull via cPanel (RECOMENDADO - mais rápido)

Se você já tem Git configurado no cPanel da Hostinger:

1. **Acesse cPanel → Git Version Control**
2. **Clique em "Pull or Deploy"** para o repositório LUMI
3. **Selecione "pull"** e executa
4. **Pronto!** O site será atualizado com o código novo

**Tempo estimado:** <1 minuto

---

### OPÇÃO 2: Upload Manual de Arquivos (FTP/SFTP)

Se não tem Git no cPanel:

1. **Abra cPanel → File Manager**
2. **Navegue até** `/public_html` (ou pasta raiz do domínio)
3. **Faça backup** da pasta atual (renomeie para `public_html.backup`)
4. **Copie TODOS os arquivos de** `dist/` para `public_html`:
   - `dist/index.html` → `/public_html/index.html`
   - `dist/assets/*` → `/public_html/assets/`
   - `dist/manifest.webmanifest` → `/public_html/manifest.webmanifest`
   - `dist/sw.js` → `/public_html/sw.js`
   - Todos os demais arquivos

5. **Limpe o service worker cache** (abra o site e pressione F12 → Application → Service Workers → Unregister)
6. **Hard reload** no navegador: `Ctrl+Shift+R` (Windows) ou `Cmd+Shift+R` (Mac)
7. **Pronto!**

**Tempo estimado:** 5-10 minutos

---

### OPÇÃO 3: SFTP via Cliente (ssh2/FileZilla)

Se preferir usar SFTP:

1. **Credenciais Hostinger:**
   - Host: (verificar em cPanel → SSH Access)
   - Port: 22 ou 2222
   - Username: (seu usuário Hostinger)
   - Password: (sua senha Hostinger)

2. **Conecte via FileZilla ou outro cliente SFTP**
3. **Navegue até `/public_html`**
4. **Upload dos arquivos:**
   ```
   dist/ → public_html/
   ```

---

## 🔍 TESTANDO APÓS DEPLOY

Após fazer o deploy:

1. **Abra** https://lumiensina.app.br
2. **Pressione Ctrl+Shift+R** para hard reload (limpa cache)
3. **Vá para "Preparação para a Prova"**
4. **Verify:** Matéria agora deve ser um input com datalist (não select dropdown)
5. **Tente:** Digite "Port" ou "Português" e veja a autocomplete
6. **Teste completo:**
   - Selecione "Português"
   - Selecione "8º ano"
   - Digite "Figuras de linguagem" em Conteúdos
   - Clique "Começar Teste"
   - **DEVE** gerar questões reais (não genéricas)

---

## 💡 SE ALGO AINDA ESTIVER ERRADO

1. **Inspecionar console (F12):**
   ```javascript
   // Ver se há erros
   ```

2. **Verificar se service worker foi atualizado:**
   - F12 → Application → Service Workers
   - Deve ter atualizado

3. **Limpar cache completo:**
   - Abra DevTools (F12)
   - Application → Clear site data (marque tudo)
   - Reload página

4. **Se ainda não funcionar:**
   - Verificar se `dist/` foi corretamente copiado
   - Verificar se permissões de arquivo estão OK
   - Contatar Hostinger support

---

## 📝 RESUMO DE CORREÇÕES

| Problema | Status | Arquivo |
|----------|--------|---------|
| Select dropdown não persiste | ✅ FIXADO | ExamPrepForm.tsx |
| Alternativas sobrepõem | ✅ FIXADO | ExamSimulator.tsx |
| Console logs de debug | ✅ FIXADO | ExamPrep.tsx, ExamPrepService.ts |
| attempt_number hardcoded | ✅ FIXADO | learning-api.ts |
| Site desatualizado | ⏳ AGUARDANDO DEPLOY | — |

---

## ⏱️ PRÓXIMOS PASSOS

1. **Execute deploy via OPÇÃO 1 ou 2 acima**
2. **Hard reload no navegador**
3. **Teste ExamPrep flow completo**
4. **Se tiver erro, abra console (F12) e anote mensagem**
5. **Me avise do resultado**

---

**Commit:** 1385a24 (master branch)
**Data:** 2026-10-03
