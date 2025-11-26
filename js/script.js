/**
 * ============================================
 * PORTAL EDUCA - JAVASCRIPT PRINCIPAL
 * Estrutura modular e organizada
 * ============================================
 */

/**
 * ============================================
 * 1. MÓDULO PRINCIPAL DA APLICAÇÃO
 * ============================================
 */
const App = (function() {
    'use strict';
    
    /**
     * Inicializa a aplicação
     */
    function init() {
        try {
            // Inicializa autenticação
            if (window.AuthModule) {
                window.AuthModule.init();
            }
            
            // Inicializa modal de login
            if (window.LoginModalModule) {
                window.LoginModalModule.init();
            }
            
            // Inicializa o router
            if (window.Router) {
                window.Router.init();
            }
            
            console.log('✅ Portal Educa - Aplicação inicializada');
            
        } catch (error) {
            console.error('❌ Erro ao inicializar aplicação:', error);
        }
    }
    
    // API Pública
    return {
        init: init
    };
})();

/**
 * ============================================
 * 2. INICIALIZAÇÃO
 * ============================================
 */
(function() {
    'use strict';
    
    // Aguarda o DOM estar pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            console.log('🚀 Portal Educa - Iniciando...');
            App.init();
        });
    } else {
        // DOM já está pronto
        console.log('🚀 Portal Educa - Iniciando...');
        App.init();
    }
})();

