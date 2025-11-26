# 📱 Referência do Aplicativo Desktop Portal Educa

Este documento serve como referência baseada no aplicativo desktop Python/Tkinter para garantir fidelidade no desenvolvimento web.

## 🔐 Sistema de Autenticação

### Credenciais de Teste (Desktop):
- **Coordenador**: `teste@coordenador.educa` / `123456`
- **Professor**: `teste@professor.educa` / `123456`
- **Aluno**: `teste@aluno.educa` / `123456`

### Lógica de Identificação de Perfil:
- Identificação baseada no sufixo do email:
  - `@coordenador.educa` → Coordenador
  - `@professor.educa` → Professor
  - `@aluno.educa` → Aluno

### Funcionalidades de Login:
- Validação de email em duas etapas
- Validação de senha
- Gerenciamento de usuários logados (JSON compartilhado)
- Registro de timestamp de login

---

## 👨‍💼 Dashboard do Coordenador

### Menu Principal:
1. **Gestão de Professor**
   - Cadastrar Professor
   - Listar Professores
   - Excluir Professor

2. **Gestão de Aluno**
   - Cadastrar Aluno
   - Listar Alunos
   - Excluir Aluno

3. **Gestão de Curso**
   - Cadastrar Curso
   - Listar Cursos
   - Excluir Curso

4. **Gestão de Turma**
   - Cadastrar Turma
   - Listar Turmas
   - Matricular Aluno em Turma
   - Excluir Turma

5. **Perfis Logados**
   - Visualizar todos os usuários online
   - Estatísticas por perfil
   - Tempo online de cada usuário
   - Atualização automática (5 segundos)

### Dados de Exemplo (Desktop):

#### Professores:
```python
DADOS_PROFESSORES = [
    {"id": 1, "nome": "Prof. Ana Silva", "email": "teste@professor.educa"},
    {"id": 2, "nome": "Prof. Carlos Mendes", "email": "carlos@professor.educa"},
    {"id": 3, "nome": "Prof. Mariana Costa", "email": "mariana@professor.educa"},
    {"id": 4, "nome": "Prof. João Santos", "email": "joao@professor.educa"},
    {"id": 5, "nome": "Prof. Patricia Lima", "email": "patricia@professor.educa"},
]
```

#### Alunos:
```python
DADOS_ALUNOS = [
    {"matricula": "A20240001", "nome": "Aluno Bruno", "email": "teste@aluno.educa", "turma": "2024-A"},
    {"matricula": "A20240002", "nome": "Aluna Luiza", "email": "luiza@aluno.educa", "turma": "2024-A"},
    {"matricula": "A20240003", "nome": "Aluno Pedro", "email": "pedro@aluno.educa", "turma": "2024-B"},
    {"matricula": "A20240004", "nome": "Aluna Maria", "email": "maria@aluno.educa", "turma": "2024-A"},
    {"matricula": "A20240005", "nome": "Aluno Lucas", "email": "lucas@aluno.educa", "turma": "2024-B"},
]
```

#### Cursos:
```python
DADOS_CURSOS = [
    {"id": 1, "nome": "Engenharia de Software"},
    {"id": 2, "nome": "Administração"},
    {"id": 3, "nome": "Ciências Contábeis"},
    {"id": 4, "nome": "Sistemas de Informação"},
    {"id": 5, "nome": "Direito"},
]
```

#### Turmas:
```python
DADOS_TURMAS = [
    {"id": 1, "nome": "2024-A", "curso": "Engenharia de Software", "alunos": 30},
    {"id": 2, "nome": "2024-B", "curso": "Administração", "alunos": 25},
    {"id": 3, "nome": "2024-C", "curso": "Ciências Contábeis", "alunos": 20},
    {"id": 4, "nome": "2024-D", "curso": "Sistemas de Informação", "alunos": 28},
    {"id": 5, "nome": "2024-E", "curso": "Direito", "alunos": 35},
]
```

---

## 👨‍🏫 Dashboard do Professor

### Menu Principal:
1. **Gestão de Turmas**
   - Visualizar turmas vinculadas
   - Calendário com turmas, dias e horários

2. **Gestão de Atividades**
   - Postar atividades
   - Visualizar atividades postadas

3. **Gestão de Notas**
   - Lançar notas
   - Visualizar notas lançadas

4. **Gestão de Frequência**
   - Lançar frequência
   - Visualizar frequência lançada

5. **Comunicação**
   - Chat com alunos
   - Chat com IA

---

## 👨‍🎓 Dashboard do Aluno

### Menu Principal:
1. **Diário Eletrônico**
   - Acesso centralizado às informações

2. **Verificar Aulas**
   - Visualização de aulas e horários

3. **Verificar Atividades**
   - Lista de atividades disponíveis
   - Status de cada atividade

4. **Verificar Desempenho**
   - Visualização de notas
   - Média geral

5. **Verificar Frequência**
   - Acompanhamento de presenças/faltas

6. **Comunicação**
   - Chat com professores
   - Chat com IA

---

## 💬 Sistema de Chat

### Funcionalidades:
- Histórico de mensagens salvo em arquivo JSON
- Mensagens identificadas por perfil
- Limpeza de histórico
- Suporte para múltiplos perfis conversando

### Estrutura de Mensagens:
```python
MENSAGENS_CHAT = [
    {"perfil": "Sistema", "texto": "Início da Conversa"},
    {"perfil": "Coordenador", "texto": "Mensagem do coordenador"},
    # ...
]
```

---

## 🎨 Design e UX

### Tema:
- Suporte a modo Dark/Light
- Toggle de tema persistente
- Cores adaptáveis ao tema

### Elementos Persistentes:
- Botão de toggle de tema (canto inferior direito)
- Botão de sair/fechar (canto inferior esquerdo)
- Label de versão (rodapé central)

### Dimensões de Janela:
- Login: 400x300
- Listar/Excluir: 900x650
- Fullscreen para algumas telas (ex: Perfis Logados)

---

## 🔄 Funcionalidades Adicionais

### Gerenciamento de Usuários Logados:
- Sistema de arquivo JSON compartilhado (`logged_users.json`)
- Permite múltiplas instâncias do programa
- Registro de:
  - Email
  - Perfil
  - Data de login
  - Hora de login
  - Timestamp para cálculo de tempo online

### Atualização Automática:
- Perfis logados atualiza a cada 5 segundos
- Estatísticas atualizadas automaticamente

---

## 📝 Observações para Implementação Web

1. **Autenticação**: Migrar para Firebase Auth mantendo a mesma lógica de identificação por email
2. **Dados**: Preparar estrutura no Firestore baseada nos dados de exemplo
3. **Chat**: Implementar sistema de mensagens em tempo real (Firestore Realtime)
4. **Usuários Online**: Usar Firebase Presence para rastrear usuários online
5. **Design**: Manter a essência do design dark/light, mas adaptar para web moderno

---

## 🚀 Próximas Fases (Baseadas no Desktop)

### FASE 6: Seleção de Perfil
- Tela de escolha de perfil após login
- Cards para Coordenador, Professor, Aluno

### FASE 7: Dashboard Coordenador
- Implementar todos os CRUDs
- Tela de Perfis Logados
- Estatísticas

### FASE 8: Dashboard Professor
- Gestão completa de turmas, atividades, notas, frequência
- Sistema de chat

### FASE 9: Dashboard Aluno
- Todas as visualizações de informações
- Sistema de chat

### FASE 10: Funcionalidades Avançadas
- Integração com backend
- Persistência Firestore
- Notificações em tempo real
- Upload de arquivos

---

**Última atualização**: Baseado em `codigo_fonte_tkinter.py` v1.0.0

