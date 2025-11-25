@echo off
echo ========================================
echo Conectando projeto ao GitHub
echo ========================================
echo.

echo [1/4] Inicializando repositorio Git...
git init
if %errorlevel% neq 0 (
    echo ERRO: Nao foi possivel inicializar o Git
    pause
    exit /b 1
)

echo.
echo [2/4] Adicionando arquivos...
git add .
if %errorlevel% neq 0 (
    echo ERRO: Nao foi possivel adicionar arquivos
    pause
    exit /b 1
)

echo.
echo [3/4] Fazendo primeiro commit...
git commit -m "Primeiro commit - Site Portal Escolar"
if %errorlevel% neq 0 (
    echo ERRO: Nao foi possivel fazer commit
    pause
    exit /b 1
)

echo.
echo [4/4] Conectando ao GitHub...
git remote add origin https://github.com/willcarvalhodev/Portal-Educa-WEB.git
if %errorlevel% neq 0 (
    echo AVISO: O remote pode ja existir. Continuando...
    git remote set-url origin https://github.com/willcarvalhodev/Portal-Educa-WEB.git
)

echo.
echo [5/5] Configurando branch main...
git branch -M main

echo.
echo ========================================
echo Configuracao concluida!
echo ========================================
echo.
echo PROXIMO PASSO:
echo Execute: git push -u origin main
echo.
echo Se pedir autenticacao, use um Personal Access Token do GitHub
echo.
pause

