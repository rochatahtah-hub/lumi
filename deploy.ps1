#!/usr/bin/env pwsh
# 🚀 LUMI Deploy — Build + Git + FTP em 1 comando

param([string]$msg = "auto-deploy: atualizando")

npm run build 2>&1 | grep -E "built|success" > $null
git add -A && git commit -m $msg --quiet && git push origin master --quiet

$ftp = @"
open 89.117.7.178
u159416153.lumiensina.app.br
V7!qN4#zR8@pL2`$xM6&k
cd public_html
binary
mput dist\*
quit
"@

$ftp | Out-File -Encoding ASCII "ftp_cmd.txt" -Force
ftp.exe -i -s:ftp_cmd.txt 2>&1 | Select-String "226|150" | Out-Null
Remove-Item "ftp_cmd.txt" -Force

Write-Host "✅ https://lumiensina.app.br" -ForegroundColor Green
