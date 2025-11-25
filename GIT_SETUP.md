# 🔗 Conectar Projeto ao GitHub e Netlify

## Passo 1: Inicializar Git no Projeto

Abra o terminal na pasta do projeto e execute:

```bash
# Inicializar repositório Git
git init

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "Primeiro commit - Site Portal Escolar"
```

## Passo 2: Conectar ao Repositório do GitHub

```bash
# Adicionar o repositório remoto
git remote add origin https://github.com/willcarvalhodev/Portal-Educa-WEB.git

# Verificar se foi adicionado corretamente
git remote -v
```

## Passo 3: Enviar Código para o GitHub

```bash
# Renomear branch para main (se necessário)
git branch -M main

# Enviar código para o GitHub
git push -u origin main
```

Se pedir autenticação:
- Use um **Personal Access Token** do GitHub
- Ou configure SSH (mais seguro)

## Passo 4: Conectar GitHub ao Netlify

1. **Acesse o Netlify:**
   - Vá para [https://app.netlify.com](https://app.netlify.com)
   - Faça login

2. **Importar Projeto:**
   - Clique em **"Add new site"**
   - Escolha **"Import an existing project"**
   - Clique em **"Deploy with GitHub"**
   - Autorize o Netlify a acessar seu GitHub
   - Selecione o repositório: **`willcarvalhodev/Portal-Educa-WEB`**

3. **Configurar Deploy:**
   - **Build command:** (deixe vazio - não precisa build)
   - **Publish directory:** `.` (ponto)
   - Clique em **"Deploy site"**

4. **Personalizar Nome do Site:**
   - Após o deploy, vá em: **Site settings > General > Site details**
   - Clique em **"Change site name"**
   - Escolha um nome (ex: `portal-educa` ou `portal-escolar`)
   - **IMPORTANTE:** Faça isso ANTES de criar o QR code!

## Passo 5: Criar QR Code

1. Copie a URL do seu site no Netlify (ex: `https://portal-educa.netlify.app`)
2. Use um gerador de QR code:
   - [QR Code Generator](https://www.qr-code-generator.com)
   - [QRCode Monkey](https://www.qrcode-monkey.com)
3. Cole a URL e baixe o QR code

## 🔄 Como Atualizar o Site no Futuro

Sempre que fizer alterações:

```bash
# Adicionar arquivos alterados
git add .

# Fazer commit
git commit -m "Descrição da atualização"

# Enviar para o GitHub
git push
```

O Netlify detecta automaticamente e faz o deploy! 🚀

## ✅ Vantagens desta Configuração

- ✅ **QR Code funciona para sempre** - URL não muda
- ✅ **Atualizações automáticas** - Push no GitHub = Deploy no Netlify
- ✅ **Histórico de versões** - Todas as mudanças ficam no GitHub
- ✅ **Backup automático** - Código seguro no GitHub
- ✅ **Colaboração fácil** - Outros podem ajudar no projeto

## 🆘 Solução de Problemas

### Erro: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/willcarvalhodev/Portal-Educa-WEB.git
```

### Erro de autenticação no push
1. Vá em GitHub > Settings > Developer settings > Personal access tokens
2. Crie um novo token com permissão `repo`
3. Use o token como senha ao fazer push

### Verificar status do Git
```bash
git status
```

### Ver commits
```bash
git log --oneline
```

