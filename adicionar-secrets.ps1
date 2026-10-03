# Script para adicionar GitHub Secrets automaticamente
# Execute: .\adicionar-secrets.ps1

Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  GitHub Secrets Setup - LUMI v3.1" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Valores de Supabase (já extraídos de .env.local)
$supabaseUrl = "https://khmozcolgdpkvlgctqgk.supabase.co"
$supabaseKey = "sb_publishable_WVYBWyB9pYKbqxnqY2cATQ_DeUIyLT8"

Write-Host "Valores ja preenchidos:" -ForegroundColor Green
Write-Host "   VITE_SUPABASE_URL: $supabaseUrl"
Write-Host "   VITE_SUPABASE_ANON_KEY: $supabaseKey"
Write-Host ""

Write-Host "Agora preciso de valores Hostinger:" -ForegroundColor Yellow
Write-Host ""

# Pedir valores de Hostinger
$server = Read-Host "   1. Server/Host SFTP (ex: ftp.seu-site.com)"
$username = Read-Host "   2. Username SFTP"
$password = Read-Host "   3. Password SFTP" -AsSecureString
$passwordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($password))

$deployPath = Read-Host "   4. Deploy Path (padrao: /public_html)"
if ([string]::IsNullOrWhiteSpace($deployPath)) { $deployPath = "/public_html" }

$domain = Read-Host "   5. Domain (padrao: lumiensina.app.br)"
if ([string]::IsNullOrWhiteSpace($domain)) { $domain = "lumiensina.app.br" }

Write-Host ""
Write-Host "Adicionando 7 secrets no GitHub..." -ForegroundColor Green
Write-Host ""

# Adicionar secrets via GitHub CLI
try {
    gh secret set HOSTINGER_SERVER --body $server --repo rochatahtah-hub/lumi
    Write-Host "   OK - HOSTINGER_SERVER" -ForegroundColor Green

    gh secret set HOSTINGER_USERNAME --body $username --repo rochatahtah-hub/lumi
    Write-Host "   OK - HOSTINGER_USERNAME" -ForegroundColor Green

    gh secret set HOSTINGER_PASSWORD --body $passwordPlain --repo rochatahtah-hub/lumi
    Write-Host "   OK - HOSTINGER_PASSWORD" -ForegroundColor Green

    gh secret set HOSTINGER_DEPLOY_PATH --body $deployPath --repo rochatahtah-hub/lumi
    Write-Host "   OK - HOSTINGER_DEPLOY_PATH" -ForegroundColor Green

    gh secret set HOSTINGER_DOMAIN --body $domain --repo rochatahtah-hub/lumi
    Write-Host "   OK - HOSTINGER_DOMAIN" -ForegroundColor Green

    gh secret set VITE_SUPABASE_URL --body $supabaseUrl --repo rochatahtah-hub/lumi
    Write-Host "   OK - VITE_SUPABASE_URL" -ForegroundColor Green

    gh secret set VITE_SUPABASE_ANON_KEY --body $supabaseKey --repo rochatahtah-hub/lumi
    Write-Host "   OK - VITE_SUPABASE_ANON_KEY" -ForegroundColor Green

    Write-Host ""
    Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Green
    Write-Host "TODOS OS 7 SECRETS ADICIONADOS COM SUCESSO!" -ForegroundColor Green
    Write-Host "════════════════════════════════════════════════════════" -ForegroundColor Green
    Write-Host ""
    Write-Host "Deploy automatico esta 100% funcional!" -ForegroundColor Cyan

} catch {
    Write-Host "ERRO ao adicionar secrets:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}
