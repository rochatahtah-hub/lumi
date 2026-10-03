# Script PowerShell para Deploy SFTP no Hostinger
# ============================================

# Credenciais
$HOST = "89.117.7.178"
$PORT = 65002
$USER = "u159416153.lumiensina.app.br"
$PASS = "V7!qR2#nL9@xT4$kP8%z"
$LOCAL_PATH = "C:\Users\Mateus\lumi\dist"
$REMOTE_PATH = "/public_html"

Write-Host "🚀 Deploy SFTP - LUMI" -ForegroundColor Green
Write-Host "======================" -ForegroundColor Green
Write-Host ""
Write-Host "Host: $HOST"
Write-Host "Port: $PORT"
Write-Host "User: $USER"
Write-Host "Local: $LOCAL_PATH"
Write-Host "Remote: $REMOTE_PATH"
Write-Host ""

# Verificar se WinSCP está instalado
$WinSCPPath = "C:\Program Files (x86)\WinSCP\WinSCPnet.dll"

if (-not (Test-Path $WinSCPPath)) {
    Write-Host "⚠️  WinSCP não encontrado em: $WinSCPPath" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Opções:" -ForegroundColor Cyan
    Write-Host "1. Instalar WinSCP: https://winscp.net/eng/download.php"
    Write-Host "2. Usar lftp (se instalado): lftp -u user@host"
    Write-Host "3. Usar cPanel hPanel manualmente (recomendado)"
    exit 1
}

try {
    # Carregar WinSCP
    Add-Type -Path $WinSCPPath

    # Configurar sessão
    $sessionOptions = New-Object WinSCP.SessionOptions -Property @{
        Protocol = [WinSCP.Protocol]::Sftp
        HostName = $HOST
        PortNumber = $PORT
        UserName = $USER
        Password = $PASS
    }

    # Criar sessão
    $session = New-Object WinSCP.Session

    Write-Host "🔐 Conectando ao Hostinger..." -ForegroundColor Cyan
    $session.Open($sessionOptions)
    Write-Host "✅ Conectado!" -ForegroundColor Green
    Write-Host ""

    # Navegar para o diretório remoto
    Write-Host "📁 Navegando para $REMOTE_PATH..." -ForegroundColor Cyan
    $session.ListDirectory($REMOTE_PATH) | Out-Null

    # Fazer upload dos arquivos
    Write-Host "📦 Iniciando upload dos arquivos..." -ForegroundColor Cyan
    Write-Host ""

    $transferOptions = New-Object WinSCP.TransferOptions
    $transferOptions.TransferMode = [WinSCP.TransferMode]::Binary

    $transferResult = $session.PutFiles("$LOCAL_PATH\*", $REMOTE_PATH, $false, $transferOptions)

    # Processar resultado
    foreach ($transfer in $transferResult.Transfers) {
        Write-Host "✓ $(Split-Path $transfer.FileName -Leaf)" -ForegroundColor Green
    }

    Write-Host ""
    Write-Host "✅ Upload concluído!" -ForegroundColor Green
    Write-Host "Total de arquivos: $($transferResult.Transfers.Count)" -ForegroundColor Green

    # Verificar
    Write-Host ""
    Write-Host "📋 Listando arquivos em $REMOTE_PATH:" -ForegroundColor Cyan
    $fileList = $session.ListDirectory($REMOTE_PATH)
    foreach ($file in $fileList.Files | Select-Object -First 10) {
        Write-Host "  - $($file.Name)" -ForegroundColor Gray
    }

    if ($fileList.Files.Count -gt 10) {
        Write-Host "  ... e mais $($fileList.Files.Count - 10) arquivos" -ForegroundColor Gray
    }

    # Fechar sessão
    $session.Close()

    Write-Host ""
    Write-Host "✅ Conexão fechada!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎉 Deploy concluído com sucesso!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Próximo passo: Testar no navegador" -ForegroundColor Cyan
    Write-Host "https://lumiensina.app.br/preparacao-prova" -ForegroundColor Cyan

} catch {
    Write-Host "❌ Erro: $_" -ForegroundColor Red
    exit 1
}
