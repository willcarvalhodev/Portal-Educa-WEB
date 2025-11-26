Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Atualizando Next.js e Dependências" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Parando servidor se estiver rodando..." -ForegroundColor Yellow
Stop-Process -Name node -ErrorAction SilentlyContinue -Force
Start-Sleep -Seconds 2

Write-Host ""
Write-Host "Atualizando dependências..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "ERRO na atualização das dependências!" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Atualização concluída com sucesso!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Iniciando servidor..." -ForegroundColor Yellow
Write-Host ""

npm run dev

