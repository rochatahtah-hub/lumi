#!/bin/bash
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║          AUDITORIA COMPLETA DE SEGURANÇA - LUMI               ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

echo "📋 1. VERIFICANDO SECRETS E CREDENCIAIS EM CÓDIGO"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Buscando padrões perigosos:"
grep -r "password\|senha\|api_key\|apikey\|secret\|token\|credential" src --include="*.tsx" --include="*.ts" | grep -v "node_modules\|\.git" | grep -E "=\s*['\"]|const.*=.*['\"]" | head -20 && echo "⚠️ ENCONTRADOS!" || echo "✅ Nenhum secret encontrado em código"

echo ""
echo "📋 2. VERIFICANDO XSS VULNERABILITIES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
grep -r "dangerouslySetInnerHTML\|innerHTML\|eval\(" src --include="*.tsx" --include="*.ts" | head -20 && echo "⚠️ ENCONTRADOS!" || echo "✅ Nenhum XSS encontrado"

echo ""
echo "📋 3. VERIFICANDO SQL INJECTION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
grep -r "where\|select\|from" src --include="*.ts" | grep "+" | head -20 && echo "⚠️ POSSÍVEL CONCATENAÇÃO!" || echo "✅ Usando Supabase client (safe)"

echo ""
echo "📋 4. VERIFICANDO AUTENTICAÇÃO E AUTORIZAÇÃO"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Verificando RLS nas tabelas críticas:"
grep -r "alter table.*enable row level security" supabase/migrations --include="*.sql" | wc -l
echo "policies criadas:"
grep -r "create policy" supabase/migrations --include="*.sql" | wc -l

echo ""
echo "📋 5. VERIFICANDO CORS E REQUISIÇÕES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
grep -r "Access-Control-Allow-Origin" supabase/functions --include="*.ts" | head -10
echo ""
grep -r "fetch\|axios" src --include="*.tsx" | grep -E "http://[^s]|https://.*\.example" | head -10 && echo "⚠️ URLS SUSPEITAS!" || echo "✅ Nenhuma URL suspeita"

echo ""
echo "📋 6. VERIFICANDO VARIÁVEIS DE AMBIENTE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
ls -la .env* 2>/dev/null
echo ""
echo "Verificando se ENV vars sensíveis estão no .git:"
git log -p --all -S "VITE_SUPABASE" 2>/dev/null | head -5 && echo "⚠️ Histórico pode ter segredos!" || echo "✅ OK"

echo ""
echo "📋 7. VERIFICANDO EDGE FUNCTIONS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Listando Edge Functions:"
ls -la supabase/functions/*/index.ts | awk '{print $NF}'
echo ""
echo "Verificando autenticação em Edge Functions:"
grep -r "Authorization\|Bearer\|auth" supabase/functions --include="*.ts" | wc -l
echo "linhas com verificação de auth"

echo ""
echo "📋 8. VERIFICANDO RATE LIMITING E DOS PROTECTION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
grep -r "rate.limit\|throttle\|debounce" src --include="*.tsx" --include="*.ts" | wc -l
echo "linhas com rate limiting"
echo "⚠️ Verificar manualmente se há proteção contra DOS"

echo ""
echo "📋 9. VERIFICANDO ARMAZENAMENTO DE DADOS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "localStorage:"
grep -r "localStorage" src --include="*.tsx" --include="*.ts" | wc -l
echo "linhas usando localStorage"
echo ""
echo "sessionStorage:"
grep -r "sessionStorage" src --include="*.tsx" --include="*.ts" | wc -l
echo "linhas usando sessionStorage"

echo ""
echo "📋 10. VERIFICANDO DEPENDÊNCIAS COM VULNERABILIDADES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
npm audit --json 2>/dev/null | jq '.metadata.vulnerabilities' 2>/dev/null || echo "Executar: npm audit para verificar"

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║              FIM DA AUDITORIA - 1º PASSO                      ║"
echo "╚════════════════════════════════════════════════════════════════╝"
