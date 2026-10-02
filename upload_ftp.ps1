$FTP_HOST = "seashell-hyena-117618.hostingersite.com"
$FTP_USER = "u159416153.lumiensina.app.br"
$FTP_PASS = Read-Host "Digite a senha FTP"
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

Write-Host "Conectando ao servidor FTP: $FTP_HOST..." -ForegroundColor Yellow

$FTPUri = "ftp://${FTP_USER}:${FTP_PASS}@${FTP_HOST}/"
$WebClient = New-Object System.Net.WebClient
$WebClient.Credentials = New-Object System.Net.NetworkCredential($FTP_USER, $FTP_PASS)

Write-Host "Conexao preparada!" -ForegroundColor Green
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
        Write-Host "  OK Upload: $RelativePath" -ForegroundColor Green
        $WebClient.UploadFile($RemoteFile, $File.FullName)
        $UploadedFiles++
    }
    catch {
        Write-Host "  ERRO ao fazer upload de $RelativePath : $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Upload concluido!" -ForegroundColor Green
Write-Host "Total: $UploadedFiles/$TotalFiles arquivos enviados" -ForegroundColor Green
Write-Host ""
Write-Host "Aguarde 1-2 minutos para o servidor processar." -ForegroundColor Yellow
Write-Host "Acesse https://lumiensina.app.br e recarregue a pagina (Ctrl+R)" -ForegroundColor Cyan
