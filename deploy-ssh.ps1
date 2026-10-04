$hostname = "89.117.7.178"
$port = "65002"
$username = "u159416153.lumiensina.app.br"
$remote = "/public_html"
$local = "dist"

scp -P $port -r "${local}/*" "${username}@${hostname}:${remote}/" 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "OK" -ForegroundColor Green
    Start-Process "https://lumiensina.app.br"
} else {
    Write-Host "Falhou. Use cPanel." -ForegroundColor Red
}
