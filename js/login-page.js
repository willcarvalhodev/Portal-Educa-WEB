/**
 * ============================================
 * PORTAL EDUCA - PÁGINA DE LOGIN
 * Gerencia a página de login com flow (Solicitar/Login)
 * ============================================
 */
const LoginPageModule = (function() {
    'use strict';
    
    let loginForm = null;
    let solicitarForm = null;
    let activeFlow = 'login'; // 'login' ou 'solicitar'
    
    /**
     * Inicializa o módulo da página de login
     */
    function init() {
        try {
            loginForm = document.getElementById('login-form');
            solicitarForm = document.getElementById('solicitar-form');
            
            setupFlowTabs();
            setupEventListeners();
            setupPasswordToggle();
            console.log('✅ LoginPageModule inicializado');
            
        } catch (error) {
            console.error('❌ Erro ao inicializar LoginPageModule:', error);
        }
    }
    
    /**
     * Configura os painéis lado a lado
     */
    function setupFlowTabs() {
        const tealSide = document.querySelector('.login-flow__side--teal');
        const formSide = document.querySelector('.login-flow__side--form');
        const formSolicitar = document.querySelector('.login-flow__side--form-solicitar');
        const tealRight = document.querySelector('.login-flow__side--teal-right');
        const loginCard = document.querySelector('.login-card');
        
        // Botão "Solicitar Acesso" no painel teal
        const solicitarButton = tealSide?.querySelector('.login-flow__side-button');
        if (solicitarButton) {
            solicitarButton.addEventListener('click', function(e) {
                e.stopPropagation();
                switchFlow('solicitar');
            });
        }
        
        // Clique no painel teal esquerdo
        if (tealSide) {
            tealSide.addEventListener('click', function(e) {
                if (e.target === tealSide || e.target.closest('.login-flow__side-content')) {
                    if (e.target.tagName !== 'BUTTON') {
                        switchFlow('solicitar');
                    }
                }
            });
        }
        
        // Botão "Entrar" no painel teal direito
        const loginBackButton = tealRight?.querySelector('.login-flow__side-button');
        if (loginBackButton) {
            loginBackButton.addEventListener('click', function(e) {
                e.stopPropagation();
                switchFlow('login');
            });
        }
        
        // Clique no painel teal direito
        if (tealRight) {
            tealRight.addEventListener('click', function(e) {
                if (e.target === tealRight || e.target.closest('.login-flow__side-content')) {
                    if (e.target.tagName !== 'BUTTON') {
                        switchFlow('login');
                    }
                }
            });
        }
        
        // Define o flow inicial como 'login'
        switchFlow('login');
    }
    
    /**
     * Alterna entre os fluxos (solicitar/login)
     * @param {string} flow - 'solicitar' ou 'login'
     */
    function switchFlow(flow) {
        if (flow === activeFlow) return;
        
        const loginCard = document.querySelector('.login-card');
        const formSide = document.querySelector('.login-flow__side--form');
        const formSolicitar = document.querySelector('.login-flow__side--form-solicitar');
        const tealSide = document.querySelector('.login-flow__side--teal');
        const tealRight = document.querySelector('.login-flow__side--teal-right');
        
        // Remove classes de animação anteriores
        const allSides = document.querySelectorAll('.login-flow__side');
        allSides.forEach(side => {
            side.classList.remove('login-flow__side--entering', 'login-flow__side--exiting');
        });
        
        if (flow === 'solicitar') {
            // Painéis que estão saindo primeiro
            if (formSide) {
                formSide.classList.add('login-flow__side--exiting');
                // Força repaint
                formSide.offsetHeight;
                setTimeout(() => {
                    formSide.classList.add('exited');
                }, 10);
            }
            if (tealSide) {
                tealSide.classList.add('login-flow__side--exiting');
                tealSide.offsetHeight;
                setTimeout(() => {
                    tealSide.classList.add('exited');
                }, 10);
            }
            
            // Após início da saída, mostra os painéis entrando
            setTimeout(() => {
                if (formSolicitar) {
                    formSolicitar.style.display = 'flex';
                    formSolicitar.classList.add('login-flow__side--entering');
                    // Força repaint antes de adicionar 'entered'
                    formSolicitar.offsetHeight;
                    setTimeout(() => {
                        formSolicitar.classList.add('entered');
                    }, 10);
                }
                if (tealRight) {
                    tealRight.style.display = 'flex';
                    tealRight.classList.add('login-flow__side--entering');
                    tealRight.offsetHeight;
                    setTimeout(() => {
                        tealRight.classList.add('entered');
                    }, 10);
                }
                
                // Adiciona classe ao card
                loginCard?.classList.add('solicitar-active');
                
            }, 100);
            
            // Remove classes após transição completa
            setTimeout(() => {
                if (formSide) {
                    formSide.style.display = 'none';
                    formSide.classList.remove('login-flow__side--exiting', 'exited');
                }
                if (tealSide) {
                    tealSide.style.display = 'none';
                    tealSide.classList.remove('login-flow__side--exiting', 'exited');
                }
                if (formSolicitar) {
                    formSolicitar.classList.remove('login-flow__side--entering', 'entered');
                }
                if (tealRight) {
                    tealRight.classList.remove('login-flow__side--entering', 'entered');
                }
            }, 2100);
            
        } else {
            // Painéis que estão saindo primeiro
            if (formSolicitar) {
                formSolicitar.classList.add('login-flow__side--exiting');
                formSolicitar.offsetHeight;
                setTimeout(() => {
                    formSolicitar.classList.add('exited');
                }, 10);
            }
            if (tealRight) {
                tealRight.classList.add('login-flow__side--exiting');
                tealRight.offsetHeight;
                setTimeout(() => {
                    tealRight.classList.add('exited');
                }, 10);
            }
            
            // Após início da saída, mostra os painéis entrando
            setTimeout(() => {
                if (formSide) {
                    formSide.style.display = 'flex';
                    formSide.classList.add('login-flow__side--entering');
                    formSide.offsetHeight;
                    setTimeout(() => {
                        formSide.classList.add('entered');
                    }, 10);
                }
                if (tealSide) {
                    tealSide.style.display = 'flex';
                    tealSide.classList.add('login-flow__side--entering');
                    tealSide.offsetHeight;
                    setTimeout(() => {
                        tealSide.classList.add('entered');
                    }, 10);
                }
                
                // Remove classe do card
                loginCard?.classList.remove('solicitar-active');
                
            }, 100);
            
            // Remove classes após transição completa
            setTimeout(() => {
                if (formSolicitar) {
                    formSolicitar.style.display = 'none';
                    formSolicitar.classList.remove('login-flow__side--exiting', 'exited');
                }
                if (tealRight) {
                    tealRight.style.display = 'none';
                    tealRight.classList.remove('login-flow__side--exiting', 'exited');
                }
                if (formSide) {
                    formSide.classList.remove('login-flow__side--entering', 'entered');
                }
                if (tealSide) {
                    tealSide.classList.remove('login-flow__side--entering', 'entered');
                }
            }, 2100);
        }
        
        activeFlow = flow;
        
        // Limpa erros ao alternar
        clearAllErrors();
    }
    
    /**
     * Configura toggle de senha
     */
    function setupPasswordToggle() {
        const toggleButton = document.getElementById('toggle-password');
        const passwordInput = document.getElementById('login-password');
        
        if (toggleButton && passwordInput) {
            toggleButton.addEventListener('click', function() {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                
                // Altera o ícone
                const eyeIcon = toggleButton.querySelector('.login-flow__eye-icon');
                if (eyeIcon) {
                    eyeIcon.textContent = type === 'password' ? '👁️' : '🙈';
                }
            });
        }
    }
    
    /**
     * Configura os event listeners
     */
    function setupEventListeners() {
        // Formulário de Login
        if (loginForm) {
            loginForm.addEventListener('submit', handleLoginSubmit);
            
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
        
        // Formulário de Solicitar Acesso
        if (solicitarForm) {
            solicitarForm.addEventListener('submit', handleSolicitarSubmit);
        }
    }
    
    /**
     * Manipula o submit do formulário de login
     * @param {Event} event - Evento de submissão do formulário
     */
    async function handleLoginSubmit(event) {
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
        setLoading(true, 'login');
        
        // Faz login
        try {
            const result = await window.AuthModule.login(email, password);
            
            // Remove loading
            setLoading(false, 'login');
            
            if (result.success) {
                // Sucesso - redireciona para seleção de perfil
                // Por enquanto, redireciona para a página de escolha
                // Na FASE 6 será redirecionado para perfil.html
                window.location.href = 'index.html';
            } else {
                // Mostra erro
                showError(result.error || 'Erro ao fazer login. Tente novamente.', 'general', 'login');
            }
        } catch (error) {
            // Remove loading
            setLoading(false, 'login');
            
            // Mostra erro
            showError(error.message || 'Erro ao fazer login. Tente novamente.', 'general', 'login');
        }
    }
    
    /**
     * Manipula o submit do formulário de solicitar acesso
     * @param {Event} event - Evento de submissão do formulário
     */
    async function handleSolicitarSubmit(event) {
        event.preventDefault();
        
        // Limpa erros anteriores
        clearAllErrors();
        
        // Valida campos
        const nome = document.getElementById('solicitar-nome').value.trim();
        const email = document.getElementById('solicitar-email').value.trim();
        const telefone = document.getElementById('solicitar-telefone').value.trim();
        const instituicao = document.getElementById('solicitar-instituicao').value.trim();
        
        if (!validateSolicitarForm(nome, email, telefone, instituicao)) {
            return;
        }
        
        // Mostra loading
        setLoading(true, 'solicitar');
        
        // Simula envio (por enquanto apenas mostra sucesso)
        // Na FASE 10 será integrado com backend
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Remove loading
        setLoading(false, 'solicitar');
        
        // Mostra mensagem de sucesso
        alert('Solicitação enviada com sucesso! Nossa equipe entrará em contato em breve.');
        
        // Limpa formulário
        solicitarForm.reset();
    }
    
    /**
     * Valida o formulário de login
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
     * Valida o formulário de solicitar acesso
     * @param {string} nome - Nome
     * @param {string} email - Email
     * @param {string} telefone - Telefone
     * @param {string} instituicao - Instituição
     * @returns {boolean}
     */
    function validateSolicitarForm(nome, email, telefone, instituicao) {
        let isValid = true;
        
        // Valida nome
        if (!nome || nome.trim() === '') {
            showFieldError('solicitar-nome', 'solicitar-nome-error', 'Nome é obrigatório');
            isValid = false;
        }
        
        // Valida email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || email.trim() === '') {
            showFieldError('solicitar-email', 'solicitar-email-error', 'Email é obrigatório');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showFieldError('solicitar-email', 'solicitar-email-error', 'Email inválido');
            isValid = false;
        }
        
        // Valida telefone
        if (!telefone || telefone.trim() === '') {
            showFieldError('solicitar-telefone', 'solicitar-telefone-error', 'Telefone é obrigatório');
            isValid = false;
        }
        
        // Valida instituição
        if (!instituicao || instituicao.trim() === '') {
            showFieldError('solicitar-instituicao', 'solicitar-instituicao-error', 'Instituição é obrigatória');
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
            showFieldError('login-email', 'email-error', 'Email é obrigatório');
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFieldError('login-email', 'email-error', 'Email inválido');
            return false;
        }
        
        clearFieldError('login-email', 'email-error');
        return true;
    }
    
    /**
     * Valida senha
     * @param {string} password - Senha
     * @returns {boolean}
     */
    function validatePassword(password) {
        if (!password || password.trim() === '') {
            showFieldError('login-password', 'password-error', 'Senha é obrigatória');
            return false;
        }
        
        if (password.length < 6) {
            showFieldError('login-password', 'password-error', 'Senha deve ter pelo menos 6 caracteres');
            return false;
        }
        
        clearFieldError('login-password', 'password-error');
        return true;
    }
    
    /**
     * Mostra erro em um campo
     * @param {string} inputId - ID do input
     * @param {string} errorId - ID do elemento de erro
     * @param {string} message - Mensagem de erro
     */
    function showFieldError(inputId, errorId, message) {
        const input = document.getElementById(inputId);
        const errorElement = document.getElementById(errorId);
        
        if (input) {
            input.setAttribute('aria-invalid', 'true');
            input.classList.add('login-flow__input--error');
        }
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    
    /**
     * Limpa erro de um campo
     * @param {string} inputId - ID do input
     * @param {string} errorId - ID do elemento de erro
     */
    function clearFieldError(inputId, errorId) {
        const input = document.getElementById(inputId);
        const errorElement = document.getElementById(errorId);
        
        if (input) {
            input.setAttribute('aria-invalid', 'false');
            input.classList.remove('login-flow__input--error');
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
     * @param {string} formType - 'login' ou 'solicitar'
     */
    function showError(message, type = 'general', formType = 'login') {
        const errorElement = document.getElementById(formType === 'login' ? 'general-error' : 'solicitar-general-error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    
    /**
     * Limpa todos os erros
     */
    function clearAllErrors() {
        const errorElements = document.querySelectorAll('.login-flow__error');
        errorElements.forEach(el => {
            el.textContent = '';
            el.style.display = 'none';
        });
        
        const inputs = document.querySelectorAll('.login-flow__input');
        inputs.forEach(input => {
            input.setAttribute('aria-invalid', 'false');
            input.classList.remove('login-flow__input--error');
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
     * @param {string} formType - 'login' ou 'solicitar'
     */
    function setLoading(loading, formType = 'login') {
        const submitBtn = document.getElementById(formType === 'login' ? 'login-submit-btn' : 'solicitar-submit-btn');
        const submitText = submitBtn?.querySelector('.login-flow__submit-text');
        const submitLoader = submitBtn?.querySelector('.login-flow__submit-loader');
        
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
        init: init,
        switchFlow: switchFlow
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
