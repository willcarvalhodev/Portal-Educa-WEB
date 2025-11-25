# 🚀 Comandos para Conectar ao GitHub

## Opção 1: Usar o Script Automático (Windows)

1. **Clique duas vezes** no arquivo `conectar-github.bat`
2. O script fará tudo automaticamente
3. Depois execute: `git push -u origin main`

## Opção 2: Executar Comandos Manualmente

Abra o terminal (PowerShell ou CMD) na pasta do projeto e execute:

### Passo 1: Inicializar Git
```bash
git init
```

### Passo 2: Adicionar arquivos
```bash
git add .
```

### Passo 3: Fazer primeiro commit
```bash
git commit -m "Primeiro commit - Site Portal Escolar"
```

### Passo 4: Conectar ao GitHub
```bash
git remote add origin https://github.com/willcarvalhodev/Portal-Educa-WEB.git
```

### Passo 5: Configurar branch
```bash
git branch -M main
```

### Passo 6: Enviar para o GitHub
```bash
git push -u origin main
```

## 🔐 Autenticação no GitHub

Se pedir usuário e senha ao fazer push:

1. **NÃO use sua senha do GitHub**
2. Use um **Personal Access Token**:
   - Vá em: GitHub > Settings > Developer settings > Personal access tokens > Tokens (classic)
   - Clique em "Generate new token"
   - Dê um nome (ex: "Netlify Deploy")
   - Marque a opção `repo` (todas as permissões de repositório)
   - Clique em "Generate token"
   - **COPIE O TOKEN** (você não verá ele novamente!)
   - Use o token como senha ao fazer push

## ✅ Verificar se Funcionou

Depois do push, acesse:
https://github.com/willcarvalhodev/Portal-Educa-WEB

Você deve ver todos os arquivos do projeto lá!

## 🔄 Próximos Passos

Depois de enviar para o GitHub, conecte ao Netlify:

1. Acesse [app.netlify.com](https://app.netlify.com)
2. Clique em "Add new site" > "Import an existing project"
3. Escolha "Deploy with GitHub"
4. Selecione o repositório `willcarvalhodev/Portal-Educa-WEB`
5. Deixe "Build command" vazio
6. Publish directory: `.` (ponto)
7. Clique em "Deploy site"

Veja o arquivo `GIT_SETUP.md` para mais detalhes!

