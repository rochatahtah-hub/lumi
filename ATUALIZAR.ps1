# LUMI Update - PowerShell
Write-Host "🚀 ATUALIZAR LUMI" -ForegroundColor Green
Write-Host ""

# Build
Write-Host "📦 Compilando..."
npm run build

# Verificar se compilou
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro no build!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build OK!" -ForegroundColor Green
Write-Host ""

# Caminhos
$distPath = "C:\Users\Mateus\lumi\dist"
$hostingerUrl = "https://hpanel.hostinger.com/websites/lumiensina.app.br/files/file-manager"

# Abrir dist no Explorer
Write-Host "📂 Abrindo pasta dist..."
explorer.exe $distPath
Start-Sleep -Milliseconds 500

# Abrir Hostinger
Write-Host "🌐 Abrindo Hostinger..."
Start-Process $hostingerUrl

Write-Host ""
Write-Host "════════════════════════════════════════════"
Write-Host "✅ TUDO PRONTO!" -ForegroundColor Green
Write-Host "════════════════════════════════════════════"
Write-Host ""
Write-Host "📂 Pasta aberta: $distPath"
Write-Host "🌐 Browser aberto: Hostinger"
Write-Host ""
Write-Host "⚡ Próximos passos:"
Write-Host "   1. Ctrl+A (selecionar tudo)"
Write-Host "   2. Arraste para /public_html/"
Write-Host "   3. Aguarde (2-5 min)"
Write-Host "   4. https://lumiensina.app.br"
Write-Host ""
