# ⚡ Instruções Rápidas

## 🔧 Problema: Node.js não reconhecido

Se você acabou de instalar o Node.js e o terminal não reconhece:

### Solução 1: Reiniciar o Terminal (Recomendado)
1. **Feche completamente o Cursor/VS Code**
2. **Reabra o Cursor/VS Code**
3. **Abra um novo terminal**
4. Tente novamente: `node --version`

### Solução 2: Usar o Script Automático
1. **Abra o arquivo `start.bat`** (duplo clique)
2. O script verificará e instalará tudo automaticamente

### Solução 3: Verificar Instalação
1. Abra o **PowerShell como Administrador**
2. Execute:
   ```powershell
   $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
   ```
3. Tente: `node --version`

## 🚀 Após o Node.js Funcionar

```bash
cd nextjs
npm install
npm run dev
```

Abra: http://localhost:3000

## 📝 Verificar se Node.js Está Instalado

Abra o **Prompt de Comando** (cmd.exe) e digite:
```cmd
node --version
```

Se funcionar no CMD mas não no PowerShell, é problema de PATH. Use a Solução 1 (reiniciar).

