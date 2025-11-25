# ⚙️ Configuração do Netlify - Guia Visual

## 📋 Campos da Tela de Deploy

### ✅ Branch para implantação
**Valor:** `principal` ou `main`
- Deixe como está
- É a branch do GitHub que será usada

### ✅ Diretório base
**Valor:** *(deixe vazio)*
- Não precisa preencher
- Só é necessário se seu projeto estiver em uma subpasta

### ✅ Comando de construção
**Valor:** *(deixe vazio)*
- **IMPORTANTE:** Deixe vazio!
- Seu site não precisa de build (é HTML puro)
- Só preencha se no futuro usar React, Vue, etc.

### ✅ Publicar diretório
**Valor:** `.` (ponto)
- **Já está correto!** ✅
- O ponto significa "raiz do projeto"
- É onde estão seus arquivos HTML

### ⚙️ Diretório de funções
**Valor:** *(pode deixar vazio ou `netlify/functions`)*
- Não é necessário para seu site atual
- Só use se no futuro criar funções serverless

## 🎯 Resumo Rápido

```
Branch para implantação: principal
Diretório base: (vazio)
Comando de construção: (vazio) ← IMPORTANTE!
Publicar diretório: . ← Já está correto!
Diretório de funções: (vazio)
```

## ✅ Depois de Configurar

1. Clique em **"Deploy site"** ou **"Salvar"**
2. Aguarde o deploy (alguns segundos)
3. Seu site estará online! 🚀

## 🔄 Se Precisar Mudar Depois

- Vá em: **Site settings > Build & deploy > Build settings**
- Clique em **"Edit settings"**
- Altere o que precisar
- Salve

## ⚠️ Erros Comuns

### ❌ Erro: "Build failed"
- **Causa:** Preencheu o "Comando de construção"
- **Solução:** Deixe vazio!

### ❌ Erro: "Publish directory not found"
- **Causa:** Diretório errado
- **Solução:** Use `.` (ponto) para raiz do projeto

### ❌ Site em branco
- **Causa:** Diretório de publicação errado
- **Solução:** Verifique se está `.` (ponto)

