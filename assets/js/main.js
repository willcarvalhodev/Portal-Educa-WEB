/**
 * ============================================
 * PORTAL EDUCA - JAVASCRIPT PRINCIPAL
 * ============================================
 */

(function() {
    'use strict';

    /**
     * Inicialização da aplicação
     */
    function init() {
        console.log('🚀 Portal Educa iniciado');
        
        // Aguarda o DOM estar completamente carregado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initApp);
        } else {
            initApp();
        }
    }

    /**
     * Inicializa componentes da aplicação
     */
    function initApp() {
        // Componentes serão inicializados aqui
        console.log('✅ Aplicação inicializada');
    }

    // Inicia a aplicação
    init();

    // Expõe funções globais se necessário
    window.PortalEduca = {
        init: initApp
    };

})();

