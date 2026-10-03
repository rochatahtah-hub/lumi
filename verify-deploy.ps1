# ===== LUMI — Verificação Pré-Deploy (PowerShell) =====
# Use este script para verificar se tudo está pronto antes de fazer push para GitHub

Write-Host "🔍 Verificando LUMI para deploy..." -ForegroundColor Cyan
Write-Host ""

$passed = 0
$failed = 0

function Check-Item {
  param(
    [string]$Condition,
    [string]$Message
  )

  if (Invoke-Expression $Condition) {
    Write-Host "✅ $Message" -ForegroundColor Green
    $global:passed++
  } else {
    Write-Host "❌ $Message" -ForegroundColor Red
    $global:failed++
  }
}

# 1. Verificar Node.js
Check-Item "Get-Command node -ErrorAction SilentlyContinue" "Node.js instalado"

# 2. Verificar npm
Check-Item "Get-Command npm -ErrorAction SilentlyContinue" "npm instalado"

# 3. Verificar node_modules
Check-Item "Test-Path node_modules" "node_modules existe"

# 4. Verificar package.json
Check-Item "Test-Path package.json" "package.json existe"

# 5. Verificar script build
$packageJson = Get-Content package.json -Raw
Check-Item "`$packageJson -match '`"build`"'" "Script 'build' configurado"

# 6. Verificar vite.config.ts
Check-Item "Test-Path vite.config.ts" "vite.config.ts existe"

# 7. Verificar .htaccess
Check-Item "Test-Path .htaccess" ".htaccess existe"

# 8. Verificar .env.production
Check-Item "Test-Path .env.production" ".env.production existe"

# 9. Verificar GitHub workflow
Check-Item "Test-Path .github/workflows/deploy.yml" ".github/workflows/deploy.yml existe"

# 10. Verificar .gitignore contém .env
$gitignore = Get-Content .gitignore -Raw
Check-Item "`$gitignore -match '\.env'" ".env está em .gitignore"

# 11. Verificar src/
Check-Item "Test-Path src" "Pasta src/ existe"

# 12. Verificar public/ ou dist/
$hasDir = (Test-Path public) -or (Test-Path dist)
Check-Item "`$hasDir" "Pasta public/ ou dist/ existe"

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "📊 Resultado: $passed ✅ | $failed ❌" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

if ($failed -eq 0) {
  Write-Host "✨ Tudo pronto para deploy!" -ForegroundColor Green
  Write-Host ""
  Write-Host "Próximos passos:" -ForegroundColor Yellow
  Write-Host "  1. git add ." -ForegroundColor Gray
  Write-Host "  2. git commit -m 'sua mensagem'" -ForegroundColor Gray
  Write-Host "  3. git push origin main" -ForegroundColor Gray
  Write-Host ""
  Write-Host "GitHub Actions fará o build e deploy automaticamente! 🚀" -ForegroundColor Green
  exit 0
} else {
  Write-Host "⚠️  Corrija os erros acima antes de fazer push." -ForegroundColor Red
  exit 1
}
