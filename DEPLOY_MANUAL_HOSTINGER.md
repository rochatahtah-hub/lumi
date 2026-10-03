# 🚀 Guia: Deploy Manual LUMI no Hostinger cPanel

**⏱️ Tempo estimado:** 5-10 minutos  
**Dificuldade:** ⭐ Fácil  
**Última atualização:** 03/10/2026 22:21 BRT

---

## Pré-requisitos

- ✅ Acesso ao Hostinger cPanel
- ✅ Username e senha do cPanel
- ✅ Domínio `lumiensina.app.br` apontando para a conta

---

## Método 1: Git Repository (RECOMENDADO - AUTOMÁTICO)

### Passo 1: Abrir Git Repository no cPanel

```
1. Acessar Hostinger cPanel
2. Procurar por "Git" ou "Git Repository"
3. Clique em "Git Repository"
```

### Passo 2: Adicionar Repositório

```
1. Clique em "Create"
2. Preenchimento:
   - Repository URL: https://github.com/rochatahtah-hub/lumi.git
   - Repository path: /home/seu_usuario/public_html/lumi
   - Branch: master
   - Clicar em "Create Repository"
```

### Passo 3: Build do Projeto

```
Via Terminal SSH (se disponível):
cd /home/seu_usuario/public_html/lumi
npm install
npm run build
```

### Passo 4: Mover arquivos para public_html raiz

```
Via File Manager do cPanel:
1. Abrir File Manager
2. Navegar até lumi/dist/
3. Selecionar TODOS os arquivos em dist/
4. Cut (Ctrl+X)
5. Voltar para /public_html (raiz)
6. Paste (Ctrl+V)
7. Confirmar que .htaccess, index.html, etc. estão lá
```

### Passo 5: Verificar

```
Acessar no navegador:
https://lumiensina.app.br/preparacao-prova

Deverá renderizar o formulário ExamPrep (não Home)
```

---

## Método 2: File Manager (Manual)

### Passo 1: Baixar build

**No seu PC local:**
```bash
cd C:\Users\Mateus\lumi
npm run build
# Isso cria a pasta dist/
```

### Passo 2: Fazer upload no cPanel

```
1. Hostinger cPanel → File Manager
2. Navegar até /public_html
3. Fazer upload de TODOS os arquivos de dist/:
   - assets/ (pasta inteira)
   - index.html
   - manifest.webmanifest
   - .htaccess
   - pwa-192x192.png, pwa-512x512.png, etc.
   - registerSW.js
   - sw.js
   - workbox-xxxxx.js
```

### Passo 3: Verificar

```
https://lumiensina.app.br/preparacao-prova
Deverá funcionar!
```

---

## Método 3: SSH + Git (Mais Automático)

### Se você tem acesso SSH:

```bash
# Conectar ao servidor
ssh seu_usuario@seu_host -p 22

# Navegar para public_html
cd ~/public_html

# Clonar repositório
git clone https://github.com/rochatahtah-hub/lumi.git lumi

# Ou fazer pull se já existe:
cd lumi
git pull origin master

# Instalar e build
npm install
npm run build

# Mover para raiz (ou criar symlink)
cp -r dist/* ../
```

---

## ⚠️ Troubleshooting

### Problema: "Network unreachable" ao tentar SSH

**Solução:**
- Hostinger pode bloquear SSH
- Use Method 1 (Git Repository no cPanel) ou Method 2 (File Manager)

### Problema: npm command not found

**Solução:**
- Node.js pode não estar instalado
- Usar cPanel → Software → Install Node.js

### Problema: File Manager upload lento

**Solução:**
- Fazer upload em lotes menores
- Ou usar Git Repository (mais rápido)

### Problema: Site ainda renderiza Home após upload

**Solução:**
1. Hard refresh: Ctrl+Shift+R
2. Limpar cache do cPanel (se houver)
3. Verificar se index.html está em /public_html (não em /public_html/dist/)
4. Verificar .htaccess está presente
5. Aguardar cache do CloudFlare (Hostinger pode estar usando)

---

## ✅ Verificação Final

Após fazer o deploy, testar:

```
✅ https://lumiensina.app.br/
   → Deve renderizar Home com saudação

✅ https://lumiensina.app.br/preparacao-prova
   → Deve renderizar FORMULÁRIO ExamPrep (não Home!)
   → Seletores: Matéria, Série
   → Campo: Adicionar conteúdos
   → Botão: 🚀 Começar Teste

✅ Completar formulário e testar fluxo:
   → Form → Exam (20 questões) → Results
```

---

## 📊 Arquivos a Fazer Upload

```
/public_html/
├── index.html (IMPORTANTE!)
├── manifest.webmanifest
├── .htaccess (IMPORTANTE! Para SPA routing)
├── registerSW.js
├── sw.js
├── workbox-xxxxx.js
├── assets/ (pasta com CSS, JS, imagens)
│   ├── index-xxxxx.js
│   ├── index-xxxxx.css
│   └── [outras imagens e assets]
├── pwa-64x64.png
├── pwa-192x192.png
├── pwa-512x512.png
├── maskable-icon-512x512.png
└── favicon.svg
```

---

## 🎯 Resumo

| Método | Tempo | Dificuldade | Recomendação |
|--------|-------|-------------|--------------|
| Git Repository | 5-10min | ⭐ Fácil | ✅ MELHOR |
| File Manager | 10-15min | ⭐ Fácil | ✅ Alternativa |
| SSH + Git | 5min | ⭐⭐ Médio | ⚠️ Se disponível |

---

## 📞 Precisa de ajuda?

Se algo não funcionar:
1. Verifique o console do navegador (F12 → Console)
2. Verifique que todos os arquivos foram uploadados
3. Verifique que .htaccess está presente
4. Aguarde 5 minutos para cache invalidar

---

**Desenvolvido por:** Claude Haiku 4.5  
**Data:** 03/10/2026  
**Status:** ✅ Guia Completo Pronto para Execução
