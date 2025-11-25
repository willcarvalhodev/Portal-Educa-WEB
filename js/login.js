// ============================================
// SISTEMA DE LOGIN
// ============================================

// Verificar se já está logado
function checkAuth() {
    const isLoggedIn = localStorage.getItem('portalEducaLoggedIn');
    const userEmail = localStorage.getItem('portalEducaUserEmail');
    
    if (isLoggedIn === 'true' && userEmail) {
        // Redirecionar para dashboard se já estiver logado
        window.location.href = 'dashboard.html';
    }
}

// Verificar autenticação ao carregar a página
checkAuth();

// Toggle de senha
const passwordToggle = document.getElementById('passwordToggle');
const passwordInput = document.getElementById('password');

if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Atualizar ícone
        const icon = passwordToggle.querySelector('svg');
        if (type === 'text') {
            icon.innerHTML = `
                <path d="M2.5 2.5L17.5 17.5M8.33333 8.33333C7.89131 8.77535 7.5 9.44102 7.5 10.4167C7.5 12.7167 9.36667 14.5833 11.6667 14.5833C12.6423 14.5833 13.308 14.192 13.75 13.75M5.41667 5.41667C4.33333 6.5 2.5 8.33333 1.04167 10.4167C2.275 14.1 5.83333 16.6667 10 16.6667C11.5833 16.6667 13.05 16.3333 14.3333 15.75M12.9167 12.9167C13.3587 12.4747 13.75 11.809 13.75 10.8333C13.75 8.53333 11.8833 6.66667 9.58333 6.66667C8.60767 6.66667 7.942 7.05798 7.5 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            `;
        } else {
            icon.innerHTML = `
                <path d="M10 4.16667C5.83333 4.16667 2.27499 6.73333 1.04166 10.4167C2.27499 14.1 5.83333 16.6667 10 16.6667C14.1667 16.6667 17.725 14.1 18.9583 10.4167C17.725 6.73333 14.1667 4.16667 10 4.16667ZM10 14.5833C7.69999 14.5833 5.83333 12.7167 5.83333 10.4167C5.83333 8.11667 7.69999 6.25 10 6.25C12.3 6.25 14.1667 8.11667 14.1667 10.4167C14.1667 12.7167 12.3 14.5833 10 14.5833ZM10 7.91667C8.61666 7.91667 7.49999 9.03333 7.49999 10.4167C7.49999 11.8 8.61666 12.9167 10 12.9167C11.3833 12.9167 12.5 11.8 12.5 10.4167C12.5 9.03333 11.3833 7.91667 10 7.91667Z" fill="currentColor"/>
            `;
        }
    });
}

// Validação de email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Mostrar erro
function showError(message) {
    const errorDiv = document.getElementById('formError');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.classList.add('show');
        
        // Remover erro após 5 segundos
        setTimeout(() => {
            errorDiv.classList.remove('show');
        }, 5000);
    }
}

// Limpar erro
function clearError() {
    const errorDiv = document.getElementById('formError');
    if (errorDiv) {
        errorDiv.classList.remove('show');
    }
}

// Simulação de autenticação (em produção, isso seria uma chamada API)
function authenticate(email, password) {
    // Credenciais de demonstração
    // Em produção, isso seria uma chamada para um backend
    const demoUsers = {
        'admin@portaleduca.com': 'admin123',
        'professor@portaleduca.com': 'prof123',
        'aluno@portaleduca.com': 'aluno123',
        'demo@portaleduca.com': 'demo123'
    };
    
    return demoUsers[email.toLowerCase()] === password;
}

// Handle do formulário de login
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearError();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        
        // Validações
        if (!email) {
            showError('Por favor, insira seu e-mail');
            return;
        }
        
        if (!validateEmail(email)) {
            showError('Por favor, insira um e-mail válido');
            return;
        }
        
        if (!password) {
            showError('Por favor, insira sua senha');
            return;
        }
        
        if (password.length < 6) {
            showError('A senha deve ter pelo menos 6 caracteres');
            return;
        }
        
        // Botão de loading
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Entrando...</span>';
        
        // Simular delay de autenticação
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Autenticar
        if (authenticate(email, password)) {
            // Salvar sessão
            localStorage.setItem('portalEducaLoggedIn', 'true');
            localStorage.setItem('portalEducaUserEmail', email);
            localStorage.setItem('portalEducaUserName', email.split('@')[0]);
            
            if (remember) {
                localStorage.setItem('portalEducaRemember', 'true');
            }
            
            // Redirecionar para dashboard
            window.location.href = 'dashboard.html';
        } else {
            showError('E-mail ou senha incorretos. Tente novamente.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}

// Esqueceu a senha
const forgotPassword = document.getElementById('forgotPassword');
if (forgotPassword) {
    forgotPassword.addEventListener('click', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        
        if (email && validateEmail(email)) {
            alert(`Um link de recuperação de senha foi enviado para ${email}\n\n(Esta é uma demonstração. Em produção, isso enviaria um e-mail real.)`);
        } else {
            alert('Por favor, insira seu e-mail primeiro');
            document.getElementById('email').focus();
        }
    });
}

// Preencher email se estiver salvo
window.addEventListener('DOMContentLoaded', () => {
    const remember = localStorage.getItem('portalEducaRemember');
    if (remember === 'true') {
        const savedEmail = localStorage.getItem('portalEducaUserEmail');
        if (savedEmail) {
            document.getElementById('email').value = savedEmail;
            document.getElementById('remember').checked = true;
        }
    }
});

console.log('🔐 Sistema de Login Carregado!');

