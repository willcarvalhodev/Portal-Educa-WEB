# 🚀 Guia de Deploy - Portal Educa Next.js

## Opção 1: Vercel (Recomendado - Mais Fácil)

### Passos:

1. **Criar conta na Vercel**
   - Acesse: https://vercel.com
   - Faça login com sua conta GitHub

2. **Conectar Repositório**
   - Clique em "Add New Project"
   - Selecione o repositório `Portal-Educa-WEB`
   - Configure:
     - **Framework Preset:** Next.js (detecta automaticamente)
     - **Root Directory:** `nextjs`
     - **Build Command:** `npm run build` (ou deixe padrão)
     - **Output Directory:** `.next` (ou deixe padrão)

3. **Variáveis de Ambiente**
   - Se você tiver variáveis de ambiente, adicione aqui
   - Para este projeto, não é necessário

4. **Deploy**
   - Clique em "Deploy"
   - Aguarde 2-3 minutos
   - Pronto! Seu site está no ar!

5. **Configurações Automáticas**
   - A Vercel detecta automaticamente o Next.js
   - Cada push para `main` faz deploy automático
   - Você recebe uma URL única: `portal-educa-nextjs.vercel.app`

## Opção 2: Netlify

### Passos:

1. **Criar conta na Netlify**
   - Acesse: https://netlify.com
   - Faça login com sua conta GitHub

2. **Conectar Repositório**
   - Clique em "Add new site" > "Import an existing project"
   - Conecte ao repositório `Portal-Educa-WEB`
   - Configure:
     - **Base directory:** `nextjs`
     - **Build command:** `npm run build`
     - **Publish directory:** `.next`

3. **Deploy**
   - Clique em "Deploy site"
   - Aguarde o build completar
   - Pronto!

## Opção 3: Build Manual e GitHub Pages (Mais Complexo)

Se preferir continuar usando GitHub Pages:

1. **Instalar dependências:**
   ```bash
   cd nextjs
   npm install
   ```

2. **Gerar build estático:**
   ```bash
   npm run build
   ```

3. **Exportar como HTML estático:**
   - Configure `next.config.js` para export estático
   - Execute: `npm run export`
   - Copie os arquivos da pasta `out/` para a raiz do projeto

**Nota:** GitHub Pages não suporta Server-Side Rendering. Você precisará usar export estático.

## 🌐 Domínio Personalizado

### Na Vercel:
1. Vá em Settings > Domains
2. Adicione seu domínio personalizado
3. Configure os DNS conforme instruções

### Na Netlify:
1. Vá em Site settings > Domain management
2. Adicione custom domain
3. Configure os DNS

## 📊 Monitoramento

Ambas plataformas oferecem:
- ✅ Analytics básico
- ✅ Logs de erro
- ✅ Performance insights
- ✅ Deploy previews (testar antes de publicar)

## ⚡ Vantagens do Deploy na Vercel/Netlify

- **SSR completo** (Server-Side Rendering)
- **CDN global** (carregamento rápido em qualquer lugar)
- **HTTPS automático**
- **Deploy automático** a cada push
- **Preview de PRs** (testar antes de fazer merge)
- **Sem configuração complexa**

## 🔄 Atualizações Futuras

Após o primeiro deploy, qualquer push para o repositório GitHub fará deploy automático. Simples assim!

