# 🚀 Deploy Automático - Portal Educa API

## ⚡ Deploy Rápido no Render (Recomendado)

### Opção 1: Usando render.yaml (Mais Fácil)

1. **Acesse Render:**
   - Vá para [render.com](https://render.com)
   - Faça login com sua conta GitHub

2. **Conecte o Repositório:**
   - Clique em "New +" → "Blueprint"
   - Selecione seu repositório: `willcarvalhodev/Portal-Educa-WEB`
   - Render detectará automaticamente o arquivo `api/render.yaml`
   - Clique em "Apply"

3. **Pronto!** O Render criará o serviço automaticamente com todas as configurações.

### Opção 2: Deploy Manual (Passo a Passo)

1. **Acesse Render:**
   - Vá para [render.com](https://render.com)
   - Faça login com GitHub

2. **Criar Novo Serviço:**
   - Clique em "New +" → "Web Service"
   - Conecte seu repositório: `willcarvalhodev/Portal-Educa-WEB`

3. **Configurações:**
   ```
   Name: portal-educa-api
   Region: (escolha o mais próximo)
   Branch: main
   Root Directory: api
   Environment: Node
   Build Command: npm install
   Start Command: node server.js
   ```

4. **Variáveis de Ambiente:**
   - Clique em "Advanced" → "Add Environment Variable"
   - Adicione:
     ```
     Key: GEMINI_API_KEY
     Value: AIzaSyCqENZk9QG7d_S4I77kYgmHZbOXeNe0X-k
     ```

5. **Criar Serviço:**
   - Clique em "Create Web Service"
   - Aguarde o deploy (2-5 minutos)

6. **Copiar URL:**
   - Após o deploy, copie a URL (ex: `https://portal-educa-api.onrender.com`)
   - Esta URL será usada no frontend

## 🔍 Verificar se Funcionou

1. **Health Check:**
   - Acesse: `https://seu-servico.onrender.com/api/health`
   - Deve retornar: `{"status":"ok","timestamp":"..."}`

2. **Testar API:**
   - Use Postman ou curl:
   ```bash
   curl -X POST https://seu-servico.onrender.com/api/gemini \
     -H "Content-Type: application/json" \
     -d '{"mensagem":"O que é JavaScript?"}'
   ```

## 🔄 Atualizar Frontend (Se necessário)

Se a URL do seu serviço for diferente de `https://portal-educa-api.onrender.com`, atualize:

1. **Arquivo:** `assets/js/demo-cliente.js`
   - Linha ~1783: `const API_URL = 'https://SUA-URL.onrender.com/api/gemini';`

2. **Arquivo:** `assets/js/chatbot.js`
   - Linha ~134: `const API_URL = 'https://SUA-URL.onrender.com/api/gemini';`

3. **Commit e Push:**
   ```bash
   git add assets/js/demo-cliente.js assets/js/chatbot.js
   git commit -m "Atualizar URL do backend"
   git push origin main
   ```

## 🚂 Alternativa: Railway

1. Acesse [railway.app](https://railway.app)
2. Login com GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Selecione: `willcarvalhodev/Portal-Educa-WEB`
5. Configure:
   - Root Directory: `api`
   - Start Command: `node server.js`
6. Adicione variável: `GEMINI_API_KEY = AIzaSyCqENZk9QG7d_S4I77kYgmHZbOXeNe0X-k`
7. Deploy automático!

## ✅ Checklist de Deploy

- [ ] Backend deployado no Render/Railway
- [ ] Variável `GEMINI_API_KEY` configurada
- [ ] Health check retorna `{"status":"ok"}`
- [ ] URL do backend atualizada no frontend (se necessário)
- [ ] Frontend testado e funcionando

## 🐛 Troubleshooting

### Serviço não inicia
- Verifique os logs no Render/Railway
- Confirme que `GEMINI_API_KEY` está configurada
- Verifique se `node server.js` está correto

### Erro 500
- Verifique se a API key está correta
- Confira os logs do servidor
- Teste a rota `/api/health`

### CORS Error
- O backend já tem CORS configurado
- Se persistir, verifique a URL do frontend

## 📞 Suporte

Se tiver problemas, verifique:
1. Logs do serviço no Render/Railway
2. Console do navegador (F12)
3. Network tab para ver requisições

