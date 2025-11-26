@echo off
echo ========================================
echo Atualizando Next.js e Dependencias
echo ========================================
echo.

echo Parando servidor se estiver rodando...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 >nul

echo.
echo Atualizando dependencias...
call npm install

if %errorlevel% neq 0 (
    echo.
    echo ERRO na atualizacao das dependencias!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Atualizacao concluida com sucesso!
echo ========================================
echo.
echo Iniciando servidor...
echo.

call npm run dev

