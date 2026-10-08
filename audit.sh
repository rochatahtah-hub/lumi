#!/bin/bash
echo "=== AUDITORIA LUMI ===" 

echo ""
echo "1. NOTIFICAÇÕES:"
echo "- NotificationRequest integrado? $(grep -q 'NotificationRequest' src/App.tsx && echo 'SIM' || echo 'NÃO')"
echo "- localStorage check existe? $(grep -q 'lumi_notification_decision' src/components/NotificationRequest.tsx && echo 'SIM' || echo 'NÃO')"
echo ""

echo "2. PROGRESSO ADM:"
echo "- Página Progress.tsx existe? $(test -f src/pages/Progress.tsx && echo 'SIM' || echo 'NÃO')"
echo "- ErrorFallback? $(grep -q 'ErrorFallback' src/pages/Progress.tsx && echo 'SIM' || echo 'NÃO')"
echo ""

echo "3. QUEBRA-CABEÇAS:"
echo "- Quebra-cabeça componente? $(test -f src/components/Puzzle.tsx && echo 'SIM' || echo 'NÃO')"
echo "- Quebra-cabeça página? $(test -f src/pages/Puzzle.tsx && echo 'SIM' || echo 'NÃO')"
echo ""

echo "4. SUPABASE:"
echo "- Migrations SQL? $(ls -1 supabase/migrations/ 2>/dev/null | wc -l) arquivos"
echo ""

echo "FIM AUDITORIA"
