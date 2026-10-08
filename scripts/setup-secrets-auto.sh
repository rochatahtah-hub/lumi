#!/bin/bash

# 🚀 SCRIPT AUTOMÁTICO PARA CONFIGURAR SUPABASE SECRETS
#
# Como usar:
# 1. Abrir: https://app.supabase.com → Account → Access Tokens
# 2. Criar novo token (pode ser temporário)
# 3. Copiar o token
# 4. Executar: export SUPABASE_ACCESS_TOKEN="seu_token_aqui"
# 5. Executar: bash scripts/setup-secrets-auto.sh
#

set -e

echo "🔐 Configurando Supabase Secrets..."
echo ""

# Variáveis
PROJECT_REF="khmozcolgdpkvlgctqgk"
VAPID_PUBLIC_KEY="BPrLqY1C6rE_zrPu3BNC34uvRhKdVw6iAzXvUjoT-p_VJrIXcSSN6qr4YCSOXK3YaC4GLnaYAGJRzSBR3vHvgG0"
VAPID_PRIVATE_KEY="QRdMnQgxEb7UGhYGOeiOrHDxq89dkNSMfz-JMOL5WPA"
VAPID_SUBJECT="mailto:notificacoes@lumiensina.app.br"

# Verificar se token foi fornecido
if [ -z "$SUPABASE_ACCESS_TOKEN" ]; then
    echo "❌ Token não fornecido!"
    echo ""
    echo "Como fazer:"
    echo "1. Ir para: https://app.supabase.com → Account → Access Tokens"
    echo "2. Criar novo token (pode ser temporário)"
    echo "3. Copiar o token"
    echo "4. Executar no terminal:"
    echo "   export SUPABASE_ACCESS_TOKEN=\"seu_token_aqui\""
    echo "5. Depois executar:"
    echo "   bash scripts/setup-secrets-auto.sh"
    exit 1
fi

echo "✅ Token fornecido. Adicionando secrets..."
echo ""

# Função para adicionar secret via API
add_secret() {
    local name=$1
    local value=$2

    echo "Adicionando: $name"

    curl -s -X POST \
        "https://api.supabase.com/v1/projects/${PROJECT_REF}/secrets" \
        -H "Authorization: Bearer ${SUPABASE_ACCESS_TOKEN}" \
        -H "Content-Type: application/json" \
        -d "{\"name\":\"${name}\",\"value\":\"${value}\"}" \
        > /dev/null

    if [ $? -eq 0 ]; then
        echo "  ✅ Adicionado"
    else
        echo "  ❌ Erro ao adicionar"
    fi
}

# Adicionar os 3 secrets
add_secret "VAPID_PUBLIC_KEY" "$VAPID_PUBLIC_KEY"
add_secret "VAPID_PRIVATE_KEY" "$VAPID_PRIVATE_KEY"
add_secret "VAPID_SUBJECT" "$VAPID_SUBJECT"

echo ""
echo "✅ Secrets configurados!"
echo ""
echo "Próximo passo: bash scripts/deploy-notifications.sh"
