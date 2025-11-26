# 🔧 Solução Cache - Opera GX

## 🚀 Métodos Rápidos para Opera GX

### **Método 1: Forçar Atualização (Mais Rápido)**

**Windows/Linux:**
- Pressione `Ctrl + Shift + R`
- OU `Ctrl + F5`

**Mac:**
- Pressione `Cmd + Shift + R`

### **Método 2: Limpar Cache no Opera GX**

1. Pressione `Ctrl + Shift + Delete`
2. Selecione:
   - ✅ "Cache de imagens e arquivos"
   - ✅ "Cookies e outros dados do site"
3. Período: **"Última hora"** ou **"Sempre"**
4. Clique em **"Limpar dados"**
5. Recarregue a página com `Ctrl + Shift + R`

### **Método 3: Modo Privado (Recomendado)**

1. Pressione `Ctrl + Shift + N`
2. Acesse: https://willcarvalhodev.github.io/Portal-Educa-WEB/
3. Isso ignora completamente o cache

### **Método 4: Desabilitar Cache Temporariamente (DevTools)**

1. Pressione `F12` para abrir DevTools
2. Vá na aba **Network** (Rede)
3. Marque a opção **"Disable cache"**
4. Mantenha o DevTools aberto
5. Recarregue a página com `Ctrl + Shift + R`

### **Método 5: Limpar Cache Manualmente**

1. Pressione `Ctrl + Shift + Delete`
2. Escolha **"Tudo"** no período
3. Selecione apenas **"Cache de imagens e arquivos"**
4. Clique em **"Limpar dados"**
5. Feche e reabra o navegador
6. Acesse o site novamente

## 🔍 Verificar se Funcionou

1. Abra o DevTools (`F12`)
2. Vá na aba **Console**
3. Você deve ver:
   ```
   🚀 Portal Educa - Iniciando...
   ✅ Router inicializado
   ✅ Portal Educa - Aplicação inicializada
   ✅ Navegado para: escolha
   ✅ ChoiceModule inicializado
   ```

4. Você deve ver a **tela de escolha** com dois cards grandes

## ⚠️ Importante

- Aguarde **2-5 minutos** após o push no GitHub
- Use **modo privado** para testar rapidamente
- O Opera GX pode ter cache mais agressivo

## 🐛 Se Ainda Não Funcionar

Verifique os arquivos diretamente:
- https://willcarvalhodev.github.io/Portal-Educa-WEB/js/router.js
- https://willcarvalhodev.github.io/Portal-Educa-WEB/views/escolha.html

Se esses links abrirem, os arquivos estão corretos no servidor.

