# ⚙️ Ativar Deploy Automático GitHub → Hostinger

Deploy automático a cada push em `master`.

## 1. Configurar Secrets no GitHub

Acesse: **https://github.com/rochatahtah-hub/lumi/settings/secrets/actions**

Adicione 3 secrets:

| Secret | Valor | Exemplo |
|--------|-------|---------|
| `FTP_SERVER` | Host FTP Hostinger | `ftp.lumiensina.app.br` ou `ftp.hostinger.com` |
| `FTP_USER` | Usuário FTP | `rochatahtah@gmail.com` ou usuário FTP Hostinger |
| `FTP_PASSWORD` | Senha FTP | sua senha FTP |

## 2. Verificar Workflow

Arquivo: `.github/workflows/deploy-hostinger.yml`

Workflow:
- ✅ Build (`npm run build`)
- ✅ Upload para FTP (`dist/` → `public_html/`)
- ✅ Rodará automaticamente a cada push em `master`

## 3. Testar Deploy

```bash
git push origin master
```

Depois acesse: **https://github.com/rochatahtah-hub/lumi/actions**

Procure pelo workflow `Deploy LUMI → lumiensina.app.br`:
- 🟢 Verde = sucesso
- 🔴 Vermelho = erro (ver logs)

## 4. Acessar Site Atualizado

Após ~2min: https://lumiensina.app.br

---

**Credenciais FTP do Hostinger:**

Se não souber suas credenciais FTP:

1. Acesse: https://hpanel.hostinger.com
2. Vá para: **Configurações da Conta** → **FTP & SSH**
3. Copiar:
   - `FTP_SERVER` (Host)
   - `FTP_USER` (Usuário)
   - `FTP_PASSWORD` (Senha)

---

✅ Uma vez configurado, todo `git push master` atualizará lumiensina.app.br automaticamente!
