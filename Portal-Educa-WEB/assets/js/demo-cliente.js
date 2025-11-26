/**
 * Demo estática da Experiência Cliente
 * - Simula login multi-perfil
 * - Mantém dados em memória / sessionStorage
 * - Controla navegação entre módulos
 */

const DemoCliente = (() => {
  const state = {
    perfil: null,
    email: null,
    mensagensChat: JSON.parse(localStorage.getItem('demoChat') || '[]'),
    dados: {
      professores: [
        { id: 1, nome: 'Prof. Ana Silva', email: 'ana@professor.educa' },
        { id: 2, nome: 'Prof. Carlos Mendes', email: 'carlos@professor.educa' },
      ],
      alunos: [
        { matricula: 'A20240001', nome: 'Aluno Bruno', email: 'bruno@aluno.educa', turma: '2024-A' },
        { matricula: 'A20240002', nome: 'Aluna Luiza', email: 'luiza@aluno.educa', turma: '2024-B' },
        { matricula: 'A20240003', nome: 'Aluno Pedro', email: 'pedro@aluno.educa', turma: '2024-A' },
      ],
      cursos: [
        { id: 1, nome: 'Engenharia de Software' },
        { id: 2, nome: 'Administração' },
      ],
      turmas: [
        { id: 1, nome: '2024-A', curso: 'Engenharia de Software', alunos: 30 },
        { id: 2, nome: '2024-B', curso: 'Administração', alunos: 25 },
      ],
      atividadesProf: [
        { id: 1, titulo: 'Trabalho Programação I', turma: '2024-A', data: '2024-11-20' },
        { id: 2, titulo: 'Prova Banco de Dados', turma: '2024-B', data: '2024-11-25' },
      ],
      notasProf: [
        { id: 1, aluno: 'Aluno Bruno', atividade: 'Trabalho Programação I', nota: 8.5 },
        { id: 2, aluno: 'Aluna Luiza', atividade: 'Prova Banco de Dados', nota: 9.0 },
      ],
      frequenciaProf: [
        { id: 1, aluno: 'Aluno Bruno', turma: '2024-A', data: '2024-11-10', status: 'P' },
        { id: 2, aluno: 'Aluna Luiza', turma: '2024-B', data: '2024-11-10', status: 'F' },
      ],
      usuariosLogados: [],
      aulasAluno: [
        { dia: 'Segunda', materia: 'Programação I', horario: '08h-10h', professor: 'Prof. Ana', sala: '101' },
        { dia: 'Terça', materia: 'Banco de Dados', horario: '10h-12h', professor: 'Prof. Carlos', sala: '102' },
      ],
      atividadesAluno: [
        { titulo: 'Trabalho Programação I', tipo: 'Trabalho', entrega: '20/11', status: 'Pendente' },
        { titulo: 'Prova Banco de Dados', tipo: 'Prova', entrega: '25/11', status: 'Pendente' },
      ],
      desempenhoAluno: [
        { materia: 'Programação I', nota: '8.5', status: 'Aprovado', faltas: 5 },
        { materia: 'Banco de Dados', nota: '9.0', status: 'Aprovado', faltas: 3 },
      ],
      frequenciaAluno: [
        { materia: 'Programação I', percentual: '95%', presencas: 27, faltas: 3, total: 30 },
        { materia: 'Banco de Dados', percentual: '88%', presencas: 35, faltas: 5, total: 40 },
      ],
    },
  };

  const credenciais = {
    'teste@coordenador.educa': { senha: '123456', perfil: 'Coordenador' },
    'teste@professor.educa': { senha: '123456', perfil: 'Professor' },
    'teste@aluno.educa': { senha: '123456', perfil: 'Aluno' },
  };

  function init() {
    const storedPerfil = sessionStorage.getItem('demoPerfil');
    const storedEmail = sessionStorage.getItem('demoEmail');
    if (storedPerfil && storedEmail) {
      state.perfil = storedPerfil;
      state.email = storedEmail;
      renderApp();
    } else {
      renderLogin();
    }
  }

  function renderLogin() {
    const container = document.querySelector('[data-demo-root]');
    if (!container) return;
    
    // Esconder header e footer na tela de login também
    document.body.classList.add('login-active');
    const header = document.querySelector('.site-header');
    const footer = document.querySelector('.site-footer');
    if (header) header.style.display = 'none';
    if (footer) footer.style.display = 'none';
    
    container.innerHTML = `
      <section class="demo-login">
        <div class="demo-login__card">
          <h2>Acesse o portal</h2>
          <p>Use as credenciais fictícias para explorar cada perfil.</p>
          <form id="demo-login-form">
            <label>E-mail
              <input type="email" name="email" required placeholder="teste@coordenador.educa">
            </label>
            <label>Senha
              <input type="password" name="senha" required placeholder="123456">
            </label>
            <button type="submit" class="btn btn--primary">Entrar na experiência</button>
            <a href="index.html" class="btn btn--secondary demo-login__back-btn">Voltar</a>
          </form>
        </div>
      </section>
    `;

    container.querySelector('#demo-login-form').addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const email = formData.get('email').toLowerCase();
      const senha = formData.get('senha');
      const credencial = credenciais[email];

      if (credencial && credencial.senha === senha) {
        state.perfil = credencial.perfil;
        state.email = email;
        sessionStorage.setItem('demoPerfil', state.perfil);
        sessionStorage.setItem('demoEmail', state.email);
        addLoggedUser(email, state.perfil);
        renderApp();
      } else {
        alert('Credenciais inválidas');
      }
    });
  }

  function renderApp() {
    const container = document.querySelector('[data-demo-root]');
    if (!container) return;
    
    // Esconder header e footer quando app estiver ativo
    document.body.classList.remove('login-active');
    document.body.classList.add('app-active');
    const header = document.querySelector('.site-header');
    const footer = document.querySelector('.site-footer');
    if (header) header.style.display = 'none';
    if (footer) footer.style.display = 'none';
    
    container.innerHTML = `
      <section class="demo-app">
        <aside class="demo-sidebar">
          <div class="demo-sidebar__logo">
            <img src="assets/images/icon.ico" alt="Portal Educa" width="40" height="40">
            <span class="demo-sidebar__logo-text">Portal Educa</span>
          </div>
          <div class="demo-sidebar__user">
            <div class="demo-sidebar__user-avatar">${getInitials(state.perfil)}</div>
            <div class="demo-sidebar__user-info">
              <span class="demo-sidebar__user-name">${state.perfil}</span>
              <span class="demo-sidebar__user-email">${state.email}</span>
            </div>
          </div>
          <nav class="demo-sidebar__nav">
            ${renderNav()}
          </nav>
          <div class="demo-sidebar__footer">
            <button class="demo-sidebar__action" data-action="open-manual" title="Manual">
              <span class="demo-sidebar__icon">📖</span>
              <span class="demo-sidebar__label">Manual</span>
            </button>
            <button class="demo-sidebar__action" data-action="logout" title="Sair">
              <span class="demo-sidebar__icon">🚪</span>
              <span class="demo-sidebar__label">Sair</span>
            </button>
            <a href="index.html" class="demo-sidebar__action demo-sidebar__action--back" title="Voltar">
              <span class="demo-sidebar__icon">←</span>
              <span class="demo-sidebar__label">Voltar</span>
            </a>
          </div>
        </aside>
        <div class="demo-sidebar-overlay"></div>
        <section class="demo-app__content" id="demo-content">
          <header class="demo-app__header">
            <button class="demo-sidebar-toggle" aria-label="Abrir menu">
              <span class="demo-sidebar-toggle__icon">☰</span>
            </button>
            <h1 class="demo-app__title">Portal Educa</h1>
          </header>
          ${renderDashboard()}
        </section>
      </section>
    `;

    attachNavEvents();
    attachHeaderActions();
    attachSidebarToggle();
    
    // Expor funções globalmente para os botões de voltar
    window.DemoCliente = {
      goBack,
      goBackToModule,
    };
  }

  function getInitials(perfil) {
    return perfil.substring(0, 2).toUpperCase();
  }

  function renderNav() {
    const iconMap = {
      'dashboard': '📊',
      'professores': '👨‍🏫',
      'alunos': '👨‍🎓',
      'cursos': '📚',
      'turmas': '👥',
      'usuarios': '👤',
      'turmas-prof': '👥',
      'atividades': '📝',
      'notas': '📋',
      'frequencia': '✅',
      'chat': '💬',
      'diario': '📖',
      'aulas': '🎓',
      'atividades-aluno': '📝',
      'avaliacoes': '📊',
    };

    const menus = {
      Coordenador: [
        { id: 'dashboard', label: 'Visão geral', icon: iconMap.dashboard },
        { id: 'professores', label: 'Professores', icon: iconMap.professores },
        { id: 'alunos', label: 'Alunos', icon: iconMap.alunos },
        { id: 'cursos', label: 'Cursos', icon: iconMap.cursos },
        { id: 'turmas', label: 'Turmas', icon: iconMap.turmas },
        { id: 'usuarios', label: 'Perfis logados', icon: iconMap.usuarios },
      ],
      Professor: [
        { id: 'dashboard', label: 'Visão geral', icon: iconMap.dashboard },
        { id: 'turmas-prof', label: 'Turmas', icon: iconMap['turmas-prof'] },
        { id: 'atividades', label: 'Atividades', icon: iconMap.atividades },
        { id: 'notas', label: 'Notas', icon: iconMap.notas },
        { id: 'frequencia', label: 'Frequência', icon: iconMap.frequencia },
        { id: 'chat', label: 'Chat', icon: iconMap.chat },
      ],
      Aluno: [
        { id: 'dashboard', label: 'Visão geral', icon: iconMap.dashboard },
        { id: 'diario', label: 'Diário', icon: iconMap.diario },
        { id: 'aulas', label: 'Aulas', icon: iconMap.aulas },
        { id: 'atividades-aluno', label: 'Atividades', icon: iconMap['atividades-aluno'] },
        { id: 'avaliacoes', label: 'Avaliações', icon: iconMap.avaliacoes },
        { id: 'chat', label: 'Chat', icon: iconMap.chat },
      ],
    };

    return menus[state.perfil]
      .map(
        item => `
        <button class="demo-sidebar__item${item.id === 'dashboard' ? ' is-active' : ''}" data-section="${item.id}" title="${item.label}">
          <span class="demo-sidebar__item-icon">${item.icon}</span>
          <span class="demo-sidebar__item-label">${item.label}</span>
        </button>
      `,
      )
      .join('');
  }

  // Estado de navegação hierárquica
  const navigationState = {
    currentModule: null,
    currentAction: null,
  };

  function renderDashboard() {
    return `
      <div class="demo-dashboard">
        <h3 class="demo-dashboard__title">Bem-vindo(a), ${state.perfil}</h3>
        <p>Use o menu lateral para navegar pelos módulos convertidos do aplicativo desktop.</p>
        <ul>
          <li>Todos os dados são fictícios e ficam apenas no navegador.</li>
          <li>Cadastros/exclusões atualizam as tabelas em tempo real.</li>
          <li>O chat compartilha histórico entre Professor e Aluno.</li>
        </ul>
      </div>
    `;
  }

  function addLoggedUser(email, perfil) {
    const now = new Date();
    state.dados.usuariosLogados.push({
      email,
      perfil,
      timestamp: now.toISOString(),
    });
  }

  function formatTempoOnline(timestamp) {
    const diff = Date.now() - new Date(timestamp).getTime();
    const horas = Math.floor(diff / 3600000);
    const minutos = Math.floor((diff % 3600000) / 60000);
    const segundos = Math.floor((diff % 60000) / 1000);
    return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
  }

  function removeLoggedUser(email) {
    state.dados.usuariosLogados = state.dados.usuariosLogados.filter(user => user.email !== email);
  }

  function attachNavEvents() {
    document.querySelectorAll('.demo-sidebar__item').forEach(btn => {
      // Remover listeners anteriores para evitar duplicidade
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);
      
      newBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.demo-sidebar__item').forEach(item => item.classList.remove('is-active'));
        newBtn.classList.add('is-active');
        const section = newBtn.dataset.section;
        if (section) {
          renderSection(section);
          
          // Fechar menu no mobile após clicar
          if (window.innerWidth <= 1024) {
            const sidebar = document.querySelector('.demo-sidebar');
            const overlay = document.querySelector('.demo-sidebar-overlay');
            if (sidebar && overlay) {
              sidebar.classList.remove('is-open');
              overlay.classList.remove('is-active');
              document.body.style.overflow = '';
            }
          }
        }
      });
    });
  }

  function attachHeaderActions() {
    document.querySelector('[data-action="logout"]')?.addEventListener('click', () => {
      removeLoggedUser(state.email);
      sessionStorage.removeItem('demoPerfil');
      sessionStorage.removeItem('demoEmail');
      state.perfil = null;
      state.email = null;
      renderLogin();
    });

    document.querySelector('[data-action="open-manual"]')?.addEventListener('click', () => {
      alert(`Manual do sistema para ${state.perfil} ainda será detalhado nesta demo.`);
    });
  }

  function attachSidebarToggle() {
    const toggleBtn = document.querySelector('.demo-sidebar-toggle');
    const sidebar = document.querySelector('.demo-sidebar');
    const overlay = document.querySelector('.demo-sidebar-overlay');
    
    if (!toggleBtn || !sidebar || !overlay) {
      console.warn('Elementos do sidebar não encontrados:', { toggleBtn, sidebar, overlay });
      return;
    }

    const openSidebar = () => {
      sidebar.classList.add('is-open');
      overlay.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    };

    const closeSidebar = () => {
      sidebar.classList.remove('is-open');
      overlay.classList.remove('is-active');
      document.body.style.overflow = '';
    };

    // Toggle sidebar
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (sidebar.classList.contains('is-open')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });

    // Fechar ao clicar no overlay
    overlay.addEventListener('click', closeSidebar);

    // Nota: O fechamento do menu ao clicar nos itens é tratado em attachNavEvents()
    // para evitar duplicidade de event listeners

    // Fechar ao clicar em ações do footer (mobile)
    const footerActions = document.querySelectorAll('.demo-sidebar__action');
    footerActions.forEach(action => {
      action.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          closeSidebar();
        }
      });
    });
  }

  function renderSection(sectionId) {
    const content = document.getElementById('demo-content');
    if (!content) return;

    // Resetar estado de navegação se for dashboard
    if (sectionId === 'dashboard') {
      navigationState.currentModule = null;
      navigationState.currentAction = null;
      content.innerHTML = renderDashboard();
      return;
    }

    // Se for Coordenador, mostrar menu de ações
    if (state.perfil === 'Coordenador' && ['professores', 'alunos', 'cursos', 'turmas'].includes(sectionId)) {
      navigationState.currentModule = sectionId;
      navigationState.currentAction = null;
      content.innerHTML = renderModuleActions(sectionId);
      attachActionCardEvents();
      return;
    }

    // Se for Professor, mostrar menu de ações
    if (state.perfil === 'Professor' && ['turmas-prof', 'atividades', 'notas', 'frequencia'].includes(sectionId)) {
      navigationState.currentModule = sectionId;
      navigationState.currentAction = null;
      content.innerHTML = renderModuleActions(sectionId);
      attachActionCardEvents();
      return;
    }

    // Se for Aluno, mostrar menu de ações
    if (state.perfil === 'Aluno' && ['diario', 'aulas', 'atividades-aluno', 'avaliacoes'].includes(sectionId)) {
      navigationState.currentModule = sectionId;
      navigationState.currentAction = null;
      content.innerHTML = renderModuleActions(sectionId);
      attachActionCardEvents();
      return;
    }

    // Renderizar seções normais para outros perfis ou módulos especiais
    const sections = {
      dashboard: renderDashboard,
      usuarios: renderUsuarios,
      chat: renderChat,
    };

    content.innerHTML = sections[sectionId] ? sections[sectionId]() : '<p>Em construção.</p>';
    attachSectionHandlers(sectionId);
  }

  function renderModuleActions(moduleId) {
    const moduleNames = {
      // Coordenador
      professores: 'Professores',
      alunos: 'Alunos',
      cursos: 'Cursos',
      turmas: 'Turmas',
      // Professor
      'turmas-prof': 'Turmas',
      atividades: 'Atividades',
      notas: 'Notas',
      frequencia: 'Frequência',
      // Aluno
      diario: 'Diário',
      aulas: 'Aulas',
      'atividades-aluno': 'Atividades',
      avaliacoes: 'Avaliações',
    };

    return `
      <div class="demo-module-actions">
        <div class="demo-module-actions__header">
          <button class="demo-btn-back" onclick="window.DemoCliente?.goBack()">
            <span>←</span> Voltar
          </button>
          <h2 class="demo-module-actions__title">${moduleNames[moduleId]}</h2>
        </div>
        <div class="demo-module-actions__grid">
          <div class="demo-module-action-card" data-action="cadastrar" data-module="${moduleId}">
            <div class="demo-module-action-card__icon">➕</div>
            <h3>Cadastrar</h3>
            <p>Criar novo registro</p>
          </div>
          <div class="demo-module-action-card" data-action="listar" data-module="${moduleId}">
            <div class="demo-module-action-card__icon">📋</div>
            <h3>Listar</h3>
            <p>Visualizar todos os registros</p>
          </div>
          <div class="demo-module-action-card" data-action="apagar" data-module="${moduleId}">
            <div class="demo-module-action-card__icon">🗑️</div>
            <h3>Apagar</h3>
            <p>Remover registros existentes</p>
          </div>
        </div>
      </div>
    `;
  }

  function renderActionScreen(moduleId, action) {
    const moduleNames = {
      // Coordenador
      professores: 'Professores',
      alunos: 'Alunos',
      cursos: 'Cursos',
      turmas: 'Turmas',
      // Professor
      'turmas-prof': 'Turmas',
      atividades: 'Atividades',
      notas: 'Notas',
      frequencia: 'Frequência',
      // Aluno
      diario: 'Diário',
      aulas: 'Aulas',
      'atividades-aluno': 'Atividades',
      avaliacoes: 'Avaliações',
    };

    const actionNames = {
      cadastrar: 'Cadastrar',
      listar: 'Listar',
      apagar: 'Apagar',
    };

    navigationState.currentModule = moduleId;
    navigationState.currentAction = action;

    let content = '';

    if (action === 'cadastrar') {
      content = renderCadastrar(moduleId);
    } else if (action === 'listar') {
      content = renderListar(moduleId);
    } else if (action === 'apagar') {
      content = renderApagar(moduleId);
    }

    return `
      <div class="demo-action-screen">
        <div class="demo-action-screen__header">
          <button class="demo-btn-back" onclick="window.DemoCliente?.goBackToModule()">
            <span>←</span> Voltar
          </button>
          <h2 class="demo-action-screen__title">${actionNames[action]} ${moduleNames[moduleId]}</h2>
        </div>
        <div class="demo-action-screen__content">
          ${content}
        </div>
      </div>
    `;
  }

  function attachActionCardEvents() {
    document.querySelectorAll('.demo-module-action-card').forEach(card => {
      card.addEventListener('click', () => {
        const module = card.dataset.module;
        const action = card.dataset.action;
        const content = document.getElementById('demo-content');
        if (content) {
          content.innerHTML = renderActionScreen(module, action);
          attachSectionHandlers(module);
        }
      });
    });
  }

  function renderCadastrar(moduleId) {
    if (moduleId === 'professores') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Cadastrar Professor</h3>
          <form class="demo-form" data-form="professores">
            <label>Nome completo<input name="nome" required></label>
            <label>E-mail institucional<input name="email" type="email" required placeholder="nome@professor.educa"></label>
            <label>Senha inicial<input name="senha" type="password" required placeholder="Min. 6 caracteres"></label>
            <button type="submit" class="btn btn--primary">Salvar cadastro</button>
          </form>
        </div>
      `;
    } else if (moduleId === 'alunos') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Cadastrar Aluno</h3>
          <form class="demo-form" data-form="alunos">
            <label>Nome completo<input name="nome" required></label>
            <label>E-mail institucional<input name="email" type="email" required placeholder="nome@aluno.educa"></label>
            <label>Matrícula<input name="matricula" required></label>
            <label>Turma<input name="turma" required></label>
            <button type="submit" class="btn btn--primary">Salvar cadastro</button>
          </form>
        </div>
      `;
    } else if (moduleId === 'cursos') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Cadastrar Curso</h3>
          <form class="demo-form" data-form="cursos">
            <label>Nome do curso<input name="nome" required></label>
            <button type="submit" class="btn btn--primary">Salvar cadastro</button>
          </form>
        </div>
      `;
    } else if (moduleId === 'turmas') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Cadastrar Turma</h3>
          <form class="demo-form" data-form="turmas">
            <label>Nome da turma<input name="nome" required placeholder="Ex: 2024-A"></label>
            <label>Curso<select name="curso" required>${state.dados.cursos.length > 0 ? state.dados.cursos.map(c => `<option value="${c.id}">${c.nome}</option>`).join('') : '<option value="">Nenhum curso cadastrado</option>'}</select></label>
            <label>Número de alunos<input name="alunos" type="number" required min="1" placeholder="Ex: 30"></label>
            <button type="submit" class="btn btn--primary">Salvar cadastro</button>
          </form>
        </div>
      `;
    } else if (moduleId === 'turmas-prof') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Adicionar Aluno à Turma</h3>
          <form class="demo-form" data-form="turmas-prof">
            <label>Aluno<input name="aluno" required></label>
            <label>Turma<select name="turma">${state.dados.turmas.map(t => `<option value="${t.nome}">${t.nome}</option>`).join('')}</select></label>
            <button type="submit" class="btn btn--primary">Matricular</button>
          </form>
        </div>
      `;
    } else if (moduleId === 'atividades') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Postar Atividade</h3>
          <form class="demo-form" data-form="atividades-prof">
            <label>Título<input name="titulo" required></label>
            <label>Turma<select name="turma">${state.dados.turmas.map(t => `<option value="${t.nome}">${t.nome}</option>`).join('')}</select></label>
            <label>Data de entrega<input name="data" type="date" required></label>
            <button type="submit" class="btn btn--primary">Publicar</button>
          </form>
        </div>
      `;
    } else if (moduleId === 'notas') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Lançar Nota</h3>
          <form class="demo-form" data-form="notas-prof">
            <label>Aluno<input name="aluno" required></label>
            <label>Atividade<select name="atividade">${state.dados.atividadesProf.map(a => `<option value="${a.titulo}">${a.titulo}</option>`).join('')}</select></label>
            <label>Nota<input name="nota" type="number" min="0" max="10" step="0.1" required></label>
            <button type="submit" class="btn btn--primary">Registrar</button>
          </form>
        </div>
      `;
    } else if (moduleId === 'frequencia') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Lançar Frequência</h3>
          <form class="demo-form" data-form="frequencia-prof">
            <label>Aluno<input name="aluno" required></label>
            <label>Turma<select name="turma">${state.dados.turmas.map(t => `<option value="${t.nome}">${t.nome}</option>`).join('')}</select></label>
            <label>Data<input name="data" type="date" required></label>
            <label>Status<select name="status"><option value="P">Presente</option><option value="F">Falta</option></select></label>
            <button type="submit" class="btn btn--primary">Registrar</button>
          </form>
        </div>
      `;
    } else if (moduleId === 'diario') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Registrar no Diário</h3>
          <form class="demo-form" data-form="diario">
            <label>Data<input name="data" type="date" required></label>
            <label>Anotação<textarea name="anotacao" rows="4" required></textarea></label>
            <button type="submit" class="btn btn--primary">Salvar</button>
          </form>
        </div>
      `;
    } else if (moduleId === 'aulas') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Registrar Aula</h3>
          <form class="demo-form" data-form="aulas">
            <label>Matéria<input name="materia" required></label>
            <label>Data<input name="data" type="date" required></label>
            <label>Horário<input name="horario" type="time" required></label>
            <button type="submit" class="btn btn--primary">Registrar</button>
          </form>
        </div>
      `;
    } else if (moduleId === 'atividades-aluno') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Enviar Atividade</h3>
          <form class="demo-form" data-form="atividades-aluno">
            <label>Atividade<select name="atividade">${state.dados.atividadesProf.map(a => `<option value="${a.titulo}">${a.titulo}</option>`).join('')}</select></label>
            <label>Arquivo<input name="arquivo" type="file"></label>
            <label>Observações<textarea name="observacoes" rows="3"></textarea></label>
            <button type="submit" class="btn btn--primary">Enviar</button>
          </form>
        </div>
      `;
    } else if (moduleId === 'avaliacoes') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Registrar Avaliação</h3>
          <form class="demo-form" data-form="avaliacoes">
            <label>Matéria<input name="materia" required></label>
            <label>Data<input name="data" type="date" required></label>
            <label>Nota<input name="nota" type="number" min="0" max="10" step="0.1" required></label>
            <button type="submit" class="btn btn--primary">Registrar</button>
          </form>
        </div>
      `;
    }
    return '<p>Módulo não encontrado.</p>';
  }

  function renderListar(moduleId) {
    if (moduleId === 'professores') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Professores Cadastrados (${state.dados.professores.length})</h3>
          <div class="demo-table demo-table--scroll">
            <div class="demo-row demo-row--header">
              <span>Nome</span>
              <span>E-mail</span>
            </div>
            ${state.dados.professores.length > 0 
              ? state.dados.professores.map(prof => `
                <div class="demo-row">
                  <span>${prof.nome}</span>
                  <span>${prof.email}</span>
                </div>
              `).join('')
              : '<div class="demo-row"><span colspan="2">Nenhum professor cadastrado.</span></div>'
            }
          </div>
        </div>
      `;
    } else if (moduleId === 'alunos') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Alunos Cadastrados (${state.dados.alunos.length})</h3>
          <div class="demo-table demo-table--scroll">
            <div class="demo-row demo-row--header">
              <span>Nome</span>
              <span>E-mail</span>
              <span>Matrícula</span>
              <span>Turma</span>
            </div>
            ${state.dados.alunos.length > 0
              ? state.dados.alunos.map(aluno => `
                <div class="demo-row">
                  <span>${aluno.nome}</span>
                  <span>${aluno.email}</span>
                  <span>${aluno.matricula}</span>
                  <span>${aluno.turma}</span>
                </div>
              `).join('')
              : '<div class="demo-row"><span colspan="4">Nenhum aluno cadastrado.</span></div>'
            }
          </div>
        </div>
      `;
    } else if (moduleId === 'cursos') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Cursos Cadastrados (${state.dados.cursos.length})</h3>
          <div class="demo-table demo-table--scroll">
            <div class="demo-row demo-row--header">
              <span>Nome do Curso</span>
            </div>
            ${state.dados.cursos.length > 0
              ? state.dados.cursos.map(curso => `
                <div class="demo-row">
                  <span>${curso.nome}</span>
                </div>
              `).join('')
              : '<div class="demo-row"><span>Nenhum curso cadastrado.</span></div>'
            }
          </div>
        </div>
      `;
    } else if (moduleId === 'turmas') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Turmas Cadastradas (${state.dados.turmas.length})</h3>
          <div class="demo-table demo-table--scroll">
            <div class="demo-row demo-row--header">
              <span>Nome</span>
              <span>Curso</span>
              <span>Alunos</span>
            </div>
            ${state.dados.turmas.length > 0
              ? state.dados.turmas.map(turma => `
                <div class="demo-row">
                  <span>${turma.nome}</span>
                  <span>${turma.curso || 'N/A'}</span>
                  <span>${turma.alunos || 0}</span>
                </div>
              `).join('')
              : '<div class="demo-row"><span colspan="3">Nenhuma turma cadastrada.</span></div>'
            }
          </div>
        </div>
      `;
    } else if (moduleId === 'turmas-prof') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Turmas Atribuídas (${state.dados.turmas.length})</h3>
          <div class="demo-table demo-table--scroll">
            <div class="demo-row demo-row--header">
              <span>Nome</span>
              <span>Curso</span>
              <span>Alunos</span>
            </div>
            ${state.dados.turmas.length > 0
              ? state.dados.turmas.map(turma => `
                <div class="demo-row">
                  <span>${turma.nome}</span>
                  <span>${turma.curso || 'N/A'}</span>
                  <span>${turma.alunos || 0} alunos</span>
                </div>
              `).join('')
              : '<div class="demo-row"><span colspan="3">Nenhuma turma atribuída.</span></div>'
            }
          </div>
        </div>
      `;
    } else if (moduleId === 'atividades') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Atividades Publicadas (${state.dados.atividadesProf.length})</h3>
          <div class="demo-table demo-table--scroll">
            <div class="demo-row demo-row--header">
              <span>Título</span>
              <span>Turma</span>
              <span>Data de Entrega</span>
            </div>
            ${state.dados.atividadesProf.length > 0
              ? state.dados.atividadesProf.map(atividade => `
                <div class="demo-row">
                  <span>${atividade.titulo}</span>
                  <span>${atividade.turma}</span>
                  <span>${atividade.data}</span>
                </div>
              `).join('')
              : '<div class="demo-row"><span colspan="3">Nenhuma atividade publicada.</span></div>'
            }
          </div>
        </div>
      `;
    } else if (moduleId === 'notas') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Notas Lançadas (${state.dados.notasProf.length})</h3>
          <div class="demo-table demo-table--scroll">
            <div class="demo-row demo-row--header">
              <span>Aluno</span>
              <span>Atividade</span>
              <span>Nota</span>
            </div>
            ${state.dados.notasProf.length > 0
              ? state.dados.notasProf.map(nota => `
                <div class="demo-row">
                  <span>${nota.aluno}</span>
                  <span>${nota.atividade}</span>
                  <span>${nota.nota}</span>
                </div>
              `).join('')
              : '<div class="demo-row"><span colspan="3">Nenhuma nota lançada.</span></div>'
            }
          </div>
        </div>
      `;
    } else if (moduleId === 'frequencia') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Marcações de Frequência (${state.dados.frequenciaProf.length})</h3>
          <div class="demo-table demo-table--scroll">
            <div class="demo-row demo-row--header">
              <span>Aluno</span>
              <span>Turma</span>
              <span>Data</span>
              <span>Status</span>
            </div>
            ${state.dados.frequenciaProf.length > 0
              ? state.dados.frequenciaProf.map(freq => `
                <div class="demo-row">
                  <span>${freq.aluno}</span>
                  <span>${freq.turma}</span>
                  <span>${freq.data}</span>
                  <span>${freq.status === 'P' ? 'Presente' : 'Falta'}</span>
                </div>
              `).join('')
              : '<div class="demo-row"><span colspan="4">Nenhuma marcação registrada.</span></div>'
            }
          </div>
        </div>
      `;
    } else if (moduleId === 'diario') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Informações Pessoais</h3>
          <div class="demo-table demo-table--scroll">
            <div class="demo-row demo-row--header">
              <span>Campo</span>
              <span>Valor</span>
            </div>
            <div class="demo-row">
              <span>Nome</span>
              <span>Aluno Bruno</span>
            </div>
            <div class="demo-row">
              <span>Matrícula</span>
              <span>A20240001</span>
            </div>
            <div class="demo-row">
              <span>Curso</span>
              <span>Engenharia de Software</span>
            </div>
            <div class="demo-row">
              <span>Turma</span>
              <span>2024-A</span>
            </div>
          </div>
        </div>
      `;
    } else if (moduleId === 'aulas') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Minhas Aulas (${state.dados.aulasAluno.length})</h3>
          <div class="demo-table demo-table--scroll">
            <div class="demo-row demo-row--header">
              <span>Dia</span>
              <span>Matéria</span>
              <span>Horário</span>
              <span>Professor</span>
            </div>
            ${state.dados.aulasAluno.length > 0
              ? state.dados.aulasAluno.map(aula => `
                <div class="demo-row">
                  <span>${aula.dia}</span>
                  <span>${aula.materia}</span>
                  <span>${aula.horario}</span>
                  <span>${aula.professor}</span>
                </div>
              `).join('')
              : '<div class="demo-row"><span colspan="4">Nenhuma aula registrada.</span></div>'
            }
          </div>
        </div>
      `;
    } else if (moduleId === 'atividades-aluno') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Atividades Pendentes (${state.dados.atividadesAluno.length})</h3>
          <div class="demo-table demo-table--scroll">
            <div class="demo-row demo-row--header">
              <span>Título</span>
              <span>Tipo</span>
              <span>Entrega</span>
              <span>Status</span>
            </div>
            ${state.dados.atividadesAluno.length > 0
              ? state.dados.atividadesAluno.map(atividade => `
                <div class="demo-row">
                  <span>${atividade.titulo}</span>
                  <span>${atividade.tipo}</span>
                  <span>${atividade.entrega}</span>
                  <span>${atividade.status}</span>
                </div>
              `).join('')
              : '<div class="demo-row"><span colspan="4">Nenhuma atividade pendente.</span></div>'
            }
          </div>
        </div>
      `;
    } else if (moduleId === 'avaliacoes') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Desempenho Acadêmico (${state.dados.desempenhoAluno.length})</h3>
          <div class="demo-table demo-table--scroll">
            <div class="demo-row demo-row--header">
              <span>Matéria</span>
              <span>Nota</span>
              <span>Status</span>
              <span>Faltas</span>
            </div>
            ${state.dados.desempenhoAluno.length > 0
              ? state.dados.desempenhoAluno.map(desempenho => `
                <div class="demo-row">
                  <span>${desempenho.materia}</span>
                  <span>${desempenho.nota}</span>
                  <span>${desempenho.status}</span>
                  <span>${desempenho.faltas}</span>
                </div>
              `).join('')
              : '<div class="demo-row"><span colspan="4">Nenhum desempenho registrado.</span></div>'
            }
          </div>
        </div>
      `;
    }
    return '<p>Módulo não encontrado.</p>';
  }

  function renderApagar(moduleId) {
    if (moduleId === 'professores') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Apagar Professor</h3>
          <p>Selecione o professor que deseja remover:</p>
          <div class="demo-table demo-table--scroll">
            <div class="demo-row demo-row--header">
              <span>Nome</span>
              <span>E-mail</span>
              <span>Ação</span>
            </div>
            ${state.dados.professores.length > 0
              ? state.dados.professores.map(prof => `
                <div class="demo-row">
                  <span>${prof.nome}</span>
                  <span>${prof.email}</span>
                  <span><button class="btn btn--danger" data-remove="professor" data-email="${prof.email}">Excluir</button></span>
                </div>
              `).join('')
              : '<div class="demo-row"><span colspan="3">Nenhum professor cadastrado.</span></div>'
            }
          </div>
        </div>
      `;
    } else if (moduleId === 'alunos') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Apagar Aluno</h3>
          <p>Selecione o aluno que deseja remover:</p>
          <div class="demo-table demo-table--scroll">
            <div class="demo-row demo-row--header">
              <span>Nome</span>
              <span>E-mail</span>
              <span>Ação</span>
            </div>
            ${state.dados.alunos.length > 0
              ? state.dados.alunos.map(aluno => `
                <div class="demo-row">
                  <span>${aluno.nome}</span>
                  <span>${aluno.email}</span>
                  <span><button class="btn btn--danger" data-remove="aluno" data-email="${aluno.email}">Excluir</button></span>
                </div>
              `).join('')
              : '<div class="demo-row"><span colspan="3">Nenhum aluno cadastrado.</span></div>'
            }
          </div>
        </div>
      `;
    } else if (moduleId === 'cursos') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Apagar Curso</h3>
          <p>Selecione o curso que deseja remover:</p>
          <div class="demo-table demo-table--scroll">
            <div class="demo-row demo-row--header">
              <span>Nome do Curso</span>
              <span>Ação</span>
            </div>
            ${state.dados.cursos.length > 0
              ? state.dados.cursos.map(curso => `
                <div class="demo-row">
                  <span>${curso.nome}</span>
                  <span><button class="btn btn--danger" data-remove="curso" data-id="${curso.id}">Excluir</button></span>
                </div>
              `).join('')
              : '<div class="demo-row"><span colspan="2">Nenhum curso cadastrado.</span></div>'
            }
          </div>
        </div>
      `;
    } else if (moduleId === 'turmas') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Apagar Turma</h3>
          <p>Selecione a turma que deseja remover:</p>
          <div class="demo-table demo-table--scroll">
            <div class="demo-row demo-row--header">
              <span>Nome</span>
              <span>Curso</span>
              <span>Ação</span>
            </div>
            ${state.dados.turmas.length > 0
              ? state.dados.turmas.map(turma => `
                <div class="demo-row">
                  <span>${turma.nome}</span>
                  <span>${turma.curso}</span>
                  <span><button class="btn btn--danger" data-remove="turma" data-id="${turma.id}">Excluir</button></span>
                </div>
              `).join('')
              : '<div class="demo-row"><span colspan="3">Nenhuma turma cadastrada.</span></div>'
            }
          </div>
        </div>
      `;
    } else if (moduleId === 'turmas-prof') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Remover Aluno da Turma</h3>
          <p>Selecione o aluno que deseja remover:</p>
          <div class="demo-table demo-table--scroll">
            <div class="demo-row demo-row--header">
              <span>Aluno</span>
              <span>Turma</span>
              <span>Ação</span>
            </div>
            ${state.dados.alunos.length > 0
              ? state.dados.alunos.map(aluno => `
                <div class="demo-row">
                  <span>${aluno.nome}</span>
                  <span>${aluno.turma}</span>
                  <span><button class="btn btn--danger" data-remove="aluno-turma" data-email="${aluno.email}">Remover</button></span>
                </div>
              `).join('')
              : '<div class="demo-row"><span colspan="3">Nenhum aluno cadastrado.</span></div>'
            }
          </div>
        </div>
      `;
    } else if (moduleId === 'atividades') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Apagar Atividade</h3>
          <p>Selecione a atividade que deseja remover:</p>
          <div class="demo-table demo-table--scroll">
            <div class="demo-row demo-row--header">
              <span>Título</span>
              <span>Turma</span>
              <span>Ação</span>
            </div>
            ${state.dados.atividadesProf.length > 0
              ? state.dados.atividadesProf.map(atividade => `
                <div class="demo-row">
                  <span>${atividade.titulo}</span>
                  <span>${atividade.turma}</span>
                  <span><button class="btn btn--danger" data-remove="atividade" data-id="${atividade.id}">Excluir</button></span>
                </div>
              `).join('')
              : '<div class="demo-row"><span colspan="3">Nenhuma atividade publicada.</span></div>'
            }
          </div>
        </div>
      `;
    } else if (moduleId === 'notas') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Apagar Nota</h3>
          <p>Selecione a nota que deseja remover:</p>
          <div class="demo-table demo-table--scroll">
            <div class="demo-row demo-row--header">
              <span>Aluno</span>
              <span>Atividade</span>
              <span>Ação</span>
            </div>
            ${state.dados.notasProf.length > 0
              ? state.dados.notasProf.map(nota => `
                <div class="demo-row">
                  <span>${nota.aluno}</span>
                  <span>${nota.atividade}</span>
                  <span><button class="btn btn--danger" data-remove="nota" data-id="${nota.id}">Excluir</button></span>
                </div>
              `).join('')
              : '<div class="demo-row"><span colspan="3">Nenhuma nota lançada.</span></div>'
            }
          </div>
        </div>
      `;
    } else if (moduleId === 'frequencia') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Apagar Marcação de Frequência</h3>
          <p>Selecione a marcação que deseja remover:</p>
          <div class="demo-table demo-table--scroll">
            <div class="demo-row demo-row--header">
              <span>Aluno</span>
              <span>Data</span>
              <span>Ação</span>
            </div>
            ${state.dados.frequenciaProf.length > 0
              ? state.dados.frequenciaProf.map(freq => `
                <div class="demo-row">
                  <span>${freq.aluno}</span>
                  <span>${freq.data}</span>
                  <span><button class="btn btn--danger" data-remove="frequencia" data-id="${freq.id}">Excluir</button></span>
                </div>
              `).join('')
              : '<div class="demo-row"><span colspan="3">Nenhuma marcação registrada.</span></div>'
            }
          </div>
        </div>
      `;
    } else if (moduleId === 'diario') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Apagar Registro do Diário</h3>
          <p>Funcionalidade de exclusão de registros do diário (simulação).</p>
          <div class="demo-table demo-table--scroll">
            <div class="demo-row demo-row--header">
              <span>Data</span>
              <span>Ação</span>
            </div>
            <div class="demo-row">
              <span>Nenhum registro disponível para exclusão.</span>
              <span>-</span>
            </div>
          </div>
        </div>
      `;
    } else if (moduleId === 'aulas') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Remover Aula</h3>
          <p>Selecione a aula que deseja remover:</p>
          <div class="demo-table demo-table--scroll">
            <div class="demo-row demo-row--header">
              <span>Matéria</span>
              <span>Data</span>
              <span>Ação</span>
            </div>
            ${state.dados.aulasAluno.length > 0
              ? state.dados.aulasAluno.map((aula, index) => `
                <div class="demo-row">
                  <span>${aula.materia}</span>
                  <span>${aula.dia}</span>
                  <span><button class="btn btn--danger" data-remove="aula" data-id="${index}">Remover</button></span>
                </div>
              `).join('')
              : '<div class="demo-row"><span colspan="3">Nenhuma aula registrada.</span></div>'
            }
          </div>
        </div>
      `;
    } else if (moduleId === 'atividades-aluno') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Cancelar Envio de Atividade</h3>
          <p>Selecione a atividade que deseja cancelar:</p>
          <div class="demo-table demo-table--scroll">
            <div class="demo-row demo-row--header">
              <span>Título</span>
              <span>Status</span>
              <span>Ação</span>
            </div>
            ${state.dados.atividadesAluno.length > 0
              ? state.dados.atividadesAluno.map((atividade, index) => `
                <div class="demo-row">
                  <span>${atividade.titulo}</span>
                  <span>${atividade.status}</span>
                  <span><button class="btn btn--danger" data-remove="atividade-aluno" data-id="${index}">Cancelar</button></span>
                </div>
              `).join('')
              : '<div class="demo-row"><span colspan="3">Nenhuma atividade enviada.</span></div>'
            }
          </div>
        </div>
      `;
    } else if (moduleId === 'avaliacoes') {
      return `
        <div class="demo-card demo-card--full">
          <h3>Remover Avaliação</h3>
          <p>Funcionalidade de remoção de avaliações (simulação).</p>
          <div class="demo-table demo-table--scroll">
            <div class="demo-row demo-row--header">
              <span>Matéria</span>
              <span>Nota</span>
              <span>Ação</span>
            </div>
            ${state.dados.desempenhoAluno.length > 0
              ? state.dados.desempenhoAluno.map((desempenho, index) => `
                <div class="demo-row">
                  <span>${desempenho.materia}</span>
                  <span>${desempenho.nota}</span>
                  <span><button class="btn btn--danger" data-remove="avaliacao" data-id="${index}">Remover</button></span>
                </div>
              `).join('')
              : '<div class="demo-row"><span colspan="3">Nenhuma avaliação registrada.</span></div>'
            }
          </div>
        </div>
      `;
    }
    return '<p>Módulo não encontrado.</p>';
  }

  function goBack() {
    const content = document.getElementById('demo-content');
    if (!content) return;
    
    if (navigationState.currentAction) {
      // Voltar para menu de ações do módulo
      content.innerHTML = renderModuleActions(navigationState.currentModule);
      navigationState.currentAction = null;
      attachActionCardEvents();
    } else if (navigationState.currentModule) {
      // Voltar para dashboard
      navigationState.currentModule = null;
      content.innerHTML = renderDashboard();
      document.querySelectorAll('.demo-sidebar__item').forEach(item => {
        if (item.dataset.section === 'dashboard') {
          item.classList.add('is-active');
        } else {
          item.classList.remove('is-active');
        }
      });
    }
  }

  function goBackToModule() {
    const content = document.getElementById('demo-content');
    if (!content) return;
    
    if (navigationState.currentModule) {
      content.innerHTML = renderModuleActions(navigationState.currentModule);
      navigationState.currentAction = null;
      attachActionCardEvents();
    }
  }

  /* Renderizadores de Seções (placeholders) */

  function renderProfessores() {
    return `
      <div class="demo-grid demo-grid--two">
        <div class="demo-card">
          <h3>Cadastrar professor</h3>
          <form class="demo-form" data-form="professores">
            <label>Nome completo<input name="nome" required></label>
            <label>E-mail institucional<input name="email" type="email" required placeholder="nome@professor.educa"></label>
            <label>Senha inicial<input name="senha" required placeholder="Min. 6 caracteres"></label>
            <button class="btn btn--primary">Salvar cadastro</button>
          </form>
        </div>
        <div class="demo-card">
          <h3>Professores listados (${state.dados.professores.length})</h3>
          <div class="demo-table demo-table--scroll">
            ${state.dados.professores
              .map(
                prof => `
                <div class="demo-row">
                  <span>${prof.nome}</span>
                  <span>${prof.email}</span>
                  <span><button data-remove="professor" data-email="${prof.email}">Excluir</button></span>
                </div>
              `,
              )
              .join('')}
          </div>
        </div>
      </div>
    `;
  }

  function renderAlunos() {
    return `
      <div class="demo-grid demo-grid--two">
        <div class="demo-card">
          <h3>Cadastrar aluno</h3>
          <form class="demo-form" data-form="alunos">
            <label>Nome completo<input name="nome" required></label>
            <label>E-mail institucional<input name="email" type="email" required placeholder="nome@aluno.educa"></label>
            <label>Matrícula<input name="matricula" required></label>
            <label>Turma<input name="turma" required></label>
            <button class="btn btn--primary">Salvar cadastro</button>
          </form>
        </div>
        <div class="demo-card">
          <h3>Alunos listados (${state.dados.alunos.length})</h3>
          <div class="demo-table demo-table--scroll">
            ${state.dados.alunos
              .map(
                aluno => `
                <div class="demo-row">
                  <span>${aluno.nome} — ${aluno.turma}</span>
                  <span>${aluno.email}</span>
                  <span><button data-remove="aluno" data-email="${aluno.email}">Excluir</button></span>
                </div>
              `,
              )
              .join('')}
          </div>
        </div>
      </div>
    `;
  }

  function renderCursos() {
    return `
      <div class="demo-grid demo-grid--two">
        <div class="demo-card">
          <h3>Cadastro de cursos</h3>
          <form class="demo-form" data-form="cursos">
            <label>Nome do curso<input name="nome" required></label>
            <button class="btn btn--primary">Salvar</button>
          </form>
        </div>
        <div class="demo-card">
          <h3>Cursos ativos (${state.dados.cursos.length})</h3>
          <div class="demo-table demo-table--scroll">
            ${state.dados.cursos
              .map(
                curso => `
                <div class="demo-row">
                  <span>${curso.nome}</span>
                  <span><button data-remove="curso" data-id="${curso.id}">Excluir</button></span>
                </div>
              `,
              )
              .join('')}
          </div>
        </div>
      </div>
    `;
  }

  function renderTurmas() {
    return `
      <div class="demo-grid demo-grid--two">
        <div class="demo-card">
          <h3>Cadastrar turma</h3>
          <form class="demo-form" data-form="turmas">
            <label>Nome<input name="nome" required placeholder="2024-A"></label>
            <label>Curso<input name="curso" required></label>
            <label>Total de alunos<input name="alunos" type="number" min="0" required></label>
            <button class="btn btn--primary">Salvar</button>
          </form>
        </div>
        <div class="demo-card">
          <h3>Turmas cadastradas (${state.dados.turmas.length})</h3>
          <div class="demo-table demo-table--scroll">
            ${state.dados.turmas
              .map(
                turma => `
                <div class="demo-row">
                  <span>${turma.nome}</span>
                  <span>${turma.curso}</span>
                  <span>${turma.alunos} alunos</span>
                  <span><button data-remove="turma" data-id="${turma.id}">Excluir</button></span>
                </div>
              `,
              )
              .join('')}
          </div>
        </div>
      </div>
    `;
  }

  function renderUsuarios() {
    const total = state.dados.usuariosLogados.length;
    return `
      <div class="demo-card">
        <h3>Perfis logados (${total})</h3>
        <p>Lista simulada para replicar a tela do coordenador. O tempo online é calculado com base no momento do login.</p>
        <div class="demo-table">
          ${state.dados.usuariosLogados
            .map(user => {
              const tempo = formatTempoOnline(user.timestamp);
              return `
                <div class="demo-row">
                  <span>${user.email}</span>
                  <span>${user.perfil}</span>
                  <span>${new Date(user.timestamp).toLocaleTimeString()}</span>
                  <span>${tempo}</span>
                </div>
              `;
            })
            .join('') || '<p>Ninguém conectado.</p>'}
        </div>
      </div>
    `;
  }

  function renderTurmasProf() {
    return `
      <div class="demo-grid demo-grid--two">
        <div class="demo-card">
          <h3>Turmas atribuídas</h3>
          <p>Dados simulados das turmas do professor logado.</p>
          <div class="demo-table demo-table--scroll">
            ${state.dados.turmas
              .map(
                turma => `
                <div class="demo-row">
                  <span>${turma.nome}</span>
                  <span>${turma.curso}</span>
                  <span>${turma.alunos} alunos</span>
                </div>
              `,
              )
              .join('')}
          </div>
        </div>
        <div class="demo-card">
          <h3>Adicionar aluno à turma</h3>
          <form class="demo-form" data-form="turmas-prof">
            <label>Aluno<input name="aluno" required></label>
            <label>Turma<select name="turma">${state.dados.turmas
              .map(t => `<option value="${t.nome}">${t.nome}</option>`)
              .join('')}</select></label>
            <button class="btn btn--primary">Matricular (simulação)</button>
          </form>
        </div>
      </div>
    `;
  }

  function renderAtividadesProf() {
    return `
      <div class="demo-grid demo-grid--two">
        <div class="demo-card">
          <h3>Postar atividade</h3>
          <form class="demo-form" data-form="atividades-prof">
            <label>Título<input name="titulo" required></label>
            <label>Turma<select name="turma">${state.dados.turmas
              .map(t => `<option value="${t.nome}">${t.nome}</option>`)
              .join('')}</select></label>
            <label>Data de entrega<input name="data" type="date" required></label>
            <button class="btn btn--primary">Publicar</button>
          </form>
        </div>
        <div class="demo-card">
          <h3>Atividades publicadas (${state.dados.atividadesProf.length})</h3>
          <div class="demo-table demo-table--scroll">
            ${state.dados.atividadesProf
              .map(
                atividade => `
                <div class="demo-row">
                  <span>${atividade.titulo}</span>
                  <span>${atividade.turma}</span>
                  <span>${atividade.data}</span>
                </div>
              `,
              )
              .join('')}
          </div>
        </div>
      </div>
    `;
  }

  function renderNotasProf() {
    return `
      <div class="demo-grid demo-grid--two">
        <div class="demo-card">
          <h3>Lançar nota</h3>
          <form class="demo-form" data-form="notas-prof">
            <label>Aluno<input name="aluno" required></label>
            <label>Atividade<select name="atividade">${state.dados.atividadesProf
              .map(a => `<option value="${a.titulo}">${a.titulo}</option>`)
              .join('')}</select></label>
            <label>Nota<input name="nota" type="number" min="0" max="10" step="0.1" required></label>
            <button class="btn btn--primary">Registrar</button>
          </form>
        </div>
        <div class="demo-card">
          <h3>Notas lançadas (${state.dados.notasProf.length})</h3>
          <div class="demo-table demo-table--scroll">
            ${state.dados.notasProf
              .map(
                nota => `
                <div class="demo-row">
                  <span>${nota.aluno}</span>
                  <span>${nota.atividade}</span>
                  <span>${nota.nota}</span>
                </div>
              `,
              )
              .join('')}
          </div>
        </div>
      </div>
    `;
  }

  function renderFrequenciaProf() {
    return `
      <div class="demo-grid demo-grid--two">
        <div class="demo-card">
          <h3>Lançar frequência</h3>
          <form class="demo-form" data-form="frequencia-prof">
            <label>Aluno<input name="aluno" required></label>
            <label>Turma<select name="turma">${state.dados.turmas
              .map(t => `<option value="${t.nome}">${t.nome}</option>`)
              .join('')}</select></label>
            <label>Data<input name="data" type="date" required></label>
            <label>Status<select name="status"><option value="P">Presente</option><option value="F">Falta</option></select></label>
            <button class="btn btn--primary">Registrar</button>
          </form>
        </div>
        <div class="demo-card">
          <h3>Marcações recentes (${state.dados.frequenciaProf.length})</h3>
          <div class="demo-table demo-table--scroll">
            ${state.dados.frequenciaProf
              .map(
                freq => `
                <div class="demo-row">
                  <span>${freq.aluno}</span>
                  <span>${freq.turma}</span>
                  <span>${freq.data}</span>
                  <span>${freq.status}</span>
                </div>
              `,
              )
              .join('')}
          </div>
        </div>
      </div>
    `;
  }

  function renderChat() {
    const mensagens = state.mensagensChat;
    return `
      <div class="demo-card">
        <h3>Chat institucional</h3>
        <div class="demo-chat" data-chat-history>
          ${mensagens.map(msg => `<p><strong>${msg.perfil}:</strong> ${msg.texto}</p>`).join('')}
        </div>
        <form class="demo-form" data-form="chat">
          <label>Mensagem<textarea name="mensagem" rows="2" required></textarea></label>
          <div class="demo-chat__actions">
            <button class="btn btn--primary">Enviar</button>
            <button type="button" class="btn btn--secondary" data-action="limpar-chat">Limpar histórico</button>
          </div>
        </form>
      </div>
    `;
  }

  function renderDiarioAluno() {
    return `
      <div class="demo-grid demo-grid--two">
        <div class="demo-card">
          <h3>Informações pessoais</h3>
          <div class="demo-table">
            <div class="demo-row"><span>Nome</span><span>Aluno Bruno</span></div>
            <div class="demo-row"><span>Matrícula</span><span>A20240001</span></div>
            <div class="demo-row"><span>Curso</span><span>Engenharia de Software</span></div>
            <div class="demo-row"><span>Turma</span><span>2024-A</span></div>
          </div>
        </div>
        <div class="demo-card">
          <h3>Notas e frequência</h3>
          <div class="demo-table demo-table--scroll">
            ${state.dados.desempenhoAluno
              .map(
                item => `
                <div class="demo-row">
                  <span>${item.materia}</span>
                  <span>Nota: ${item.nota}</span>
                  <span>${item.status}</span>
                </div>
              `,
              )
              .join('')}
          </div>
        </div>
      </div>
    `;
  }

  function renderAulasAluno() {
    return `
      <div class="demo-card">
        <h3>Minhas aulas</h3>
        <div class="demo-table demo-table--scroll">
          ${state.dados.aulasAluno
            .map(
              aula => `
              <div class="demo-row">
                <span>${aula.dia}</span>
                <span>${aula.materia}</span>
                <span>${aula.horario}</span>
                <span>${aula.professor} • Sala ${aula.sala}</span>
              </div>
            `,
            )
            .join('')}
        </div>
      </div>
    `;
  }

  function renderAtividadesAluno() {
    return `
      <div class="demo-card">
        <h3>Atividades pendentes</h3>
        <div class="demo-table demo-table--scroll">
          ${state.dados.atividadesAluno
            .map(
              atividade => `
              <div class="demo-row">
                <span>${atividade.titulo}</span>
                <span>${atividade.tipo}</span>
                <span>Entrega: ${atividade.entrega}</span>
                <span>${atividade.status}</span>
              </div>
            `,
            )
            .join('')}
        </div>
      </div>
    `;
  }

  function renderAvaliacoesAluno() {
    return `
      <div class="demo-grid demo-grid--two">
        <div class="demo-card">
          <h3>Desempenho acadêmico</h3>
          <div class="demo-table demo-table--scroll">
            ${state.dados.desempenhoAluno
              .map(
                desempenho => `
                <div class="demo-row">
                  <span>${desempenho.materia}</span>
                  <span>Nota: ${desempenho.nota}</span>
                  <span>${desempenho.status}</span>
                  <span>Faltas: ${desempenho.faltas}</span>
                </div>
              `,
              )
              .join('')}
          </div>
        </div>
        <div class="demo-card">
          <h3>Frequência detalhada</h3>
          <div class="demo-table demo-table--scroll">
            ${state.dados.frequenciaAluno
              .map(
                freq => `
                <div class="demo-row">
                  <span>${freq.materia}</span>
                  <span>${freq.percentual}</span>
                  <span>${freq.presencas}/${freq.total} presenças</span>
                  <span>Faltas: ${freq.faltas}</span>
                </div>
              `,
              )
              .join('')}
          </div>
        </div>
      </div>
    `;
  }

  function attachCoordenadorHandlers(moduleId, action) {
    if (action === 'cadastrar') {
      const form = document.querySelector(`[data-form="${moduleId}"]`);
      if (form) {
        form.addEventListener('submit', event => {
          event.preventDefault();
          const data = new FormData(form);
          
          if (moduleId === 'professores') {
            state.dados.professores.push({
              id: Date.now(),
              nome: data.get('nome'),
              email: data.get('email'),
            });
          } else if (moduleId === 'alunos') {
            state.dados.alunos.push({
              matricula: data.get('matricula'),
              nome: data.get('nome'),
              email: data.get('email'),
              turma: data.get('turma'),
            });
          } else if (moduleId === 'cursos') {
            state.dados.cursos.push({
              id: Date.now(),
              nome: data.get('nome'),
            });
          } else if (moduleId === 'turmas') {
            const cursoId = data.get('curso');
            const curso = state.dados.cursos.find(c => c.id === Number(cursoId));
            state.dados.turmas.push({
              id: Date.now(),
              nome: data.get('nome'),
              curso: curso ? curso.nome : '',
              alunos: Number(data.get('alunos')),
            });
          }
          
          // Recarregar a tela de cadastrar
          const content = document.getElementById('demo-content');
          if (content) {
            content.innerHTML = renderActionScreen(moduleId, action);
            attachSectionHandlers(moduleId);
          }
          form.reset();
        });
      }
    } else if (action === 'apagar') {
      document.querySelectorAll('[data-remove="professor"]').forEach(btn => {
        btn.addEventListener('click', () => {
          state.dados.professores = state.dados.professores.filter(p => p.email !== btn.dataset.email);
          const content = document.getElementById('demo-content');
          if (content) {
            content.innerHTML = renderActionScreen(moduleId, action);
            attachSectionHandlers(moduleId);
          }
        });
      });

      document.querySelectorAll('[data-remove="aluno"]').forEach(btn => {
        btn.addEventListener('click', () => {
          state.dados.alunos = state.dados.alunos.filter(a => a.email !== btn.dataset.email);
          const content = document.getElementById('demo-content');
          if (content) {
            content.innerHTML = renderActionScreen(moduleId, action);
            attachSectionHandlers(moduleId);
          }
        });
      });

      document.querySelectorAll('[data-remove="curso"]').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = Number(btn.dataset.id);
          state.dados.cursos = state.dados.cursos.filter(c => c.id !== id);
          const content = document.getElementById('demo-content');
          if (content) {
            content.innerHTML = renderActionScreen(moduleId, action);
            attachSectionHandlers(moduleId);
          }
        });
      });

      document.querySelectorAll('[data-remove="turma"]').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = Number(btn.dataset.id);
          state.dados.turmas = state.dados.turmas.filter(t => t.id !== id);
          const content = document.getElementById('demo-content');
          if (content) {
            content.innerHTML = renderActionScreen(moduleId, action);
            attachSectionHandlers(moduleId);
          }
        });
      });
    }
  }

  function attachProfessorHandlers(moduleId, action) {
    if (action === 'cadastrar') {
      const form = document.querySelector(`[data-form="${moduleId}"]`);
      if (form) {
        form.addEventListener('submit', event => {
          event.preventDefault();
          const data = new FormData(form);
          
          if (moduleId === 'turmas-prof') {
            alert('Aluno vinculado à turma (simulação).');
          } else if (moduleId === 'atividades') {
            state.dados.atividadesProf.push({
              id: Date.now(),
              titulo: data.get('titulo'),
              turma: data.get('turma'),
              data: data.get('data'),
            });
          } else if (moduleId === 'notas') {
            state.dados.notasProf.push({
              id: Date.now(),
              aluno: data.get('aluno'),
              atividade: data.get('atividade'),
              nota: data.get('nota'),
            });
          } else if (moduleId === 'frequencia') {
            state.dados.frequenciaProf.push({
              id: Date.now(),
              aluno: data.get('aluno'),
              turma: data.get('turma'),
              data: data.get('data'),
              status: data.get('status'),
            });
          }
          
          const content = document.getElementById('demo-content');
          if (content) {
            content.innerHTML = renderActionScreen(moduleId, action);
            attachSectionHandlers(moduleId);
          }
          form.reset();
        });
      }
    } else if (action === 'apagar') {
      document.querySelectorAll('[data-remove="atividade"]').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = Number(btn.dataset.id);
          state.dados.atividadesProf = state.dados.atividadesProf.filter(a => a.id !== id);
          const content = document.getElementById('demo-content');
          if (content) {
            content.innerHTML = renderActionScreen(moduleId, action);
            attachSectionHandlers(moduleId);
          }
        });
      });

      document.querySelectorAll('[data-remove="nota"]').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = Number(btn.dataset.id);
          state.dados.notasProf = state.dados.notasProf.filter(n => n.id !== id);
          const content = document.getElementById('demo-content');
          if (content) {
            content.innerHTML = renderActionScreen(moduleId, action);
            attachSectionHandlers(moduleId);
          }
        });
      });

      document.querySelectorAll('[data-remove="frequencia"]').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = Number(btn.dataset.id);
          state.dados.frequenciaProf = state.dados.frequenciaProf.filter(f => f.id !== id);
          const content = document.getElementById('demo-content');
          if (content) {
            content.innerHTML = renderActionScreen(moduleId, action);
            attachSectionHandlers(moduleId);
          }
        });
      });
    }
  }

  function attachAlunoHandlers(moduleId, action) {
    if (action === 'cadastrar') {
      const form = document.querySelector(`[data-form="${moduleId}"]`);
      if (form) {
        form.addEventListener('submit', event => {
          event.preventDefault();
          alert('Registro salvo (simulação).');
          
          const content = document.getElementById('demo-content');
          if (content) {
            content.innerHTML = renderActionScreen(moduleId, action);
            attachSectionHandlers(moduleId);
          }
          form.reset();
        });
      }
    } else if (action === 'apagar') {
      document.querySelectorAll('[data-remove="aula"]').forEach(btn => {
        btn.addEventListener('click', () => {
          alert('Aula removida (simulação).');
          const content = document.getElementById('demo-content');
          if (content) {
            content.innerHTML = renderActionScreen(moduleId, action);
            attachSectionHandlers(moduleId);
          }
        });
      });

      document.querySelectorAll('[data-remove="atividade-aluno"]').forEach(btn => {
        btn.addEventListener('click', () => {
          alert('Envio cancelado (simulação).');
          const content = document.getElementById('demo-content');
          if (content) {
            content.innerHTML = renderActionScreen(moduleId, action);
            attachSectionHandlers(moduleId);
          }
        });
      });

      document.querySelectorAll('[data-remove="avaliacao"]').forEach(btn => {
        btn.addEventListener('click', () => {
          alert('Avaliação removida (simulação).');
          const content = document.getElementById('demo-content');
          if (content) {
            content.innerHTML = renderActionScreen(moduleId, action);
            attachSectionHandlers(moduleId);
          }
        });
      });
    }
  }

  function attachSectionHandlers(sectionId) {
    // Se for Coordenador e estiver em uma ação, usar handlers específicos
    if (state.perfil === 'Coordenador' && navigationState.currentAction) {
      attachCoordenadorHandlers(sectionId, navigationState.currentAction);
      return;
    }

    // Se for Professor e estiver em uma ação, usar handlers específicos
    if (state.perfil === 'Professor' && navigationState.currentAction) {
      attachProfessorHandlers(sectionId, navigationState.currentAction);
      return;
    }

    // Se for Aluno e estiver em uma ação, usar handlers específicos
    if (state.perfil === 'Aluno' && navigationState.currentAction) {
      attachAlunoHandlers(sectionId, navigationState.currentAction);
      return;
    }

    const form = document.querySelector(`[data-form="${sectionId}"]`);
    if (form) {
      form.addEventListener('submit', event => {
        event.preventDefault();
        alert('Esta operação é uma simulação na demo web.');
        form.reset();
      });
    }

    // Ações específicas para outros perfis
    if (sectionId === 'turmas-prof') {
      form.addEventListener('submit', event => {
        event.preventDefault();
        alert('Aluno vinculado à turma (simulação).');
        form.reset();
      });
    }

    if (sectionId === 'atividades-prof') {
      form.addEventListener('submit', event => {
        event.preventDefault();
        const data = new FormData(form);
        state.dados.atividadesProf.push({
          id: Date.now(),
          titulo: data.get('titulo'),
          turma: data.get('turma'),
          data: data.get('data'),
        });
        renderSection('atividades');
      });
    }

    if (sectionId === 'notas-prof') {
      form.addEventListener('submit', event => {
        event.preventDefault();
        const data = new FormData(form);
        state.dados.notasProf.push({
          id: Date.now(),
          aluno: data.get('aluno'),
          atividade: data.get('atividade'),
          nota: Number(data.get('nota')),
        });
        renderSection('notas');
      });
    }

    if (sectionId === 'frequencia-prof') {
      form.addEventListener('submit', event => {
        event.preventDefault();
        const data = new FormData(form);
        state.dados.frequenciaProf.push({
          id: Date.now(),
          aluno: data.get('aluno'),
          turma: data.get('turma'),
          data: data.get('data'),
          status: data.get('status'),
        });
        renderSection('frequencia');
      });
    }

    if (sectionId === 'chat') {
      form.addEventListener('submit', event => {
        event.preventDefault();
        const data = new FormData(form);
        const mensagem = data.get('mensagem').trim();
        if (!mensagem) return;
        state.mensagensChat.push({
          perfil: state.perfil,
          texto: mensagem,
        });
        localStorage.setItem('demoChat', JSON.stringify(state.mensagensChat));
        renderSection('chat');
      });

      document.querySelector('[data-action="limpar-chat"]')?.addEventListener('click', () => {
        state.mensagensChat = [{ perfil: 'Sistema', texto: 'Histórico limpo.' }];
        localStorage.setItem('demoChat', JSON.stringify(state.mensagensChat));
        renderSection('chat');
      });
    }

    if (sectionId === 'aulas') {
      // Apenas simulação visual; sem handlers adicionais no momento
    }

    if (sectionId === 'atividades-aluno') {
      // Simulação estática; sem handlers
    }

    if (sectionId === 'avaliacoes') {
      // Simulação estática; sem handlers
    }
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => DemoCliente.init());

