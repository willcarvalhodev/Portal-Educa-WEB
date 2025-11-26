/**
 * ============================================
 * PORTAL EDUCA - PÁGINA DE LOGIN
 * Gerencia a página de login (não modal)
 * ============================================
 */
const LoginPageModule = (function() {
    'use strict';
    
    let form = null;
    
    /**
     * Inicializa o módulo da página de login
     */
    function init() {
        try {
            form = document.getElementById('login-form');
            
            if (!form) {
                console.warn('Formulário de login não encontrado');
                return;
            }
            
            setupEventListeners();
            console.log('✅ LoginPageModule inicializado');
            
        } catch (error) {
            console.error('❌ Erro ao inicializar LoginPageModule:', error);
        }
    }
    
    /**
     * Configura os event listeners
     */
    function setupEventListeners() {
        if (!form) return;
        
        // Submit do formulário
        form.addEventListener('submit', handleFormSubmit);
        
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
     * @param {Event} event - Evento de submissão do formulário
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
            // Sucesso - redireciona para seleção de perfil
            // Por enquanto, redireciona para a página de escolha
            // Na FASE 6 será redirecionado para perfil.html
            window.location.href = 'index.html';
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
            input.classList.add('login-card__input--error');
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
            input.classList.remove('login-card__input--error');
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
        const errorElements = document.querySelectorAll('.login-card__error');
        errorElements.forEach(el => {
            el.textContent = '';
            el.style.display = 'none';
        });
        
        const inputs = document.querySelectorAll('.login-card__input');
        inputs.forEach(input => {
            input.setAttribute('aria-invalid', 'false');
            input.classList.remove('login-card__input--error');
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
        const submitText = submitBtn?.querySelector('.login-card__submit-text');
        const submitLoader = submitBtn?.querySelector('.login-card__submit-loader');
        
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
    
    // API Pública
    return {
        init: init
    };
})();

// Disponibiliza LoginPageModule globalmente
window.LoginPageModule = LoginPageModule;

// Inicializa automaticamente quando a página carregar
if (typeof firebase !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            if (window.AuthModule) {
                window.AuthModule.init();
            }
            LoginPageModule.init();
        });
    } else {
        if (window.AuthModule) {
            window.AuthModule.init();
        }
        LoginPageModule.init();
    }
}

