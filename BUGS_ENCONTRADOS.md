# BUGS ENCONTRADOS E CORREÇÕES NECESSÁRIAS

## CRÍTICO 🔴
1. ExamPrepForm dropdown persistence - ✅ CORRIGIDO (input+datalist)
2. Site publicado desatualizado - REQUER DEPLOY MANUAL via Hostinger cPanel

## ALTO 🟠
1. Service Worker cache - Pode estar servindo versão desatualizada
2. Perguntas genéricas em ExamPrep quando conteúdo não encontrado
3. Layout/spacing do ExamSimulator - alternativas podem sobrepor

## MÉDIO 🟡
1. TODO em auth.ts (arquivo dummy, não usado)
2. attempt_number hardcoded em learning-api.ts
3. Responsividade em mobile para alguns componentes

## BAIXO 🟢
1. Console logs de debug ainda presentes
2. Validações faltando em alguns inputs
