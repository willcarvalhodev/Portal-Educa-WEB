# Portal Educa - Next.js

Versão moderna do Portal Educa construída com Next.js, React, TypeScript e Tailwind CSS.

## 🚀 Como Iniciar

### Pré-requisitos
- Node.js 18+ instalado
- NPM ou Yarn

### Instalação

1. Instale as dependências:
```bash
npm install
```

2. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

3. Abra [http://localhost:3000](http://localhost:3000) no navegador

## 📁 Estrutura do Projeto

```
nextjs/
├── app/                    # Páginas (App Router)
│   ├── page.tsx           # Página inicial (escolha de versão)
│   ├── basic/
│   │   └── page.tsx       # Versão básica
│   ├── modern/
│   │   └── page.tsx       # Versão moderna
│   ├── layout.tsx         # Layout global
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── Header/
│   ├── Footer/
│   ├── Hero/
│   ├── Features/
│   ├── About/
│   └── CTA/
├── hooks/                 # Custom hooks
├── lib/                   # Utilitários
├── types/                 # Tipos TypeScript
└── public/                # Arquivos estáticos
    └── images/
```

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm start` - Inicia servidor de produção
- `npm run lint` - Executa ESLint
- `npm run type-check` - Verifica tipos TypeScript

## 📦 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório GitHub à Vercel
2. O Next.js será detectado automaticamente
3. Deploy automático a cada push!

### Netlify
1. Conecte seu repositório GitHub à Netlify
2. Build command: `npm run build`
3. Publish directory: `.next`

## 🎨 Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **React 18** - Biblioteca UI

## 📝 Notas

Esta é a migração completa do site HTML estático para Next.js moderno. Todos os componentes foram migrados e otimizados.

