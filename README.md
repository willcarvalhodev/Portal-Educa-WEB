# Portal Escolar - Sistema de Gestão Educacional

Site institucional para apresentação do Portal Escolar, um sistema completo de gestão educacional.

## 🚀 Funcionalidades

- **Home**: Página principal com apresentação do produto
- **Funcionalidades**: Detalhamento de todas as funcionalidades do sistema
- **Sobre**: Informações sobre a empresa, missão, visão e valores
- **Blog**: Artigos e notícias sobre gestão educacional
- **Cotações**: Formulário para solicitação de cotação
- **Login**: Página de acesso ao sistema

## 🛠️ Tecnologias

- HTML5
- CSS3
- JavaScript (Vanilla)

## 📦 Como Usar

**Não é necessário instalar nada!** Este site funciona apenas com HTML, CSS e JavaScript puro.

### Opção 1: Abrir diretamente no navegador
1. Abra o arquivo `index.html` no seu navegador
2. Pronto! O site está funcionando

### Opção 2: Usar um servidor local (recomendado)

#### Com Python:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Com PHP:
```bash
php -S localhost:8000
```

#### Com Node.js (se tiver instalado):
```bash
npx http-server
```

Depois acesse `http://localhost:8000` no navegador.

## 📁 Estrutura do Projeto

```
.
├── index.html              # Página inicial
├── funcionalidades.html    # Página de funcionalidades
├── sobre.html              # Página sobre
├── blog.html               # Página do blog
├── cotacoes.html           # Página de cotações
├── login.html              # Página de login
├── css/
│   └── style.css          # Estilos do site
├── js/
│   └── script.js          # Scripts JavaScript
└── README.md
```

## 🎨 Personalização

Os estilos podem ser personalizados através das variáveis CSS em `css/style.css`:

- `--primary-color`: Cor primária do site
- `--primary-dark`: Cor primária escura
- `--secondary-color`: Cor secundária
- `--text-dark`: Cor do texto escuro
- `--text-light`: Cor do texto claro

## 🚀 Deploy no Netlify

Este site está pronto para ser publicado no Netlify! Veja o arquivo `DEPLOY_NETLIFY.md` para instruções detalhadas.

### Resumo Rápido:
1. Acesse [netlify.com](https://app.netlify.com)
2. Arraste e solte a pasta do projeto
3. Personalize o nome do site
4. Pronto! Seu site estará online

### QR Code:
- O QR code aponta para a URL do seu site
- **Atualizações não quebram o QR code** - a URL permanece a mesma
- Personalize o nome do site ANTES de criar o QR code

## 📝 Próximos Passos

- Implementar autenticação real
- Conectar formulário de cotações a um backend
- Adicionar mais conteúdo ao blog
- Implementar busca no blog
- Adicionar área administrativa

## 🌐 Compatibilidade

O site é compatível com todos os navegadores modernos:
- Chrome
- Firefox
- Safari
- Edge
- Opera

## 📱 Responsivo

O site é totalmente responsivo e funciona perfeitamente em:
- Desktop
- Tablet
- Mobile
