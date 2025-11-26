# 🌐 Como Acessar o Site Portal Educa

## 🏠 Acesso Local (Desenvolvimento)

### Se o servidor já está rodando:

1. **Abra seu navegador** (Chrome, Firefox, Edge, etc.)
2. **Digite na barra de endereço:**
   ```
   http://localhost:3000
   ```
3. **Pressione Enter**

### Se o servidor NÃO está rodando:

**Opção 1: Script Automático (Mais Fácil)**
- Dê **duplo clique** no arquivo `start.bat` na pasta `nextjs/`
- Aguarde alguns segundos
- O navegador abrirá automaticamente

**Opção 2: Terminal Manual**

1. Abra o terminal no Cursor
2. Execute:
   ```bash
   cd nextjs
   npm run dev
   ```
3. Aguarde ver a mensagem: `✓ Ready in Xms`
4. Abra o navegador em: `http://localhost:3000`

---

## 📱 Páginas Disponíveis

Quando acessar `http://localhost:3000`, você verá:

### Página Principal (Escolha de Versão)
- **URL:** `http://localhost:3000/`
- Mostra as duas opções: Versão Básica e Versão Moderna

### Versão Básica
- **URL:** `http://localhost:3000/basic`
- Design simples e funcional

### Versão Moderna
- **URL:** `http://localhost:3000/modern`
- Design com animações e efeitos visuais

---

## 🌍 Acesso Público (Deploy)

Para disponibilizar o site para outras pessoas acessarem pela internet:

### Opção 1: Vercel (Recomendado - Gratuito)

1. Acesse: https://vercel.com
2. Faça login com GitHub
3. Clique em "Add New Project"
4. Selecione o repositório `Portal-Educa-WEB`
5. Configure:
   - **Root Directory:** `nextjs`
   - Framework: Next.js (detecta automaticamente)
6. Clique em "Deploy"
7. Aguarde 2-3 minutos
8. Seu site estará em: `portal-educa-nextjs.vercel.app`

### Opção 2: Netlify

1. Acesse: https://netlify.com
2. Faça login com GitHub
3. Clique em "Add new site" > "Import an existing project"
4. Selecione o repositório
5. Configure:
   - **Base directory:** `nextjs`
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
6. Clique em "Deploy site"
7. Seu site estará em: `portal-educa-nextjs.netlify.app`

---

## 🔍 Verificar se o Servidor Está Rodando

No terminal, você verá:

```
✓ Ready in 1567ms
  ○ Local:        http://localhost:3000
```

Se você ver essa mensagem, o servidor está funcionando!

---

## ⚠️ Problemas Comuns

### "Site não pode ser acessado"

**Solução:** O servidor não está rodando
1. Vá ao terminal
2. Execute: `cd nextjs` e depois `npm run dev`
3. Aguarde a mensagem "Ready"

### "Erro 404"

**Solução:** Verifique se está acessando a URL correta
- Página inicial: `http://localhost:3000/`
- Versão básica: `http://localhost:3000/basic`
- Versão moderna: `http://localhost:3000/modern`

### Porta 3000 já está em uso

**Solução:** Use outra porta
```bash
npm run dev -- -p 3001
```
Depois acesse: `http://localhost:3001`

---

## 📝 Resumo Rápido

**Acesso Local:**
- URL: `http://localhost:3000`
- Apenas no seu computador

**Acesso Público:**
- Fazer deploy na Vercel/Netlify
- Site acessível de qualquer lugar
- URL personalizada (ex: `portal-educa.vercel.app`)

---

**🚀 Pronto para começar!**

