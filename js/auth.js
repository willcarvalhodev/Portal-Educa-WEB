/**
 * ============================================
 * PORTAL EDUCA - MÓDULO DE AUTENTICAÇÃO
 * Gerencia login, logout e estado de autenticação
 * ============================================
 */
const AuthModule = (function() {
    'use strict';
    
    // Estado
    let currentUser = null;
    let authInitialized = false;
    
    /**
     * Inicializa o módulo de autenticação
     */
    function init() {
        try {
            if (typeof firebase === 'undefined' || !firebase.auth) {
                console.error('❌ Firebase Auth não disponível');
                return;
            }
            
            // Observa mudanças no estado de autenticação
            firebase.auth().onAuthStateChanged(function(user) {
                currentUser = user;
                authInitialized = true;
                
                if (user) {
                    console.log('✅ Usuário autenticado:', user.email);
                    // Redireciona para seleção de perfil se já estiver logado
                    const currentRoute = window.Router ? window.Router.getCurrentRoute() : null;
                    if (currentRoute !== 'perfil' && currentRoute !== 'dashboard') {
                        // Não redireciona automaticamente - deixa o usuário escolher
                    }
                } else {
                    console.log('ℹ️ Usuário não autenticado');
                }
                
                // Dispara evento customizado
                window.dispatchEvent(new CustomEvent('authStateChanged', { 
                    detail: { user: user } 
                }));
            });
            
            console.log('✅ AuthModule inicializado');
            
        } catch (error) {
            console.error('❌ Erro ao inicializar AuthModule:', error);
        }
    }
    
    /**
     * Faz login com email e senha
     * @param {string} email - Email do usuário
     * @param {string} password - Senha do usuário
     * @returns {Promise<Object>} Resultado do login
     */
    async function login(email, password) {
        try {
            if (typeof firebase === 'undefined' || !firebase.auth) {
                throw new Error('Firebase Auth não disponível');
            }
            
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
            currentUser = userCredential.user;
            
            return {
                success: true,
                user: userCredential.user
            };
            
        } catch (error) {
            console.error('❌ Erro no login:', error);
            return {
                success: false,
                error: getErrorMessage(error)
            };
        }
    }
    
    /**
     * Faz logout do usuário
     */
    async function logout() {
        try {
            if (typeof firebase === 'undefined' || !firebase.auth) {
                throw new Error('Firebase Auth não disponível');
            }
            
            await firebase.auth().signOut();
            currentUser = null;
            
            return { success: true };
            
        } catch (error) {
            console.error('❌ Erro no logout:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    /**
     * Retorna o usuário atual
     * @returns {Object|null} Usuário atual ou null
     */
    function getCurrentUser() {
        return currentUser;
    }
    
    /**
     * Verifica se o usuário está autenticado
     * @returns {boolean}
     */
    function isAuthenticated() {
        return currentUser !== null;
    }
    
    /**
     * Verifica se o auth foi inicializado
     * @returns {boolean}
     */
    function isInitialized() {
        return authInitialized;
    }
    
    /**
     * Converte código de erro do Firebase em mensagem amigável
     * @param {Error} error - Erro do Firebase
     * @returns {string} Mensagem de erro amigável
     */
    function getErrorMessage(error) {
        const errorMessages = {
            'auth/invalid-email': 'Email inválido. Por favor, verifique o formato.',
            'auth/user-disabled': 'Esta conta foi desabilitada. Entre em contato com o suporte.',
            'auth/user-not-found': 'Email não encontrado. Verifique se o email está correto.',
            'auth/wrong-password': 'Senha incorreta. Tente novamente.',
            'auth/email-already-in-use': 'Este email já está em uso.',
            'auth/weak-password': 'Senha muito fraca. Use pelo menos 6 caracteres.',
            'auth/network-request-failed': 'Erro de conexão. Verifique sua internet.',
            'auth/too-many-requests': 'Muitas tentativas. Aguarde alguns minutos.',
            'auth/invalid-credential': 'Email ou senha inválidos.',
            'auth/operation-not-allowed': 'Operação não permitida.',
            'auth/requires-recent-login': 'Por segurança, faça login novamente.'
        };
        
        return errorMessages[error.code] || error.message || 'Erro desconhecido. Tente novamente.';
    }
    
    // API Pública
    return {
        init: init,
        login: login,
        logout: logout,
        getCurrentUser: getCurrentUser,
        isAuthenticated: isAuthenticated,
        isInitialized: isInitialized,
        getErrorMessage: getErrorMessage
    };
})();

// Disponibiliza AuthModule globalmente
window.AuthModule = AuthModule;

