# 📋 Guia de Deploy LUMI via cPanel

## ✅ Pré-Deploy Checklist

- [x] Build local: `npm run build` ✓ (2074 módulos)
- [x] Todos commits pushados ao Git
- [x] Sem erros TypeScript
- [x] Dependências instaladas: `npm install`

## 🚀 Passos de Deploy via cPanel

### 1. Preparar arquivos locais
```bash
cd C:\Users\Mateus\lumi
npm run build  # Gera dist/
```

### 2. Acessar cPanel
- URL: Hostinger cPanel (seu domínio)
- Login: sua credencial (em 1Password ou .env)

### 3. File Manager (Upload)
1. Navegue até `public_html/` (ou raiz do domínio)
2. Faça backup da versão anterior (criar pasta `backup_2026-10-03/`)
3. Delete conteúdo antigo (menos `.htaccess` se houver)
4. Faça upload de `dist/`:
   - Arrastar e soltar `dist/*` para cPanel File Manager
   - OU usar SCP: `scp -r dist/* user@lumiensina.app.br:/public_html/`

### 4. Verificar permissões
- Pasta `public_html/`: 755
- Arquivos HTML/JS: 644
- `.env` (se houver): 600

### 5. Limpar cache
- cPanel > Performance > Clear Cache
- Ou browser: Ctrl+Shift+Delete

## 🧪 Testes Pós-Deploy

### Teste 1: Página carrega
```bash
curl https://lumiensina.app.br/
# Esperado: HTML com <title>LUMI</title>
```

### Teste 2: Assets carregam
```bash
curl -I https://lumiensina.app.br/assets/index-*.js
# Esperado: 200 OK
```

### Teste 3: API/dados funcionam
Abrir DevTools (F12) → Network:
- Verificar que `index.ts` carrega sem erros
- Verificar que `BASE_LESSONS` tem 266 itens
- Console sem red errors

### Teste 4: Funcionalidades críticas
- [ ] Página home carrega
- [ ] Busca funciona (search-engine.ts)
- [ ] Dashboard de cobertura renderiza
- [ ] Aulas carregam (todas as 266)
- [ ] ENEM questões disponíveis
- [ ] Jogos inicializam (memory, quiz)
- [ ] Responsivo no mobile (browser zoom 75%)

## 📊 Health Check Script

```typescript
// src/utils/health-check.ts
export async function healthCheck() {
  const checks = {
    lessonsCount: BASE_LESSONS.length === 266,
    enemCount: BASE_LESSONS.filter(l => l.subject === 'enem').length === 25,
    disciplinesCount: new Set(BASE_LESSONS.map(l => l.subject)).size === 14,
    searchIndex: buildSearchIndex(BASE_LESSONS).length > 0,
    gamesLoaded: Object.keys(GAMES_EXPANSION).length > 0,
    dashboardWorks: !!CoverageDashboard,
  }

  const allPass = Object.values(checks).every(v => v)
  return { allPass, checks }
}
```

Executar no console do navegador:
```javascript
import { healthCheck } from './utils/health-check'
healthCheck().then(r => console.log(r))
// Esperado: { allPass: true, checks: {...} }
```

## 🔗 URLs para testar após deploy

- **Home:** https://lumiensina.app.br/
- **Aulas:** https://lumiensina.app.br/aulas (se route existe)
- **ENEM:** https://lumiensina.app.br/enem (questões)
- **Dashboard:** https://lumiensina.app.br/admin/coverage (se rota admin)
- **API/JSON:** https://lumiensina.app.br/api/lessons (se endpoint)

## 🚨 Troubleshooting

| Problema | Solução |
|----------|---------|
| 404 Not Found | Verificar se dist/ foi uploadado corretamente para public_html/ |
| CSS/JS não carrega | Limpar cache (Ctrl+Shift+Delete), verificar paths em vite.config |
| BASE_LESSONS undefined | Verificar se BUILD completou sem erros (`npm run build`) |
| Deploy lento | Usar SCP em vez de File Manager (mais rápido) |
| SSL/HTTPS error | cPanel > SSL/TLS > Install Let's Encrypt (automático) |

## ✅ Rollback (se necessário)

```bash
# Restaurar versão anterior (backup)
cd /public_html
rm -rf ./*
cp -r backup_2026-10-03/* ./
```

## 📝 Depois do Deploy

1. Testar em 3 navegadores (Chrome, Firefox, Safari)
2. Testar em mobile (via ngrok ou device físico)
3. Monitorar console para warnings/errors
4. Verificar que BASE_LESSONS está acessível
5. Testar busca com 3-5 queries reais

---

**Documentação completa. Segue passo a passo este guia para deploy seguro e funcional.**
