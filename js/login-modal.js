/**
 * ============================================
 * PORTAL EDUCA - MÓDULO MODAL DE LOGIN
 * Gerencia a exibição e interação do modal de login
 * ============================================
 */
const LoginModalModule = (function() {
    'use strict';
    
    let modal = null;
    let form = null;
    let closeButtons = [];
    let isVisible = false;
    
    /**
     * Inicializa o módulo do modal de login
     */
    function init() {
        try {
            createModal();
            setupEventListeners();
            console.log('✅ LoginModalModule inicializado');
        } catch (error) {
            console.error('❌ Erro ao inicializar LoginModalModule:', error);
        }
    }
    
    /**
     * Cria o elemento do modal de login
     */
    function createModal() {
        // Remove modal existente se houver
        const existingModal = document.getElementById('login-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Cria o modal
        modal = document.createElement('div');
        modal.id = 'login-modal';
        modal.className = 'login-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-labelledby', 'login-modal-title');
        modal.setAttribute('aria-modal', 'true');
        modal.innerHTML = `
            <div class="login-modal__overlay"></div>
            <div class="login-modal__content">
                <button class="login-modal__close" aria-label="Fechar modal">
                    <span>&times;</span>
                </button>
                <div class="login-modal__header">
                    <h2 class="login-modal__title" id="login-modal-title">Login Institucional</h2>
                    <p class="login-modal__subtitle">Acesse sua conta do Portal Educa</p>
                </div>
                <form class="login-modal__form" id="login-form" novalidate>
                    <div class="login-modal__field">
                        <label for="login-email" class="login-modal__label">Email</label>
                        <input 
                            type="email" 
                            id="login-email"
                            class="login-modal__input" 
                            placeholder="seu.email@instituicao.com"
                            autocomplete="email"
                            required
                            aria-required="true"
                            aria-invalid="false">
                        <span class="login-modal__error" id="email-error" role="alert"></span>
                    </div>
                    <div class="login-modal__field">
                        <label for="login-password" class="login-modal__label">Senha</label>
                        <input 
                            type="password" 
                            id="login-password"
                            class="login-modal__input" 
                            placeholder="Sua senha"
                            autocomplete="current-password"
                            required
                            aria-required="true"
                            aria-invalid="false">
                        <span class="login-modal__error" id="password-error" role="alert"></span>
                    </div>
                    <div class="login-modal__error login-modal__error--general" id="general-error" role="alert"></div>
                    <button type="submit" class="login-modal__submit" id="login-submit-btn">
                        <span class="login-modal__submit-text">Entrar</span>
                        <span class="login-modal__submit-loader" style="display: none;">⏳</span>
                    </button>
                </form>
                <div class="login-modal__footer">
                    <p class="login-modal__help">
                        Problemas com login? <a href="#" class="login-modal__link">Entre em contato</a>
                    </p>
                </div>
            </div>
        `;
        
        // Adiciona ao body
        document.body.appendChild(modal);
        
        // Busca elementos
        form = document.getElementById('login-form');
        closeButtons = [
            modal.querySelector('.login-modal__close'),
            modal.querySelector('.login-modal__overlay')
        ];
    }
    
    /**
     * Configura os event listeners
     */
    function setupEventListeners() {
        if (!form) return;
        
        // Submit do formulário
        form.addEventListener('submit', handleFormSubmit);
        
        // Fechar modal
        closeButtons.forEach(btn => {
            if (btn) {
                btn.addEventListener('click', close);
            }
        });
        
        // Fechar com ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isVisible) {
                close();
            }
        });
        
        // Validação em tempo real
        const emailInput = document.getElementById('login-email');
        const passwordInput = document.getElementById('login-password');
        
        if (emailInput) {
            emailInput.addEventListener('blur', validateEmail);
            emailInput.addEventListener('input', clearError);
        }
        
        if (passwordInput) {
            passwordInput.addEventListener('blur', validatePassword);
            passwordInput.addEventListener('input', clearError);
        }
    }
    
    /**
     * Manipula o submit do formulário
     * @param {Event} event - Evento de submit
     */
    async function handleFormSubmit(event) {
        event.preventDefault();
        
        // Limpa erros anteriores
        clearAllErrors();
        
        // Valida campos
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        
        if (!validateForm(email, password)) {
            return;
        }
        
        // Mostra loading
        setLoading(true);
        
        // Faz login
        const result = await window.AuthModule.login(email, password);
        
        // Remove loading
        setLoading(false);
        
        if (result.success) {
            // Sucesso - fecha modal e redireciona
            close();
            // Redireciona para seleção de perfil (será implementado na FASE 6)
            if (window.Router) {
                // Por enquanto apenas fecha o modal
                // window.Router.navigateTo('perfil');
            }
        } else {
            // Mostra erro
            showError(result.error, 'general');
        }
    }
    
    /**
     * Valida o formulário
     * @param {string} email - Email
     * @param {string} password - Senha
     * @returns {boolean}
     */
    function validateForm(email, password) {
        let isValid = true;
        
        if (!validateEmail(email)) {
            isValid = false;
        }
        
        if (!validatePassword(password)) {
            isValid = false;
        }
        
        return isValid;
    }
    
    /**
     * Valida email
     * @param {string} email - Email
     * @returns {boolean}
     */
    function validateEmail(email) {
        const emailInput = document.getElementById('login-email');
        const emailError = document.getElementById('email-error');
        
        if (!email || email.trim() === '') {
            showFieldError(emailInput, emailError, 'Email é obrigatório');
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFieldError(emailInput, emailError, 'Email inválido');
            return false;
        }
        
        clearFieldError(emailInput, emailError);
        return true;
    }
    
    /**
     * Valida senha
     * @param {string} password - Senha
     * @returns {boolean}
     */
    function validatePassword(password) {
        const passwordInput = document.getElementById('login-password');
        const passwordError = document.getElementById('password-error');
        
        if (!password || password.trim() === '') {
            showFieldError(passwordInput, passwordError, 'Senha é obrigatória');
            return false;
        }
        
        if (password.length < 6) {
            showFieldError(passwordInput, passwordError, 'Senha deve ter pelo menos 6 caracteres');
            return false;
        }
        
        clearFieldError(passwordInput, passwordError);
        return true;
    }
    
    /**
     * Mostra erro em um campo
     * @param {HTMLElement} input - Input do campo
     * @param {HTMLElement} errorElement - Elemento de erro
     * @param {string} message - Mensagem de erro
     */
    function showFieldError(input, errorElement, message) {
        if (input) {
            input.setAttribute('aria-invalid', 'true');
            input.classList.add('login-modal__input--error');
        }
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    
    /**
     * Limpa erro de um campo
     * @param {HTMLElement} input - Input do campo
     * @param {HTMLElement} errorElement - Elemento de erro
     */
    function clearFieldError(input, errorElement) {
        if (input) {
            input.setAttribute('aria-invalid', 'false');
            input.classList.remove('login-modal__input--error');
        }
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }
    
    /**
     * Mostra erro geral
     * @param {string} message - Mensagem de erro
     * @param {string} type - Tipo de erro
     */
    function showError(message, type = 'general') {
        const errorElement = document.getElementById(`${type}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    
    /**
     * Limpa todos os erros
     */
    function clearAllErrors() {
        const errorElements = document.querySelectorAll('.login-modal__error');
        errorElements.forEach(el => {
            el.textContent = '';
            el.style.display = 'none';
        });
        
        const inputs = document.querySelectorAll('.login-modal__input');
        inputs.forEach(input => {
            input.setAttribute('aria-invalid', 'false');
            input.classList.remove('login-modal__input--error');
        });
    }
    
    /**
     * Limpa erro ao digitar
     */
    function clearError() {
        clearAllErrors();
    }
    
    /**
     * Define estado de loading
     * @param {boolean} loading - Se está carregando
     */
    function setLoading(loading) {
        const submitBtn = document.getElementById('login-submit-btn');
        const submitText = submitBtn?.querySelector('.login-modal__submit-text');
        const submitLoader = submitBtn?.querySelector('.login-modal__submit-loader');
        
        if (!submitBtn) return;
        
        if (loading) {
            submitBtn.disabled = true;
            if (submitText) submitText.style.display = 'none';
            if (submitLoader) submitLoader.style.display = 'inline-block';
        } else {
            submitBtn.disabled = false;
            if (submitText) submitText.style.display = 'inline-block';
            if (submitLoader) submitLoader.style.display = 'none';
        }
    }
    
    /**
     * Abre o modal
     */
    function open() {
        if (!modal) {
            createModal();
            setupEventListeners();
        }
        
        modal.classList.add('login-modal--visible');
        isVisible = true;
        document.body.style.overflow = 'hidden';
        
        // Foca no primeiro input
        const emailInput = document.getElementById('login-email');
        if (emailInput) {
            setTimeout(() => emailInput.focus(), 100);
        }
    }
    
    /**
     * Fecha o modal
     */
    function close() {
        if (!modal) return;
        
        modal.classList.remove('login-modal--visible');
        isVisible = false;
        document.body.style.overflow = '';
        
        // Limpa formulário
        if (form) {
            form.reset();
            clearAllErrors();
        }
    }
    
    // API Pública
    return {
        init: init,
        open: open,
        close: close,
        isVisible: function() { return isVisible; }
    };
})();

// Disponibiliza LoginModalModule globalmente
window.LoginModalModule = LoginModalModule;

