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
            // Inicializa o router
            Router.init();
            
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
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portal Educa - Iniciando...');
    App.init();
});

