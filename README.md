# 🎓 Portal Educa - Gestão Escolar Inteligente

Site institucional moderno e profissional para apresentação do Portal Educa, uma plataforma completa de gestão educacional alimentada por IA.

## ✨ Características

- **Design Moderno**: Interface limpa e elegante com animações suaves
- **Código Profissional**: Estrutura organizada seguindo boas práticas
- **Padrão BEM**: CSS organizado com metodologia Block Element Modifier
- **Separação de Responsabilidades**: HTML para estrutura, CSS para estilo, JS para comportamento
- **Totalmente Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Performance Otimizada**: Carregamento rápido e animações fluidas
- **Acessibilidade**: HTML semântico e ARIA labels

## 🚀 Tecnologias

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilização moderna com variáveis CSS e padrão BEM
- **JavaScript (Vanilla)**: Código modular e organizado sem dependências
- **GitHub Pages**: Hospedagem gratuita e estática

## 📁 Estrutura do Projeto

```
Portal-Educa-WEB/
├── index.html          # Página principal (HTML semântico)
├── css/
│   └── style.css      # Estilos com padrão BEM
├── js/
│   └── script.js      # JavaScript modular e organizado
├── images/
│   └── icon.ico       # Favicon
└── README.md          # Documentação
```

## 🎨 Padrão BEM (Block Element Modifier)

O projeto utiliza o padrão BEM para nomenclatura CSS:

- **Block**: Componente independente (ex: `.header`, `.hero`, `.footer`)
- **Element**: Parte do bloco (ex: `.header__logo`, `.hero__title`)
- **Modifier**: Variação do bloco ou elemento (ex: `.hero__button--primary`)

### Exemplo:

```css
/* Block */
.header { }

/* Element */
.header__logo { }
.header__nav-link { }

/* Modifier */
.header__nav-link--active { }
.hero__button--primary { }
```

## 📐 Separação de Responsabilidades

### HTML (`index.html`)
- Estrutura semântica
- Meta tags para SEO
- Acessibilidade (ARIA labels)
- Conteúdo e marcação

### CSS (`css/style.css`)
- Visual e apresentação
- Layout e responsividade
- Animações e transições
- Organizado por seções (Reset, Base, Componentes, etc.)

### JavaScript (`js/script.js`)
- Interatividade
- Lógica de navegação
- Animações ao scroll
- Módulos separados por responsabilidade:
  - `NavigationModule`: Navegação e menu mobile
  - `AnimationModule`: Animações ao scroll
  - `UtilsModule`: Utilitários gerais

## 🌐 Acesso

Site hospedado no GitHub Pages:
**https://willcarvalhodev.github.io/Portal-Educa-WEB/**

## 📱 Responsividade

O site é totalmente responsivo e otimizado para:
- 📱 Mobile (até 480px)
- 📱 Tablet (481px - 768px)
- 💻 Desktop (769px - 1200px)
- 🖥️ Large screens (acima de 1200px)

## 🔄 Como Atualizar

1. Faça suas alterações nos arquivos
2. Commit e push:
```bash
git add .
git commit -m "Descrição da atualização"
git push origin main
```

O GitHub Pages atualiza automaticamente em 1-2 minutos! 🎉

## 📝 Seções do Site

- **Header**: Navegação fixa com menu responsivo
- **Hero**: Apresentação principal com call-to-action
- **Sobre**: Informações sobre a plataforma
- **Recursos**: Grid de funcionalidades com cards
- **Contato**: Seção de contato
- **Footer**: Rodapé com informações

## 🎯 Funcionalidades JavaScript

- ✅ Scroll suave entre seções
- ✅ Menu mobile responsivo
- ✅ Animações ao scroll (Intersection Observer)
- ✅ Navegação ativa baseada na posição do scroll
- ✅ Atualização automática do ano no footer
- ✅ Lazy loading de imagens

## 📋 Boas Práticas Implementadas

- ✅ HTML semântico e acessível
- ✅ Padrão BEM no CSS
- ✅ Separação de responsabilidades
- ✅ Código modular em JavaScript
- ✅ Variáveis CSS para fácil manutenção
- ✅ Mobile-first approach
- ✅ SEO otimizado (meta tags)
- ✅ Performance otimizada (lazy loading)

## 🔧 Desenvolvimento Local

Para visualizar localmente:

1. Clone o repositório:
```bash
git clone https://github.com/willcarvalhodev/Portal-Educa-WEB.git
```

2. Abra o arquivo `index.html` no navegador ou use um servidor local:
```bash
# Com Python
python -m http.server 8000

# Com Node.js (http-server)
npx http-server
```

3. Acesse `http://localhost:8000` no navegador

## 📄 Licença

Este projeto é de uso educacional.

---

Desenvolvido com ❤️ para transformar a gestão educacional
