# LUMI Deploy Script - Automático para Hostinger
# Uso: .\deploy.ps1

Write-Host ""
Write-Host "🚀 LUMI Deploy - Hostinger"
Write-Host "=================================="
Write-Host ""

# 1. Build
Write-Host "📦 Compilando LUMI (npm run build)..."
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro na compilação!"
    exit 1
}

Write-Host "✅ Build concluído!"
Write-Host ""

# 2. Criar ZIP
Write-Host "📦 Criando ZIP..."
if (Test-Path "dist-update.zip") {
    Remove-Item "dist-update.zip" -Force
}
Compress-Archive -Path "dist\*" -DestinationPath "dist-update.zip" -Force
Write-Host "✅ ZIP criado: dist-update.zip ($(((Get-Item dist-update.zip).Length / 1MB).ToString('F2')) MB)"
Write-Host ""

# 3. Abrir pasta dist
Write-Host "📂 Abrindo pasta dist..."
Start-Process explorer "dist"
Start-Sleep -Seconds 2

# 4. Abrir Hostinger
Write-Host "🌐 Abrindo Hostinger..."
Start-Process "https://hpanel.hostinger.com/websites/lumiensina.app.br/files/file-manager"

Write-Host ""
Write-Host "=================================="
Write-Host "✅ PRÓXIMOS PASSOS:"
Write-Host "=================================="
Write-Host ""
Write-Host "1️⃣  Você verá a pasta 'dist' aberta"
Write-Host "2️⃣  Hostinger abrirá no navegador"
Write-Host "3️⃣  Selecione TODOS os arquivos em dist (Ctrl+A)"
Write-Host "4️⃣  Arraste para /public_html/ no Hostinger"
Write-Host "5️⃣  Ou clique 'Upload' e selecione dist-update.zip"
Write-Host "6️⃣  Aguarde o upload terminar"
Write-Host "7️⃣  Limpe cache do navegador (Ctrl+Shift+Delete)"
Write-Host "8️⃣  Acesse: https://lumiensina.app.br"
Write-Host ""
Write-Host "⏱️  Tempo total: ~2-3 minutos"
Write-Host ""
pause
