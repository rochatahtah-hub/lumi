#!/bin/bash

# ===== LUMI — Verificação Pré-Deploy =====
# Use este script para verificar se tudo está pronto antes de fazer push para GitHub

echo "🔍 Verificando LUMI para deploy..."
echo ""

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

passed=0
failed=0

check() {
  if eval "$1"; then
    echo -e "${GREEN}✅ $2${NC}"
    ((passed++))
  else
    echo -e "${RED}❌ $2${NC}"
    ((failed++))
  fi
}

# 1. Verificar Node.js
check "command -v node >/dev/null 2>&1" "Node.js instalado"

# 2. Verificar npm
check "command -v npm >/dev/null 2>&1" "npm instalado"

# 3. Verificar node_modules
check "[ -d node_modules ]" "node_modules existe"

# 4. Verificar package.json
check "[ -f package.json ]" "package.json existe"

# 5. Verificar script build
check "grep -q '\"build\"' package.json" "Script 'build' configurado"

# 6. Verificar vite.config.ts
check "[ -f vite.config.ts ]" "vite.config.ts existe"

# 7. Verificar .htaccess
check "[ -f .htaccess ]" ".htaccess existe"

# 8. Verificar .env.production
check "[ -f .env.production ]" ".env.production existe"

# 9. Verificar GitHub workflow
check "[ -f .github/workflows/deploy.yml ]" ".github/workflows/deploy.yml existe"

# 10. Verificar .gitignore contém .env
check "grep -q '^\.env$' .gitignore" ".env está em .gitignore"

# 11. Verificar src/
check "[ -d src ]" "Pasta src/ existe"

# 12. Verificar public/ ou dist/
check "[ -d public ] || [ -d dist ]" "Pasta public/ ou dist/ existe"

echo ""
echo "=========================================="
echo "📊 Resultado: $passed ✅ | $failed ❌"
echo "=========================================="

if [ $failed -eq 0 ]; then
  echo -e "${GREEN}✨ Tudo pronto para deploy!${NC}"
  echo ""
  echo "Próximos passos:"
  echo "  1. git add ."
  echo "  2. git commit -m 'sua mensagem'"
  echo "  3. git push origin main"
  echo ""
  echo "GitHub Actions fará o build e deploy automaticamente! 🚀"
  exit 0
else
  echo -e "${RED}⚠️  Corrija os erros acima antes de fazer push.${NC}"
  exit 1
fi
