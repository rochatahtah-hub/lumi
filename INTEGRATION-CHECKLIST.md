# ✅ INTEGRATION CHECKLIST — LUMI v3.0

**Data:** 02-OUT-2026  
**Status:** Pronto para Executar  
**Tempo Estimado:** 90 minutos  

---

## 📋 Seu Checklist (Você Faz Agora)

### ⏱️ Parte 1: Setup Local (15 min)

- [ ] **1.1** Abrir terminal em `~/lumi`
- [ ] **1.2** Executar: `bash setup-local.sh`
- [ ] **1.3** Preencher `.env.local` com variáveis Supabase
  - [ ] VITE_SUPABASE_URL
  - [ ] VITE_SUPABASE_ANON_KEY
  - [ ] SUPABASE_SERVICE_ROLE_KEY
- [ ] **1.4** Salvar arquivo (Ctrl+S)
- [ ] **1.5** Verificar que `npm install` completou
- [ ] **1.6** Verificar que `npm run build` passou

**Onde Obter Variáveis:**
```
Abrir: https://app.supabase.com
Projeto → Settings → API
Copiar valores para .env.local
```

---

### ⏱️ Parte 2: Rodar Schema SQL (2 min)

- [ ] **2.1** Abrir Supabase Console
  - [ ] URL: https://app.supabase.com
  - [ ] Selecionar projeto
- [ ] **2.2** Ir para: SQL Editor → New Query
- [ ] **2.3** Copiar conteúdo de: `supabase-schema-learning.sql`
- [ ] **2.4** Colar no SQL Editor
- [ ] **2.5** Clicar: **Run**
- [ ] **2.6** Verificar que 8 tabelas foram criadas
  - [ ] learning_paths
  - [ ] content_mastery
  - [ ] skill_mastery
  - [ ] review_queue
  - [ ] learning_diagnostics
  - [ ] recommendations
  - [ ] question_attempts
  - [ ] achievements

**Verificação:**
```
SELECT * FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename LIKE 'learning_%'
```

---

### ⏱️ Parte 3: Testar Localmente (45 min)

- [ ] **3.1** Executar: `npm run dev`
- [ ] **3.2** Aguardar: "Local: http://localhost:5173"
- [ ] **3.3** Abrir browser: http://localhost:5173
- [ ] **3.4** Logar na aplicação
- [ ] **3.5** Ir para uma aula qualquer
- [ ] **3.6** Responder 5 questões completamente
- [ ] **3.7** Voltar para home
- [ ] **3.8** Verificar em Console (F12) → nenhum erro red
- [ ] **3.9** Abrir Supabase → Table Editor
  - [ ] Verificar: `question_attempts` tem 5 linhas novas
  - [ ] Verificar: `content_mastery` foi atualizado
  - [ ] Verificar: `skill_mastery` foi atualizado
- [ ] **3.10** Parar dev server (Ctrl+C)

**Se erro de "undefined SUPABASE_URL":**
```
1. Verificar .env.local existe: ls -la .env.local
2. Verificar conteúdo: cat .env.local
3. Reiniciar dev server: npm run dev
```

---

### ⏱️ Parte 4: Rodar Testes (5 min)

- [ ] **4.1** Terminal: `npm run test:run`
- [ ] **4.2** Aguardar: "Test Files X passed"
- [ ] **4.3** Verificar: 35+ testes passaram (verde)
- [ ] **4.4** Se falhar, verificar output e corrigir

**Se teste falhar:**
```
npm run test -- --reporter=verbose
# Vê detalhe do erro
```

---

### ⏱️ Parte 5: Deploy (20 min)

- [ ] **5.1** Fazer commit local:
  ```bash
  git add -A
  git commit -m "feat: integração LUMI v3.0 com learning system"
  ```

- [ ] **5.2** SSH no Hostinger:
  ```bash
  ssh seu-usuario@89.117.7.178
  ```

- [ ] **5.3** Navegar:
  ```bash
  cd /var/www/lumi
  ```

- [ ] **5.4** Git pull:
  ```bash
  git pull origin main
  ```

- [ ] **5.5** Criar `.env`:
  ```bash
  nano .env
  # Copiar EXATAMENTE o conteúdo de .env.local
  # Salvar (Ctrl+O, ENTER, Ctrl+X)
  ```

- [ ] **5.6** Instalar/Atualizar:
  ```bash
  npm ci --production
  npm run build
  ```

- [ ] **5.7** Reiniciar:
  ```bash
  pm2 restart lumi || pm2 start npm --name lumi -- start
  ```

- [ ] **5.8** Verificar logs:
  ```bash
  pm2 logs lumi | tail -20
  # Procurar por erros (linhas vermelhas)
  ```

---

### ⏱️ Parte 6: Validar em Produção (15 min)

- [ ] **6.1** Abrir: https://lumiensina.app.br
- [ ] **6.2** Logar com sua conta
- [ ] **6.3** Ir para uma aula
- [ ] **6.4** Responder 3 questões completamente
- [ ] **6.5** Verificar no Supabase:
  - [ ] question_attempts tem 3 registros novos
  - [ ] content_mastery foi atualizado
  - [ ] skill_mastery foi atualizado
- [ ] **6.6** Abrir Console (F12) → sem erros vermelhos
- [ ] **6.7** Validar que mastery_percent aumentou

**Se não funcionar:**
```
SSH no servidor → pm2 logs lumi
Procurar por erro específico
Corrigir .env ou código
```

---

## 📊 Resumo do Que Fiz (Código)

### ✅ Integração no Quiz.tsx
- Adicionado import de `recordAttempt`
- Integrado na função `onDone`
- Registra cada tentativa em tempo real
- Com error handling (não quebra app se Supabase falhar)

### ✅ vitest.config.ts
- Setup completo para rodar testes
- jsdom environment
- Coverage reporting configurado
- Mocks de APIs do browser

### ✅ src/test/setup.ts
- Limpeza de DOM após testes
- Mocks de window.matchMedia
- Mocks de IntersectionObserver
- Mocks de ResizeObserver

### ✅ package.json
- Adicionado `@tanstack/react-query`
- Adicionado `vitest`
- Adicionado `@testing-library/react`
- Adicionado `jsdom`
- Adicionados scripts: `test`, `test:run`, `test:coverage`

### ✅ setup-local.sh
- Script de setup automático
- Instala dependências
- Compila TypeScript
- Roda testes
- Guia interativo

### ✅ INTEGRATION-CHECKLIST.md
- Este arquivo
- 6 partes claras
- 40+ checkboxes
- Tempo estimado por cada parte

---

## 🎯 Timeline Realista

```
Agora (seu tempo):        90 min
  ├─ Setup local          15 min
  ├─ Schema SQL           2 min
  ├─ Testar local         45 min
  ├─ Rodar testes         5 min
  ├─ Deploy               20 min
  └─ Validar produção     15 min

RESULTADO: LUMI VIVA! 🎉
```

---

## 🚨 Bloqueadores Comuns

### "Cannot find SUPABASE_URL"
**Causa:** .env.local não preenchida  
**Solução:**
```bash
cat .env.local
# Se vazio: preencher manualmente
code .env.local
npm run dev  # reiniciar
```

### "Supabase connection refused"
**Causa:** URL ou chave errada  
**Solução:**
```bash
# Verificar URL
grep VITE_SUPABASE_URL .env.local
# Deve ser: https://xxxxx.supabase.co

# Verificar chave
grep VITE_SUPABASE_ANON_KEY .env.local
# Deve ser: eyJhbGc... (não vazio)
```

### "npm: command not found"
**Causa:** Node.js não instalado  
**Solução:**
```bash
# Instalar Node.js 18+
# https://nodejs.org
# Depois: npm --version
```

### "Schema SQL não roda"
**Causa:** Supabase console error  
**Solução:**
```
1. Verificar que está no SQL Editor correto
2. Copiar EXATAMENTE de supabase-schema-learning.sql
3. Clicar RUN (não CTRL+ENTER)
4. Ver output para erro específico
```

### "Testes falham"
**Causa:** Dependência faltando  
**Solução:**
```bash
npm install vitest @testing-library/react jsdom
npm run test:run
```

---

## 📞 Precisa de Ajuda?

### Checklist está aqui:
```
~/lumi/INTEGRATION-CHECKLIST.md
```

### Guias estão aqui:
```
~/lumi/ENV-SETUP.md
~/lumi/INTEGRATION-GUIDE.md
~/lumi/PERFORMANCE-GUIDE.md
```

### Code está aqui:
```
~/lumi/src/pages/Quiz.tsx       ← integração
~/lumi/vitest.config.ts          ← testes
~/lumi/package.json              ← dependências
```

---

## ✨ Próximo Passo

**Execute este comando agora:**

```bash
bash setup-local.sh
```

Depois siga o checklist acima passo-a-passo.

**Tempo total:** 90 minutos → **LUMI VIVA!** 🚀

---

**Responsável:** Claude Haiku 4.5  
**Data:** 02-OUT-2026  
**Status:** ✅ Pronto
