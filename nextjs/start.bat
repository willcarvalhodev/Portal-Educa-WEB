@echo off
echo ========================================
echo Portal Educa - Next.js
echo ========================================
echo.

echo Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: Node.js nao encontrado!
    echo Por favor, instale o Node.js de https://nodejs.org/
    echo Ou reinicie o terminal apos a instalacao.
    pause
    exit /b 1
)

echo Node.js encontrado!
node --version
echo.

echo Verificando dependencias...
if not exist "node_modules\" (
    echo Instalando dependencias... Isso pode levar alguns minutos.
    call npm install
    if %errorlevel% neq 0 (
        echo ERRO na instalacao das dependencias!
        pause
        exit /b 1
    )
)

echo.
echo Iniciando servidor de desenvolvimento...
echo.
echo O site estara disponivel em: http://localhost:3000
echo.
echo Pressione Ctrl+C para parar o servidor.
echo.

call npm run dev

