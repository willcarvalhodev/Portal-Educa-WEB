# Portal Educa - API Backend

Backend para integração segura com Google Gemini API.

## 🚀 Instalação

```bash
npm install
```

## ⚙️ Configuração

1. Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

2. Configure sua API Key do Gemini no arquivo `.env`:
```
GEMINI_API_KEY=sua_chave_aqui
```

## 🏃 Executar

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

## 📡 Endpoints

### POST `/api/gemini`
Envia uma mensagem para o Gemini AI.

**Request:**
```json
{
  "mensagem": "O que é backend?"
}
```

**Response:**
```json
{
  "resposta": "Backend é a parte do servidor..."
}
```

### GET `/api/health`
Verifica se a API está funcionando.

## 🌐 Deploy

### Render (Recomendado - Mais Fácil)

**Opção 1: Usando render.yaml (Automático)**
1. Acesse [render.com](https://render.com)
2. Login com GitHub
3. "New +" → "Blueprint"
4. Selecione o repositório `willcarvalhodev/Portal-Educa-WEB`
5. Render detectará automaticamente o `api/render.yaml`
6. Clique em "Apply"
7. ✅ Deploy automático!

**Opção 2: Manual**
1. Acesse [render.com](https://render.com)
2. "New +" → "Web Service"
3. Conecte o repositório
4. Configure:
   - Name: `portal-educa-api`
   - Root Directory: `api`
   - Build Command: `npm install`
   - Start Command: `node server.js`
5. Adicione variável: `GEMINI_API_KEY = AIzaSyCqENZk9QG7d_S4I77kYgmHZbOXeNe0X-k`
6. "Create Web Service"

### Railway
1. Acesse [railway.app](https://railway.app)
2. Login com GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Selecione: `willcarvalhodev/Portal-Educa-WEB`
5. Configure Root Directory: `api`
6. Adicione variável: `GEMINI_API_KEY = AIzaSyCqENZk9QG7d_S4I77kYgmHZbOXeNe0X-k`
7. Deploy automático!

### Heroku
```bash
heroku create portal-educa-api
heroku config:set GEMINI_API_KEY=AIzaSyCqENZk9QG7d_S4I77kYgmHZbOXeNe0X-k
git push heroku main
```

## 🔒 Segurança

- API Key protegida no servidor
- Validação de nicho (apenas programação)
- CORS configurado
- Rate limiting recomendado para produção

