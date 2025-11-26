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

### Render
1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente
3. Deploy automático!

### Railway
1. Conecte seu repositório
2. Adicione a variável `GEMINI_API_KEY`
3. Deploy!

### Heroku
```bash
heroku create portal-educa-api
heroku config:set GEMINI_API_KEY=sua_chave
git push heroku main
```

## 🔒 Segurança

- API Key protegida no servidor
- Validação de nicho (apenas programação)
- CORS configurado
- Rate limiting recomendado para produção

