param(
    [string]$FTP_PASS = ""
)

$FTP_HOST = "seashell-hyena-117618.hostingersite.com"
$FTP_USER = "u159416153.lumiensina.app.br"
$REMOTE_DIR = "public_html"
$LOCAL_DIR = "C:\Users\Mateus\lumi\dist"

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "UPLOAD FTP - LUMI para Hostinger" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

if (-not (Test-Path $LOCAL_DIR)) {
    Write-Host "Erro: Pasta dist nao encontrada em $LOCAL_DIR" -ForegroundColor Red
    exit 1
}

if ([string]::IsNullOrEmpty($FTP_PASS)) {
    Write-Host "Erro: Senha FTP nao fornecida" -ForegroundColor Red
    Write-Host "Use: .\upload_ftp_auto.ps1 -FTP_PASS sua_senha_aqui" -ForegroundColor Yellow
    exit 1
}

Write-Host "Conectando ao servidor FTP: $FTP_HOST..." -ForegroundColor Yellow

$FTPUri = "ftp://${FTP_USER}:${FTP_PASS}@${FTP_HOST}/"
$WebClient = New-Object System.Net.WebClient
$WebClient.Credentials = New-Object System.Net.NetworkCredential($FTP_USER, $FTP_PASS)

try {
    Write-Host "Testando conexao FTP..." -ForegroundColor Yellow
    $WebClient.ListDirectory($FTPUri)
    Write-Host "Conexao OK!" -ForegroundColor Green
}
catch {
    Write-Host "ERRO: Nao conseguiu conectar ao servidor FTP" -ForegroundColor Red
    Write-Host "Detalhes: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""

$FilesToUpload = @(Get-ChildItem -Path $LOCAL_DIR -Recurse -File)
$TotalFiles = $FilesToUpload.Count
$UploadedFiles = 0

Write-Host "Iniciando upload de $TotalFiles arquivos..." -ForegroundColor Yellow
Write-Host ""

foreach ($File in $FilesToUpload) {
    $RelativePath = $File.FullName.Replace($LOCAL_DIR + "\", "").Replace("\", "/")
    $RemoteFile = "${FTPUri}${REMOTE_DIR}/${RelativePath}"

    try {
        Write-Host "  Enviando: $RelativePath" -ForegroundColor Green
        $WebClient.UploadFile($RemoteFile, $File.FullName)
        $UploadedFiles++
    }
    catch {
        Write-Host "  ERRO: $RelativePath - $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "============================================================" -ForegroundColor Green
Write-Host "Upload concluido!" -ForegroundColor Green
Write-Host "Total enviado: $UploadedFiles/$TotalFiles arquivos" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Aguarde 1-2 minutos para o servidor processar..." -ForegroundColor Yellow
Write-Host "Acesse: https://lumiensina.app.br" -ForegroundColor Cyan
Write-Host "Recarregue a pagina (Ctrl+F5 para limpiar cache)" -ForegroundColor Cyan
