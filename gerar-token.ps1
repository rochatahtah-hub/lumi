# Script para gerar Personal Access Token do GitHub
# Execute este script: .\gerar-token.ps1

Write-Host "Abrindo GitHub para gerar Personal Access Token..." -ForegroundColor Cyan
Write-Host ""

# URL pre-preenchida com os escopos corretos
$url = "https://github.com/settings/tokens/new?scopes=repo,workflow&description=LUMI%20Deploy%20Token"

Write-Host "A pagina vai abrir em seu navegador" -ForegroundColor Green
Write-Host "Passos:" -ForegroundColor Yellow
Write-Host "   1. Clique 'Generate token' no final da pagina"
Write-Host "   2. COPIE o token (comeca com ghp_)"
Write-Host "   3. Cole o token no prompt do Claude Code"
Write-Host ""

# Abrir no navegador
Start-Process $url

Write-Host "Aguardando..." -ForegroundColor Yellow
