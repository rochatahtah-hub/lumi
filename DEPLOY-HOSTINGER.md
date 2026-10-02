# 🚀 LUMI v3.0 — Deploy no Hostinger

**Arquivo:** `lumi-v3.0-deploy.zip` (2.4 MB)  
**Data:** 02-OUT-2026  
**Status:** Pronto para produção

---

## 📋 Pré-requisitos

✅ Plano Hostinger: **Business / Cloud / VPS**  
✅ Node.js 18+ habilitado no painel  
✅ Domínio: `lumiensina.app.br` (já linkado)

---

## 🔧 Passo-a-Passo de Deploy

### **1. Login no Painel Hostinger**
- URL: https://hostinger.com.br
- Acesso: seu email + senha
- Selecionar: projeto LUMI

### **2. Acessar File Manager**
- Menu lateral: **Arquivos** ou **File Manager**
- Navegar para: `/public_html/` ou `/var/www/html/`

### **3. Upload do ZIP**
- Clique: **Upload** (ou drag-and-drop)
- Selecionar: `lumi-v3.0-deploy.zip`
- Aguardar upload completo (2.4 MB)

### **4. Extrair ZIP**
- Botão direito no arquivo: **Extract** (ou **Decompress**)
- Local de extração: `/public_html/` (na raiz)
- Confirmar que criou pasta `dist/`, `node_modules/`, etc.

### **5. Configurar Build no Painel**
- Menu: **Node.js** ou **App Settings**
- Campo "Start command": 
  ```
  npm start
  ```
- Campo "Build command":
  ```
  npm ci --production
  ```
- Campo "Entry point":
  ```
  dist/index.html
  ```

### **6. Criar `.env` em Produção**
- File Manager: criar novo arquivo `.env`
- Conteúdo: **copiar exatamente de `.env.local`**
  ```
  VITE_SUPABASE_URL=https://khmozcolgdpkvlgctqgk.supabase.co
  VITE_SUPABASE_ANON_KEY=sb_publishable_WVYBWyB9pYKbqxnqY2cATQ_DeUIyLT8
  SUPABASE_SERVICE_ROLE_KEY=sb_secret_scB24fxxB42xMymcflxrdg_D1Him8AM
  NODE_ENV=production
  ```
- **Salvar** e fechar

### **7. Reiniciar Aplicação**
- Menu: **Node.js** → botão **Restart App**
- Aguardar: "App restarted successfully"

### **8. Validar em Produção**
- Abrir: https://lumiensina.app.br
- Esperar carregar (primeira vez demora ~10s)
- Logar na conta
- Ir para uma aula
- Responder 3 questões completamente

### **9. Verificar Supabase**
- Abrir: https://app.supabase.com
- Ir para: **Table Editor** → `question_attempts`
- Deve ter 3 linhas NOVAS (com timestamp de agora)
- Se sim ✅ → Deploy bem-sucedido!

---

## 🐛 Troubleshooting

### **"502 Bad Gateway" ou erro de conexão**
1. Verificar que `.env` está preenchido corretamente
2. Reiniciar app: **Node.js → Restart**
3. Aguardar 30 segundos
4. Recarregar browser (Ctrl+F5)

### **"Cannot find SUPABASE_URL"**
1. Verificar `.env` existe no root (`/public_html/.env`)
2. Verificar que variáveis não estão vazias
3. Salvar novamente
4. Restart app

### **"Build failed" no painel**
1. Deletar pasta `node_modules` (se existir)
2. Re-fazer upload do ZIP
3. Restart

### **Queries não são registradas no Supabase**
1. Verificar que `SUPABASE_SERVICE_ROLE_KEY` está correto
2. Verificar que tabela `question_attempts` existe
3. F12 (Console do browser) → procurar por erro "Supabase"

---

## 📊 Checklist Final

- [ ] ZIP upload completo no Hostinger
- [ ] ZIP extraído em `/public_html/`
- [ ] `.env` criado e preenchido
- [ ] Build command configurado
- [ ] Start command configurado
- [ ] App reiniciada
- [ ] https://lumiensina.app.br abre sem erro
- [ ] Login funciona
- [ ] Consegue responder questão
- [ ] Supabase mostra `question_attempts` nova

---

## 🎯 O Que Mudou em v3.0

✅ Learning System integrado no Quiz  
✅ 8 tabelas no Supabase (learning_paths, content_mastery, skill_mastery, etc)  
✅ Mastery tracking em tempo real  
✅ Achievements system  
✅ Diagnostic panel para professores  
✅ Build otimizado (dist/ minificado)  

---

## 📞 Suporte

Se der erro após deploy:
1. Verificar logs do painel Hostinger (Menu → Logs)
2. Verificar console do browser (F12)
3. Verificar que Supabase está online (https://status.supabase.com)

---

**Tempo estimado:** 10 minutos  
**Risco:** Baixo (rollback: deletar `/public_html/` e re-fazer upload da versão anterior)

🚀 **LUMI v3.0 — Pronta para transformar educação em produção!**

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
