# 🚀 Guia de Deploy do Backend

Este guia explica como fazer o deploy do backend da API do Gemini.

## 📋 Pré-requisitos

- Conta no GitHub
- Conta em um serviço de hospedagem (Render, Railway, Heroku, etc.)
- API Key do Google Gemini

## 🌐 Opção 1: Render (Recomendado - Grátis)

### Passo 1: Preparar o Repositório
1. Certifique-se de que os arquivos do backend estão na pasta `api/`
2. Faça commit e push para o GitHub

### Passo 2: Criar Serviço no Render
1. Acesse [render.com](https://render.com)
2. Faça login com GitHub
3. Clique em "New +" → "Web Service"
4. Conecte seu repositório
5. Configure:
   - **Name:** `portal-educa-api`
   - **Root Directory:** `api`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
6. Adicione a variável de ambiente:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** Sua chave da API do Gemini
7. Clique em "Create Web Service"

### Passo 3: Atualizar Frontend
1. Copie a URL do serviço (ex: `https://portal-educa-api.onrender.com`)
2. Atualize o arquivo `assets/js/demo-cliente.js`:
   ```javascript
   const API_URL = 'https://portal-educa-api.onrender.com/api/gemini';
   ```
3. Atualize o arquivo `assets/js/chatbot.js`:
   ```javascript
   const API_URL = 'https://portal-educa-api.onrender.com/api/gemini';
   ```

## 🚂 Opção 2: Railway

1. Acesse [railway.app](https://railway.app)
2. Faça login com GitHub
3. Clique em "New Project" → "Deploy from GitHub repo"
4. Selecione seu repositório
5. Configure:
   - **Root Directory:** `api`
   - **Start Command:** `node server.js`
6. Adicione a variável `GEMINI_API_KEY` nas configurações
7. Railway gerará uma URL automaticamente

## 🟣 Opção 3: Heroku

1. Instale o [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. No terminal, dentro da pasta `api/`:
   ```bash
   heroku create portal-educa-api
   heroku config:set GEMINI_API_KEY=sua_chave_aqui
   git push heroku main
   ```

## 🔧 Opção 4: Vercel (Serverless Functions)

1. Instale Vercel CLI:
   ```bash
   npm i -g vercel
   ```
2. Na raiz do projeto:
   ```bash
   vercel
   ```
3. Configure a variável `GEMINI_API_KEY` no dashboard da Vercel

## ✅ Verificar se está funcionando

1. Acesse: `https://seu-backend.com/api/health`
2. Deve retornar: `{"status":"ok","timestamp":"..."}`

## 🔒 Segurança

- ✅ API Key protegida no servidor
- ✅ Validação de nicho (apenas programação)
- ✅ CORS configurado
- ⚠️ Para produção, considere adicionar:
  - Rate limiting
  - Autenticação
  - Logging de requisições

## 🐛 Troubleshooting

### Backend não responde
- Verifique se o serviço está rodando
- Verifique os logs do serviço
- Teste a rota `/api/health`

### Erro de CORS
- Verifique se o CORS está habilitado no backend
- Verifique se a URL do frontend está correta

### Erro 500
- Verifique se a variável `GEMINI_API_KEY` está configurada
- Verifique os logs do servidor

