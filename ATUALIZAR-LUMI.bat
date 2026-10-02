@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

cls
echo.
echo ════════════════════════════════════════════════════════════════
echo  🚀 ATUALIZAR LUMI
echo ════════════════════════════════════════════════════════════════
echo.

REM Verificar se estamos na pasta correta
if not exist "package.json" (
    echo ❌ ERRO: Execute este arquivo da pasta C:\Users\Mateus\lumi
    echo.
    pause
    exit /b 1
)

REM Build
echo 📦 Compilando LUMI (npm run build)...
echo.
call npm run build

if errorlevel 1 (
    echo.
    echo ❌ ERRO na compilação!
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ Build concluído!
echo.

REM Abrir pasta dist
echo 📂 Abrindo pasta dist\
start explorer "dist"
timeout /t 2 /nobreak

REM Abrir Hostinger
echo.
echo 🌐 Abrindo Hostinger...
start https://hpanel.hostinger.com/websites/lumiensina.app.br/files/file-manager

echo.
echo ════════════════════════════════════════════════════════════════
echo ✅ PRÓXIMOS PASSOS:
echo ════════════════════════════════════════════════════════════════
echo.
echo 1️⃣  Você verá a pasta 'dist' aberta no Explorador
echo.
echo 2️⃣  Hostinger abrirá no navegador
echo.
echo 3️⃣  SELECIONE TODOS os arquivos em dist:
echo    → Clique dentro da pasta dist
echo    → Pressione: Ctrl+A
echo.
echo 4️⃣  ARRASTE os arquivos para o navegador (pasta /public_html/)
echo    → Ou clique o botão "Upload" do Hostinger
echo.
echo 5️⃣  AGUARDE o upload terminar (2-5 minutos)
echo.
echo 6️⃣  Volte aqui e pressione ENTER quando terminar
echo.
echo ════════════════════════════════════════════════════════════════
echo.
pause

echo.
echo 7️⃣  Limpando cache do navegador...
echo.
echo 💡 Acesse: https://lumiensina.app.br
echo 💡 Ou pressione: Ctrl+Shift+Delete para limpar cache
echo.
echo ════════════════════════════════════════════════════════════════
echo ✅ LUMI ATUALIZADO COM SUCESSO!
echo ════════════════════════════════════════════════════════════════
echo.
pause
