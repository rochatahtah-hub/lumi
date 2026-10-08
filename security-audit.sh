#!/bin/bash
echo "=== AUDITORIA DE SEGURANÇA LUMI ===" 
echo ""

echo "1. VERIFICANDO: Secrets em código"
grep -r "VITE_VAPID\|secret\|password\|token\|key" src --include="*.tsx" --include="*.ts" 2>/dev/null | grep -v ".env\|import.meta.env\|VITE_" | head -10

echo ""
echo "2. VERIFICANDO: XSS potencial (dangerouslySetInnerHTML)"
grep -r "dangerouslySetInnerHTML\|innerHTML" src --include="*.tsx" | head -10

echo ""
echo "3. VERIFICANDO: SQL Injection em queries"
grep -r "from(\|select\|where" src/lib --include="*.ts" | grep "+" | head -5

echo ""
echo "4. VERIFICANDO: CORS e requisições de rede"
grep -r "fetch\|axios" src --include="*.ts" --include="*.tsx" | grep -v "node_modules" | head -20

echo ""
echo "5. VERIFICANDO: Acesso a localStorage sem validação"
grep -r "localStorage\|sessionStorage" src --include="*.ts" --include="*.tsx" | head -20

echo ""
echo "FIM AUDITORIA SEGURANÇA"
