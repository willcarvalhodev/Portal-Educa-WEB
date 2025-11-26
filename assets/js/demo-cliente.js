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
    container.innerHTML = `
      <section class="demo-login">
        <div class="demo-login__card">
          <h2>Acesse a demo</h2>
          <p>Use as credenciais fictícias para explorar cada perfil.</p>
          <form id="demo-login-form">
            <label>E-mail
              <input type="email" name="email" required placeholder="teste@coordenador.educa">
            </label>
            <label>Senha
              <input type="password" name="senha" required placeholder="123456">
            </label>
            <button type="submit" class="btn btn--primary">Entrar na experiência</button>
          </form>
          <div class="demo-login__hints">
            <small>Coordenador: teste@coordenador.educa / 123456</small>
            <small>Professor: teste@professor.educa / 123456</small>
            <small>Aluno: teste@aluno.educa / 123456</small>
          </div>
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
    container.innerHTML = `
      <section class="demo-app">
        <header class="demo-app__header">
          <div>
            <h2>${state.perfil} conectado</h2>
            <p>${state.email}</p>
          </div>
          <div>
            <button class="btn btn--secondary" data-action="open-manual">Manual</button>
            <button class="btn btn--primary" data-action="logout">Sair</button>
          </div>
        </header>
        <div class="demo-app__body">
          <aside class="demo-app__nav">
            ${renderNav()}
          </aside>
          <section class="demo-app__content" id="demo-content">
            ${renderDashboard()}
          </section>
        </div>
      </section>
    `;

    attachNavEvents();
    attachHeaderActions();
  }

  function renderNav() {
    const menus = {
      Coordenador: [
        { id: 'dashboard', label: 'Visão geral' },
        { id: 'professores', label: 'Professores' },
        { id: 'alunos', label: 'Alunos' },
        { id: 'cursos', label: 'Cursos' },
        { id: 'turmas', label: 'Turmas' },
        { id: 'usuarios', label: 'Perfis logados' },
      ],
      Professor: [
        { id: 'dashboard', label: 'Visão geral' },
        { id: 'turmas-prof', label: 'Turmas' },
        { id: 'atividades', label: 'Atividades' },
        { id: 'notas', label: 'Notas' },
        { id: 'frequencia', label: 'Frequência' },
        { id: 'chat', label: 'Chat' },
      ],
      Aluno: [
        { id: 'dashboard', label: 'Visão geral' },
        { id: 'diario', label: 'Diário' },
        { id: 'aulas', label: 'Aulas' },
        { id: 'atividades-aluno', label: 'Atividades' },
        { id: 'avaliacoes', label: 'Avaliações' },
        { id: 'chat', label: 'Chat' },
      ],
    };

    return menus[state.perfil]
      .map(
        item => `
        <button class="demo-nav__item${item.id === 'dashboard' ? ' is-active' : ''}" data-section="${item.id}">
          ${item.label}
        </button>
      `,
      )
      .join('');
  }

  function renderDashboard() {
    return `
      <div class="demo-dashboard">
        <h3>Bem-vindo(a), ${state.perfil}</h3>
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
  function formatTempoOnline(timestamp) {
    const diff = Date.now() - new Date(timestamp).getTime();
    const horas = Math.floor(diff / 3600000);
    const minutos = Math.floor((diff % 3600000) / 60000);
    const segundos = Math.floor((diff % 60000) / 1000);
    return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
  }
      timestamp: now.toISOString(),
    });
  }

  function removeLoggedUser(email) {
    state.dados.usuariosLogados = state.dados.usuariosLogados.filter(user => user.email !== email);
  }

  function attachNavEvents() {
    document.querySelectorAll('.demo-nav__item').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.demo-nav__item').forEach(item => item.classList.remove('is-active'));
        btn.classList.add('is-active');
        const section = btn.dataset.section;
        renderSection(section);
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

  function renderSection(sectionId) {
    const content = document.getElementById('demo-content');
    if (!content) return;
    const sections = {
      dashboard: renderDashboard,
      professores: renderProfessores,
      alunos: renderAlunos,
      cursos: renderCursos,
      turmas: renderTurmas,
      usuarios: renderUsuarios,
      'turmas-prof': renderTurmasProf,
      atividades: renderAtividadesProf,
      notas: renderNotasProf,
      frequencia: renderFrequenciaProf,
      chat: renderChat,
      diario: renderDiarioAluno,
      aulas: renderAulasAluno,
      'atividades-aluno': renderAtividadesAluno,
      avaliacoes: renderAvaliacoesAluno,
    };

    content.innerHTML = sections[sectionId] ? sections[sectionId]() : '<p>Em construção.</p>';
    attachSectionHandlers(sectionId);
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

  function attachSectionHandlers(sectionId) {
    const form = document.querySelector(`[data-form="${sectionId}"]`);
    if (!form) return;

    form.addEventListener('submit', event => {
      event.preventDefault();
      alert('Esta operação é uma simulação na demo web.');
      form.reset();
    });

    // Ações específicas
    if (sectionId === 'professores') {
      form.addEventListener('submit', event => {
        event.preventDefault();
        const data = new FormData(form);
        state.dados.professores.push({
          id: Date.now(),
          nome: data.get('nome'),
          email: data.get('email'),
        });
        renderSection('professores');
      });

      document.querySelectorAll('[data-remove="professor"]').forEach(btn => {
        btn.addEventListener('click', () => {
          state.dados.professores = state.dados.professores.filter(p => p.email !== btn.dataset.email);
          renderSection('professores');
        });
      });
    }

    if (sectionId === 'alunos') {
      form.addEventListener('submit', event => {
        event.preventDefault();
        const data = new FormData(form);
        state.dados.alunos.push({
          matricula: data.get('matricula'),
          nome: data.get('nome'),
          email: data.get('email'),
          turma: data.get('turma'),
        });
        renderSection('alunos');
      });

      document.querySelectorAll('[data-remove="aluno"]').forEach(btn => {
        btn.addEventListener('click', () => {
          state.dados.alunos = state.dados.alunos.filter(a => a.email !== btn.dataset.email);
          renderSection('alunos');
        });
      });
    }

    if (sectionId === 'cursos') {
      form.addEventListener('submit', event => {
        event.preventDefault();
        const data = new FormData(form);
        state.dados.cursos.push({
          id: Date.now(),
          nome: data.get('nome'),
        });
        renderSection('cursos');
      });

      document.querySelectorAll('[data-remove="curso"]').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = Number(btn.dataset.id);
          state.dados.cursos = state.dados.cursos.filter(c => c.id !== id);
          renderSection('cursos');
        });
      });
    }

    if (sectionId === 'turmas') {
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

      form.addEventListener('submit', event => {
        event.preventDefault();
        const data = new FormData(form);
        state.dados.turmas.push({
          id: Date.now(),
          nome: data.get('nome'),
          curso: data.get('curso'),
          alunos: Number(data.get('alunos')),
        });
        renderSection('turmas');
      });

      document.querySelectorAll('[data-remove="turma"]').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = Number(btn.dataset.id);
          state.dados.turmas = state.dados.turmas.filter(t => t.id !== id);
          renderSection('turmas');
        });
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

