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
    exit 1
}

Write-Host "Conectando ao servidor FTP: $FTP_HOST..." -ForegroundColor Yellow

$FilesToUpload = @(Get-ChildItem -Path $LOCAL_DIR -Recurse -File)
$TotalFiles = $FilesToUpload.Count
$UploadedFiles = 0

Write-Host "Enviando $TotalFiles arquivos..." -ForegroundColor Yellow
Write-Host ""

foreach ($File in $FilesToUpload) {
    $RelativePath = $File.FullName.Replace($LOCAL_DIR + "\", "").Replace("\", "/")
    $FtpUri = "ftp://${FTP_HOST}/${REMOTE_DIR}/${RelativePath}"

    try {
        Write-Host "  OK $RelativePath" -ForegroundColor Green

        $FtpRequest = [System.Net.FtpWebRequest]::Create($FtpUri)
        $FtpRequest.Credentials = New-Object System.Net.NetworkCredential($FTP_USER, $FTP_PASS)
        $FtpRequest.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
        $FtpRequest.UseBinary = $true
        $FtpRequest.KeepAlive = $false

        $FileStream = [System.IO.File]::OpenRead($File.FullName)
        $UploadStream = $FtpRequest.GetRequestStream()
        $FileStream.CopyTo($UploadStream)
        $UploadStream.Close()
        $FileStream.Close()

        $Response = $FtpRequest.GetResponse()
        $Response.Close()

        $UploadedFiles++
    }
    catch {
        Write-Host "  ERRO $RelativePath - $_" -ForegroundColor Red
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
Write-Host "Recarregue (Ctrl+F5 para limpar cache)" -ForegroundColor Cyan
