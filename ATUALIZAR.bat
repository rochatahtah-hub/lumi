@echo off
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "ATUALIZAR.ps1"
pause
