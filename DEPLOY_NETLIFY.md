# 🚀 Como Fazer Deploy no Netlify

## Passo a Passo para Publicar seu Site

### Método 1: Arrastar e Soltar (Mais Rápido)

1. **Acesse o Netlify:**
   - Vá para [https://app.netlify.com](https://app.netlify.com)
   - Faça login ou crie uma conta gratuita

2. **Faça o Deploy:**
   - Na página inicial, arraste e solte a pasta do seu projeto (ou todos os arquivos)
   - O Netlify fará o upload automaticamente

3. **Configure o Site:**
   - O Netlify gerará uma URL automática (ex: `seu-site-123.netlify.app`)
   - Você pode personalizar o nome em: **Site settings > General > Site details > Change site name**

4. **Pronto!**
   - Seu site estará online e acessível pela URL gerada

### Método 2: Via Git (Recomendado para Atualizações)

1. **Crie um repositório Git:**
   ```bash
   git init
   git add .
   git commit -m "Primeiro commit"
   ```

2. **Envie para GitHub/GitLab/Bitbucket:**
   - Crie um repositório no GitHub
   - Envie seu código:
   ```bash
   git remote add origin https://github.com/seu-usuario/seu-repositorio.git
   git push -u origin main
   ```

3. **Conecte ao Netlify:**
   - No Netlify, clique em **"Add new site" > "Import an existing project"**
   - Conecte com GitHub/GitLab/Bitbucket
   - Selecione seu repositório
   - Configure:
     - **Build command:** (deixe vazio - não precisa)
     - **Publish directory:** `.` (ponto)
   - Clique em **"Deploy site"**

## 📱 Criar QR Code

### Opção 1: Geradores Online Gratuitos

1. **QR Code Generator:**
   - Acesse: [https://www.qr-code-generator.com](https://www.qr-code-generator.com)
   - Cole a URL do seu site no Netlify
   - Baixe o QR code em PNG ou SVG

2. **Outros geradores:**
   - [QRCode Monkey](https://www.qrcode-monkey.com/)
   - [QR Code API](https://goqr.me/)

### Opção 2: Usar API do Netlify

O Netlify não gera QR codes diretamente, mas você pode usar a URL do seu site em qualquer gerador.

## ✅ Garantir que o QR Code Continue Funcionando

### **IMPORTANTE: O QR Code Funcionará Para Sempre!**

O QR code aponta para uma **URL** (ex: `https://seu-site.netlify.app`). Desde que:

1. ✅ Você não mude o nome do site no Netlify
2. ✅ Você não delete o site
3. ✅ Você mantenha a mesma URL

**O QR code continuará funcionando mesmo após atualizações!**

### Como Atualizar o Site Sem Quebrar o QR Code:

#### Se usou Método 1 (Arrastar e Soltar):
- Simplesmente arraste os arquivos atualizados novamente
- A URL permanece a mesma
- O QR code continua funcionando

#### Se usou Método 2 (Git):
- Faça suas alterações nos arquivos
- Commit e push:
  ```bash
  git add .
  git commit -m "Atualização do site"
  git push
  ```
- O Netlify detecta automaticamente e faz o deploy
- A URL permanece a mesma
- O QR code continua funcionando

## 🔒 Dicas Importantes

1. **Personalize o nome do site ANTES de criar o QR code:**
   - Vá em: **Site settings > General > Site details > Change site name**
   - Escolha um nome que você não vai querer mudar
   - Exemplo: `portal-escolar` → URL: `portal-escolar.netlify.app`

2. **Use domínio personalizado (opcional):**
   - Você pode conectar um domínio próprio (ex: `www.portalescolar.com.br`)
   - O Netlify oferece isso gratuitamente
   - Assim, mesmo se mudar de plataforma, o QR code continua funcionando

3. **Backup do QR code:**
   - Salve o QR code em alta resolução
   - Guarde a URL em um lugar seguro
   - Anote o nome do site no Netlify

## 🎯 Resumo

- ✅ **QR Code funciona para sempre** se a URL não mudar
- ✅ **Atualizações não quebram o QR code** - apenas atualizam o conteúdo
- ✅ **Netlify mantém a URL** mesmo após múltiplos deploys
- ✅ **Personalize o nome do site** antes de criar o QR code
- ✅ **Use Git** para facilitar atualizações futuras

## 📞 Suporte

Se tiver dúvidas:
- Documentação Netlify: [https://docs.netlify.com](https://docs.netlify.com)
- Suporte Netlify: [https://www.netlify.com/support](https://www.netlify.com/support)

