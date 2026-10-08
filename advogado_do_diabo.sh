#!/bin/bash
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║     ADVOGADO DO DIABO - TENTANDO EXPLORAR O SISTEMA          ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

echo "🔴 ATAQUE 1: IDOR (Insecure Direct Object Reference)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Procurando por IDs sem validação de auth:"
grep -r "\.get\|\.select\|\.eq(" supabase/functions --include="*.ts" | grep -v "auth.uid()" | head -10
echo ""

echo "🔴 ATAQUE 2: Bypass de Autenticação"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Procurando por endpoints públicos (verify_jwt = false):"
grep -r "verify_jwt.*false" supabase/functions --include="*.ts"
echo ""

echo "🔴 ATAQUE 3: CORS Misconfiguration"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Procurando por CORS permitindo '*' (wildcard):"
grep -r "Access-Control-Allow-Origin.*\*" supabase --include="*.ts"
grep -r "Access-Control-Allow-Origin.*\*" src --include="*.ts"
echo ""

echo "🔴 ATAQUE 4: Exposição de Dados Sensíveis"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Procurando por console.log com dados sensíveis:"
grep -r "console.log.*email\|console.log.*password\|console.log.*token\|console.log.*secret" src --include="*.ts" --include="*.tsx"
echo ""

echo "🔴 ATAQUE 5: Rate Limiting / DOS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Endpoints sem rate limiting:"
ls -la supabase/functions/*/index.ts | while read file; do
  echo "Arquivo: $file"
  grep -l "rate\|limit\|throttle" "$file" || echo "  ❌ SEM RATE LIMITING"
done
echo ""

echo "🔴 ATAQUE 6: RLS Bypass"
echo "━━━━━━━━━━━━━━━━━━━━━━"
echo "Procurando por service_role calls sem RLS check:"
grep -r "service_role\|SERVICE_ROLE" supabase/functions --include="*.ts" | grep -v "supabaseClient\|SUPABASE_SERVICE_ROLE"
echo ""

echo "🔴 ATAQUE 7: Input Validation"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Procurando por input sem validação:"
grep -r "requestBody\|req.json\|await req.json()" supabase/functions --include="*.ts" -A 3 | grep -v "if.*error\|if.*required" | head -20
echo ""

echo "🔴 ATAQUE 8: Histórico Git com Secrets"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Procurando por commits que tocaram .env:"
git log --all --name-only --pretty=format: | sort -u | grep "\.env"
echo ""
echo "Verificando se .env está no .gitignore:"
cat .gitignore | grep "\.env"
echo ""

echo "🔴 ATAQUE 9: Privilégios Administrativos"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Verificando se RLS protege dados admin:"
grep -A 5 "is_admin\|admin" supabase/migrations --include="*.sql" -r | head -20
echo ""

echo "🔴 ATAQUE 10: localStorage / Session Hijacking"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "O que está sendo armazenado em localStorage:"
grep -r "localStorage.setItem" src --include="*.ts" --include="*.tsx" -B 1
echo ""

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║         FIM DO ATAQUE - 2º PASSO (Advogado do Diabo)         ║"
echo "╚════════════════════════════════════════════════════════════════╝"
