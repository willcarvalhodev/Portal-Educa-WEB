# 🚀 Instruções de Instalação - Portal Educa Next.js

## Passo 1: Instalar Node.js

Se você ainda não tem o Node.js instalado:

1. Acesse: https://nodejs.org/
2. Baixe a versão LTS (recomendada)
3. Execute o instalador
4. Reinicie o terminal após a instalação

## Passo 2: Verificar Instalação

Abra o terminal (PowerShell) e execute:

```bash
node --version
npm --version
```

Você deve ver números de versão (ex: v18.17.0 e 9.6.7)

## Passo 3: Instalar Dependências

Navegue até a pasta do projeto Next.js:

```bash
cd nextjs
```

Instale todas as dependências:

```bash
npm install
```

Isso pode levar alguns minutos na primeira vez.

## Passo 4: Executar o Projeto

Depois que a instalação terminar, execute:

```bash
npm run dev
```

Aguarde a mensagem: "Ready - started server on 0.0.0.0:3000"

## Passo 5: Abrir no Navegador

Abra seu navegador e acesse:

```
http://localhost:3000
```

## ✅ Pronto!

O site está rodando localmente. Qualquer alteração que você fizer será refletida automaticamente no navegador.

## 📝 Comandos Úteis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm start` - Inicia servidor de produção
- `Ctrl + C` - Para o servidor

## 🐛 Problemas Comuns

**Erro: "node não é reconhecido"**
- Instale o Node.js novamente e reinicie o terminal

**Erro: "npm install falha"**
- Tente limpar o cache: `npm cache clean --force`
- Depois tente novamente: `npm install`

**Porta 3000 já está em uso**
- Pare o outro processo ou use outra porta: `npm run dev -- -p 3001`

