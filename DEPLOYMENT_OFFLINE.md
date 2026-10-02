# LUMI v3.1 - Deploy para Netlify (Offline-First)

## ✅ Status Atual

- ✅ **Aplicação compilada:** `dist/` gerado e pronto
- ✅ **Modo offline:** Funciona 100% sem Supabase
- ✅ **Compatibilidade:** Funciona em QUALQUER plano de hosting
- ✅ **Dados lokais:** localStorage/IndexedDB (permanentes no navegador)
- ✅ **Código commitado:** GitHub em `master`

---

## 🚀 Deploy MAIS FÁCIL: Netlify (Recomendado)

**Netlify é GRÁTIS e faz deploy automático a cada push no GitHub!**

### Passo 1: Criar Conta Netlify
1. Acesse: https://www.netlify.com/
2. Clique "Sign up"
3. **Escolha "GitHub"** (conecta automaticamente)
4. Autorize o Netlify no GitHub

### Passo 2: Conectar Repositório
1. Na dashboard Netlify, clique **"Add new site"**
2. Escolha **"Import an existing project"**
3. Selecione **GitHub**
4. Procure por: `lumi`
5. Selecione: `rochatahtah-hub/lumi`

### Passo 3: Configurar Build (Já está Pronto!)
- ✅ **Build command:** `npm run build` (detectado automaticamente)
- ✅ **Publish directory:** `dist` (Netlify já lê `netlify.toml`)
- Clique: **"Deploy site"**

### Pronto! 🎉
- Seu site está ONLINE em: `https://xxxxx.netlify.app`
- Cada vez que você faz push no GitHub, Netlify faz build e deploy automático

---

## 📋 O Que Mudou (vs Plano Anterior)

| Antes | Agora |
|-------|-------|
| Dependia de Supabase | 100% offline com localStorage |
| Precisava FTP/SFTP | Deploy automático via Git |
| Hostinger + Node.js | Netlify (qualquer plano) |
| Deploy manual | Deploy automático a cada push |

---

## 💾 Dados do Usuário

Todos os dados são salvos **localmente no navegador**:
- ✅ Nome do usuário
- ✅ Histórico de testes
- ✅ Progresso em lições
- ✅ Configurações

**Nota:** Dados são POR NAVEGADOR. Se usuário trocar PC/telefone, dados não sincronizam.

---

## 🔧 Se Preferir Manter Hostinger

Se quiser continuar com Hostinger, você pode:

### Opção 1: GitHub Pages (Grátis)
```
1. Vá em: https://github.com/rochatahtah-hub/lumi/settings/pages
2. Em "Source", escolha: master branch
3. Selecione: /root
4. Seu site estará em: https://rochatahtah-hub.github.io/lumi/
```

### Opção 2: WinSCP (Manual)
```
1. Instale WinSCP: https://winscp.net
2. Conecte ao Hostinger
3. Arraaste arquivos de dist/ para /public_html/
```

---

## 🎯 Próximas Features (Depois de Estável)

- [ ] Re-abilitar PWA (service worker offline)
- [ ] Integração com Supabase (opcional para sync de nuvem)
- [ ] Backup automático de dados
- [ ] Modo multiplayer (quando voltar Supabase)

---

## ✅ Checklist de Deploy

- [ ] Criou conta Netlify
- [ ] Conectou repositório GitHub
- [ ] Site está online
- [ ] Saudação personalizada funciona
- [ ] Preparação para Prova funciona
- [ ] Dados salvam no localStorage

---

## 📞 Suporte

- **Netlify docs:** https://docs.netlify.com/
- **Se der erro de build:** Verifique `npm install --legacy-peer-deps` localmente
- **Se dados não salvarem:** Verifique localStorage do navegador (F12 > Application)
