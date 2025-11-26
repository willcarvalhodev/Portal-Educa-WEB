# 🎓 Portal Educa - Plano Completo do Projeto

## 🎯 Visão Geral

Site comercial + plataforma de gestão escolar com 3 perfis de usuário (Coordenador, Professor, Aluno) e duas experiências de navegação (Moderna/Comercial e Desenvolvedora).

---

## 🏗️ Estrutura do Projeto

### **Módulo 1: Site Comercial/Moderno**
- Landing page apresentando o produto
- Seções: Hero, Recursos, Depoimentos, Preços, Contato
- Opção de Login para instituições
- Design moderno e não convencional

### **Módulo 2: Versão Desenvolvedora**
- Conteúdo sobre desenvolvimento com IA
- Prompts utilizados
- Chatbot IA para interação
- Download do app Desktop Python
- Experiência única focada em tecnologia

### **Módulo 3: Sistema de Login/Autenticação**
- Login institucional (Firebase Auth)
- Seleção de perfil após login:
  - Coordenador
  - Professor
  - Aluno

### **Módulo 4: Dashboard por Perfil**

#### **Coordenador:**
- ✅ Cadastro de professores (criar, editar, listar, apagar)
- ✅ Cadastro de alunos (criar, editar, listar, apagar)
- ✅ Cadastro de turmas (criar, editar, listar, apagar)
- ✅ Cadastro de cursos (criar, editar, listar, apagar)
- ✅ Verificação de usuários online da instituição

#### **Professor:**
- ✅ Acesso a turmas vinculadas ao perfil
- ✅ Calendário com turmas, dias e horários
- ✅ Cadastro e correção de atividades (com IA via gabarito)
- ✅ Correção de provas
- ✅ Cadastro de notas e frequência
- ✅ Chat para contato com aluno ou IA

#### **Aluno:**
- ✅ Acesso a turmas vinculadas
- ✅ Visualização de atividades
- ✅ Visualização de notas e frequência
- ✅ Chat para contato com professor ou IA

---

## 📋 Plano de Implementação (Passo a Passo)

### **FASE 1: Base Estrutural** ⏸️
1. ✅ HTML básico semântico
2. ✅ CSS com reset e variáveis
3. ✅ JavaScript básico modular
4. ✅ Sistema de roteamento básico
5. ✅ Testar GitHub Pages

### **FASE 2: Experiência de Escolha** ⏸️
1. Tela inicial de escolha (Moderna vs Desenvolvedora)
2. Roteamento para cada experiência
3. Header compartilhado com opção de trocar experiência
4. Testar navegação

### **FASE 3: Módulo Comercial/Moderno** ⏸️
1. Landing page completa
2. Seções: Hero, Recursos, Depoimentos, Preços
3. Design moderno e não convencional
4. Opção de Login
5. Footer

### **FASE 4: Módulo Desenvolvedora** ⏸️
1. Layout de duas colunas
2. Conteúdo sobre IA e desenvolvimento
3. Seção de prompts utilizados
4. Chatbot IA (Gemini API)
5. Card de download do app Desktop Python
6. Design diferenciado

### **FASE 5: Sistema de Autenticação** ⏸️
1. Integração Firebase Auth
2. Formulário de login
3. Validação e tratamento de erros
4. Redirecionamento após login

### **FASE 6: Seleção de Perfil** ⏸️
1. Tela de seleção de perfil
2. Cards para cada perfil (Coordenador, Professor, Aluno)
3. Redirecionamento para dashboard correspondente

### **FASE 7: Dashboard Coordenador** ⏸️
1. Layout do dashboard
2. CRUD de Professores
3. CRUD de Alunos
4. CRUD de Turmas
5. CRUD de Cursos
6. Lista de usuários online

### **FASE 8: Dashboard Professor** ⏸️
1. Layout do dashboard
2. Lista de turmas vinculadas
3. Calendário com turmas e horários
4. CRUD de atividades (com correção IA)
5. Correção de provas
6. Cadastro de notas e frequência
7. Chat (professor/aluno/IA)

### **FASE 9: Dashboard Aluno** ⏸️
1. Layout do dashboard
2. Lista de turmas vinculadas
3. Visualização de atividades
4. Visualização de notas e frequência
5. Chat (professor/IA)

### **FASE 10: Funcionalidades Avançadas** ⏸️
1. Integração com backend (API)
2. Persistência de dados (Firebase Firestore)
3. Notificações em tempo real
4. Upload de arquivos
5. Relatórios e gráficos

---

## 🎨 Design e UX

### **Princípios:**
- Design moderno e não convencional
- CSS intuitivo
- Animações suaves
- Mobile-first
- Acessibilidade (ARIA, semântico)
- Performance otimizada

### **Paleta de Cores:**
- Primária: Azul/Roxo moderno
- Secundária: Complementar
- Neutras: Cinzas suaves
- Acentos: Destaques

### **Tipografia:**
- Moderna e legível
- Hierarquia clara
- Responsiva

---

## 🔧 Tecnologias

### **Frontend:**
- HTML5 Semântico
- CSS3 (BEM, Mobile-First, Variáveis)
- JavaScript Vanilla (Modular)
- Firebase Auth (Autenticação)
- Firebase Firestore (Banco de dados - futuro)

### **Backend (futuro):**
- Python/FastAPI ou Node.js
- API REST
- Integração com IA (Gemini/OpenAI)

### **Desktop App (Python):**
- CustomTkinter
- Download disponível no site

---

## 📱 Responsividade

- Mobile (< 768px)
- Tablet (768px - 1024px)
- Desktop (> 1024px)
- Large (> 1440px)

---

## ✅ Checklist de Validação

Cada fase deve:
- [ ] Funcionar localmente
- [ ] Funcionar no GitHub Pages
- [ ] Ser responsiva
- [ ] Ter código limpo e comentado
- [ ] Passar em testes manuais
- [ ] Ter console sem erros

---

## 🚀 Próximos Passos

**Começar pela FASE 1: Base Estrutural**

1. HTML básico semântico
2. CSS com reset e variáveis
3. JavaScript básico modular
4. Testar e validar
5. Commit e push

**Depois avançar gradualmente para cada fase!**

