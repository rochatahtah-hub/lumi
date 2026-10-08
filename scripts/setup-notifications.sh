#!/bin/bash

echo "🚀 Configurando Push Notifications LUMI..."
echo ""

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar se Supabase CLI está instalado
if ! command -v supabase &> /dev/null; then
    echo -e "${RED}❌ Supabase CLI não encontrado${NC}"
    echo "Instale com: npm install -g supabase"
    exit 1
fi

echo -e "${YELLOW}📋 Pré-requisitos:${NC}"
echo "1. Arquivo .env.local configurado com VITE_VAPID_PUBLIC_KEY ✓"
echo "2. Supabase Secrets configurados (VAPID_PRIVATE_KEY, etc) ⏳"
echo ""

# Passo 1: Deploy das migrations
echo -e "${YELLOW}1️⃣  Fazendo deploy das migrations...${NC}"
supabase db push
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Migrations deployadas${NC}"
else
    echo -e "${RED}❌ Erro ao fazer deploy das migrations${NC}"
    exit 1
fi
echo ""

# Passo 2: Deploy da Edge Function
echo -e "${YELLOW}2️⃣  Deployando Edge Function...${NC}"
supabase functions deploy send-push-notifications
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Edge Function deployada${NC}"
else
    echo -e "${RED}❌ Erro ao fazer deploy da Edge Function${NC}"
    exit 1
fi
echo ""

# Passo 3: Listar functions deployadas
echo -e "${YELLOW}3️⃣  Verificando functions deployadas:${NC}"
supabase functions list
echo ""

echo -e "${GREEN}✅ Setup completo!${NC}"
echo ""
echo "Próximos passos:"
echo "1. npm run build"
echo "2. npm run dev"
echo "3. Testar notificações em PWA instalado"
echo ""
echo "Para enviar notificação de teste:"
echo "npx ts-node scripts/send-test-notification.ts"
