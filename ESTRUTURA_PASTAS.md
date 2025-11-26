# 📁 Estrutura de Pastas do Projeto

```
Portal-Educa-WEB/
│
├── index.html                 # Tela inicial de escolha (Moderna/Desenvolvedora)
│
├── css/
│   ├── style.css              # Estilos principais (variáveis, reset, base)
│   ├── comercial.css          # Estilos do módulo comercial
│   ├── desenvolvedora.css     # Estilos do módulo desenvolvedora
│   └── dashboard.css          # Estilos dos dashboards
│
├── js/
│   ├── script.js              # JavaScript principal (módulos)
│   ├── router.js              # Sistema de roteamento
│   ├── auth.js                # Autenticação Firebase
│   ├── comercial.js           # Lógica do módulo comercial
│   ├── desenvolvedora.js      # Lógica do módulo desenvolvedora
│   ├── chatbot.js             # Chatbot IA
│   ├── coordenador.js         # Dashboard coordenador
│   ├── professor.js           # Dashboard professor
│   └── aluno.js               # Dashboard aluno
│
├── views/
│   ├── escolha.html           # Tela de escolha de experiência
│   ├── comercial.html         # Módulo comercial/moderno
│   ├── desenvolvedora.html    # Módulo desenvolvedora
│   ├── login.html             # Formulário de login
│   ├── selecao-perfil.html    # Seleção de perfil após login
│   ├── dashboard-coordenador.html
│   ├── dashboard-professor.html
│   └── dashboard-aluno.html
│
├── images/
│   ├── icon.ico               # Favicon
│   ├── logo.png               # Logo principal
│   └── ...                    # Outras imagens
│
├── .nojekyll                  # Para GitHub Pages
├── .gitignore                 # Arquivos ignorados pelo Git
└── README.md                  # Documentação

```

## 📝 Notas

- Views podem ser carregadas dinamicamente via JavaScript
- CSS modular para fácil manutenção
- JavaScript modular com responsabilidades separadas
- Estrutura escalável para crescimento futuro

