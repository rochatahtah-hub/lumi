@echo off
REM Deploy manual LUMI para Hostinger via SSH/SCP
REM Execute este arquivo para fazer deploy imediato

echo.
echo ======================================
echo  DEPLOY LUMI para Hostinger
echo ======================================
echo.

REM Credenciais
set HOST=89.117.7.178
set PORT=65002
set USER=u159416153.lumiensina.app.br
set PASS=V7!qR2#nL9@xT4$kP8%%z
set REMOTE=/public_html

REM Tentar com pscp (PuTTY SCP) se instalado
pscp -P %PORT% -pw %PASS% -r "dist\*" %USER%@%HOST%:%REMOTE% 2>NUL

if errorlevel 1 (
    echo.
    echo ❌ Deploy via pscp falhou (PuTTY nao instalado ou senha incorreta)
    echo.
    echo Opcoes:
    echo 1. Instalar PuTTY: https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html
    echo 2. Usar cPanel manualmente (abra https://hpanel.hostinger.com, Git Version Control, Pull)
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ Deploy concluido com sucesso!
echo Testando em 5 segundos...
echo.
timeout /t 5 /nobreak

REM Abrir no navegador
start https://lumiensina.app.br/preparacao-prova

pause
