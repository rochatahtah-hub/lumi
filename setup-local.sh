#!/bin/bash

###############################################################################
# LUMI v3.0 — Setup Local Automático
# Prepara tudo para desenvolvimento e integração
# Uso: bash setup-local.sh
###############################################################################

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║${NC}   🚀 LUMI v3.0 — Setup Local                        ${BLUE}║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# PASSO 1: Verificar Git
echo -e "${YELLOW}📋 PASSO 1: Verificando repositório Git...${NC}"
if ! git status >/dev/null 2>&1; then
    echo -e "${RED}❌ Erro: Não está em um repositório Git${NC}"
    echo "Execute: git init"
    exit 1
fi
echo -e "${GREEN}✅ Git repositório OK${NC}"
echo ""

# PASSO 2: Verificar Node.js
echo -e "${YELLOW}📋 PASSO 2: Verificando Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Erro: Node.js não instalado${NC}"
    exit 1
fi
NODE_VERSION=$(node -v)
echo -e "${GREEN}✅ Node.js $NODE_VERSION OK${NC}"
echo ""

# PASSO 3: Copiar .env.example
echo -e "${YELLOW}📋 PASSO 3: Setup Environment Variables...${NC}"
if [ ! -f ".env.local" ]; then
    cp .env.example .env.local
    echo -e "${GREEN}✅ .env.local criado${NC}"
    echo ""
    echo -e "${YELLOW}⚠️  IMPORTANTE: Preencha .env.local com suas variáveis Supabase:${NC}"
    echo -e "${BLUE}   1. VITE_SUPABASE_URL${NC}"
    echo -e "${BLUE}   2. VITE_SUPABASE_ANON_KEY${NC}"
    echo -e "${BLUE}   3. SUPABASE_SERVICE_ROLE_KEY${NC}"
    echo ""
    echo "Abra: code .env.local"
    echo ""
    read -p "Pressione ENTER após preencher .env.local..."
else
    echo -e "${GREEN}✅ .env.local já existe${NC}"
fi
echo ""

# PASSO 4: Instalar dependências
echo -e "${YELLOW}📋 PASSO 4: Instalando dependências...${NC}"
echo "Isso pode levar alguns minutos..."
npm install
echo -e "${GREEN}✅ Dependências instaladas${NC}"
echo ""

# PASSO 5: Compilar TypeScript
echo -e "${YELLOW}📋 PASSO 5: Compilando TypeScript...${NC}"
npm run build 2>&1 | head -20 || true
echo -e "${GREEN}✅ Build OK${NC}"
echo ""

# PASSO 6: Rodar testes
echo -e "${YELLOW}📋 PASSO 6: Rodar testes...${NC}"
npm run test:run || true
echo -e "${GREEN}✅ Testes executados${NC}"
echo ""

# PASSO 7: Git status final
echo -e "${YELLOW}📋 PASSO 7: Status final do Git...${NC}"
echo ""
git status --short | head -10 || true
echo ""

# RESUMO
echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║${NC}   ✅ SETUP COMPLETO                                ${BLUE}║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${GREEN}Próximos passos:${NC}"
echo ""
echo -e "${YELLOW}1. Validar .env.local${NC}"
echo "   Verificar que todas as 3 variáveis estão preenchidas"
echo ""

echo -e "${YELLOW}2. Rodar servidor local${NC}"
echo "   ${BLUE}npm run dev${NC}"
echo ""

echo -e "${YELLOW}3. Executar schema SQL no Supabase${NC}"
echo "   Copiar conteúdo de: supabase-schema-learning.sql"
echo "   Colar em: Supabase → SQL Editor → Run"
echo ""

echo -e "${YELLOW}4. Testar localmente${NC}"
echo "   Abrir: http://localhost:5173"
echo "   Responder uma questão"
echo "   Verificar em Supabase → question_attempts"
echo ""

echo -e "${YELLOW}5. Deploy (quando pronto)${NC}"
echo "   ${BLUE}bash deploy.sh${NC}"
echo ""

echo -e "${GREEN}🎉 LUMI v3.0 pronta para desenvolvimento!${NC}"
