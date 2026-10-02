# LUMI v3.1 - Opções de Deploy para Hostinger

## 🔴 Status Atual
- ✅ Código compilado: `dist/` gerado com 49 arquivos
- ✅ Código commitado no GitHub
- ❌ Deploy bloqueado: FTP e SFTP não conseguem conectar (firewall local está bloqueando)

---

## 🔧 Opção 1: Desbloquear Firewall (RECOMENDADO - Mais Rápido)

**Se você está atrás de firewall corporativo ou VPN:**

1. **Permita conexões FTP/SFTP na porta 21 e 22**
   - Verifique configurações de firewall/rede local
   - Talvez seu WiFi/provedor está bloqueando

2. **Usando VPN:**
   - Conecte a um VPN público (NordVPN, ExpressVPN, etc)
   - Tente rodar o script de novo:
   ```bash
   node deploy-sftp.js "V7!qN4@zL9#rT2$wX8mP"
   ```

---

## 🔧 Opção 2: WinSCP (Ferramenta Visual - Não Requer Terminal)

**Download:** https://winscp.net/eng/download.php

**Passo a Passo:**
1. Instale WinSCP
2. Nova conexão:
   - Host: `seashell-hyena-117618.hostingersite.com`
   - Usuário: `u159416153.lumiensina.app.br`
   - Senha: `V7!qN4@zL9#rT2$wX8mP`
   - Porta: `22` (SFTP)
3. Navegue até `/public_html/`
4. Arraste a pasta `dist/` inteira (de `C:\Users\Mateus\lumi\dist`)
5. Coloque os arquivos dentro de `/public_html/`

---

## 🔧 Opção 3: Painel Hostinger - Gerenciador de Arquivos

**Direto no navegador (sem FTP):**

1. Acesse: https://www.hostinger.com/cpanel
2. Login com suas credenciais Hostinger
3. Procure: **Gerenciador de Arquivos** ou **File Manager**
4. Navegue até `public_html/`
5. Tente fazer upload dos arquivos do `dist/` (pode ter limite de tamanho)

⚠️ **Se der erro de permissão**, os arquivos precisam de um método alternativo.

---

## 🔧 Opção 4: Hostinger Git Deploy (Se Disponível)

**Se seu plano Hostinger suporta Git Deploy:**

1. Acesse painel Hostinger
2. Procure: **Git** ou **Git Deploy**
3. Conecte seu repositório: `https://github.com/rochatahtah-hub/lumi`
4. Configure branch: `master`
5. **Build command:** `npm run build`
6. **Deployment directory:** `dist/`
7. Salve e deixe o Hostinger fazer deploy automático

---

## ✅ O que Fazer Agora

1. **Tente Opção 1 (VPN):** Mais rápido
2. **Se VPN não funcionar:** Instale WinSCP (Opção 2) - é gráfico e fácil
3. **Se nada funcionar:** Contacte suporte Hostinger e peça para ativar Git Deploy

---

## 📝 Informações Importantes

- **Servidor:** `seashell-hyena-117618.hostingersite.com`
- **Usuário FTP/SFTP:** `u159416153.lumiensina.app.br`
- **Senha:** `V7!qN4@zL9#rT2$wX8mP`
- **Porta SFTP:** `22`
- **Pasta de destino:** `/public_html/`
- **Repositório GitHub:** `https://github.com/rochatahtah-hub/lumi`

---

## 🎯 Próximos Passos Após Deploy

Após os arquivos estarem no servidor:

1. Aguarde 1-2 minutos para o servidor processar
2. Acesse: https://lumiensina.app.br
3. **Limpe o cache:** Pressione `Ctrl+F5`
4. Você deve ver:
   - ✅ **Bom dia, [Nome do usuário]** (Saudação Personalizada)
   - ✅ **Preparação para Prova** (Nova seção de testes)

---

## 📞 Contacte Hostinger Se Nada Funcionar

Support: https://www.hostinger.com/support

Pergunte:
- "Como faço deploy de uma aplicação Node.js compilada (arquivos HTML/CSS/JS estáticos)?"
- "Como ativo Git Deploy no meu plano?"
- "Posso usar SFTP na porta 22?"
