@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo.
echo ════════════════════════════════════════════════════════════════
echo  🚀 LUMI Deploy — Hostinger
echo ════════════════════════════════════════════════════════════════
echo.

REM Verificar se estamos na pasta correta
if not exist "package.json" (
    echo ❌ ERRO: Execute este script da pasta do LUMI
    echo.
    pause
    exit /b 1
)

REM Passo 1: Build
echo 📦 Compilando LUMI (npm run build)...
echo.
call npm run build

if errorlevel 1 (
    echo.
    echo ❌ Erro na compilação! Verifique o código.
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ Build concluído com sucesso!
echo.

REM Passo 2: Abrir pasta dist
echo 📂 Abrindo pasta dist\ para você arrastar os arquivos...
start explorer "dist"

REM Aguardar um pouco
timeout /t 2 /nobreak

REM Passo 3: Abrir Gerenciador de Arquivos do Hostinger
echo.
echo 🌐 Abrindo Gerenciador de Arquivos do Hostinger...
echo.
start https://hpanel.hostinger.com/websites/lumiensina.app.br/files/file-manager

echo.
echo ════════════════════════════════════════════════════════════════
echo ✅ PRÓXIMOS PASSOS:
echo ════════════════════════════════════════════════════════════════
echo.
echo 1. A pasta 'dist\' será aberta no Explorador de Arquivos
echo.
echo 2. O Gerenciador de Arquivos do Hostinger abrirá no navegador
echo    (você verá a pasta /public_html/)
echo.
echo 3. SELECIONE TODOS os arquivos/pastas em dist\
echo    → Ctrl+A para selecionar tudo
echo.
echo 4. ARRASTE para a pasta /public_html/ no navegador
echo    → Ou use o botão "Upload" do Hostinger
echo.
echo 5. AGUARDE o upload terminar
echo.
echo 6. LIMPE O CACHE do navegador:
echo    → Ctrl+Shift+Delete (limpar cache do site)
echo    → Ou abra em navegador PRIVADO (Ctrl+Shift+N)
echo.
echo 7. ACESSE: https://lumiensina.app.br
echo.
echo ════════════════════════════════════════════════════════════════
echo.
pause
