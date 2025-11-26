/**
 * ============================================
 * PORTAL EDUCA - SISTEMA DE ROTEAMENTO
 * Gerencia navegação entre diferentes views
 * ============================================
 */
const Router = (function() {
    'use strict';
    
    let appContainer = null;
    let currentRoute = null;
    
    /**
     * Inicializa o router
     */
    function init() {
        appContainer = document.getElementById('app-container');
        
        if (!appContainer) {
            console.error('Container da aplicação não encontrado para o router');
            return;
        }
        
        // Inicia na rota de escolha
        navigateTo('escolha');
        
        console.log('✅ Router inicializado');
    }
    
    /**
     * Navega para uma rota específica
     * @param {string} route - Nome da rota
     */
    async function navigateTo(route) {
        if (!appContainer) return;
        
        try {
            currentRoute = route;
            
            // Mapeamento de rotas para arquivos
            const routeMap = {
                'escolha': 'views/escolha.html',
                'moderna': 'views/moderna.html',
                'desenvolvedora': 'views/desenvolvedora.html'
            };
            
            const viewPath = routeMap[route];
            
            if (!viewPath) {
                console.error(`Rota "${route}" não encontrada`);
                return;
            }
            
            // Carrega o HTML da view
            const response = await fetch(viewPath);
            
            if (!response.ok) {
                throw new Error(`Erro ao carregar view: ${response.status}`);
            }
            
            const html = await response.text();
            
            // Injeta o HTML no container
            appContainer.innerHTML = html;
            
            // Inicializa módulos específicos da view
            initializeView(route);
            
            console.log(`✅ Navegado para: ${route}`);
            
        } catch (error) {
            console.error(`❌ Erro ao navegar para "${route}":`, error);
            appContainer.innerHTML = `
                <div style="padding: 2rem; text-align: center;">
                    <h2>Erro ao carregar página</h2>
                    <p>${error.message}</p>
                </div>
            `;
        }
    }
    
    /**
     * Inicializa módulos específicos de cada view
     * @param {string} route - Nome da rota
     */
    function initializeView(route) {
        // Aguarda um pouco para garantir que o DOM foi atualizado
        setTimeout(() => {
            if (route === 'escolha') {
                ChoiceModule.init();
            } else if (route === 'moderna') {
                ModernaModule.init();
            } else if (route === 'desenvolvedora') {
                DesenvolvedoraModule.init();
            }
        }, 100);
    }
    
    /**
     * Retorna a rota atual
     * @returns {string}
     */
    function getCurrentRoute() {
        return currentRoute;
    }
    
    // API Pública
    return {
        init: init,
        navigateTo: navigateTo,
        getCurrentRoute: getCurrentRoute
    };
})();

