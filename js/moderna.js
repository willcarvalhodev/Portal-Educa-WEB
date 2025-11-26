/**
 * ============================================
 * PORTAL EDUCA - MÓDULO MODERNA
 * Gerencia a experiência moderna/comercial
 * ============================================
 */
const ModernaModule = (function() {
    'use strict';
    
    /**
     * Inicializa o módulo moderna
     */
    function init() {
        try {
            setupEventListeners();
            setupSmoothScroll();
            updateCurrentYear();
            activateRevealTransitions();
            console.log('✅ ModernaModule inicializado');
        } catch (error) {
            console.error('❌ Erro ao inicializar ModernaModule:', error);
        }
    }
    
    /**
     * Ativa transições de revelação para elementos da página
     */
    function activateRevealTransitions() {
        // Aguarda um pequeno delay para garantir que o DOM está renderizado
        setTimeout(() => {
            const mainContainer = document.querySelector('.main-moderna');
            if (mainContainer && window.RevealTransitions) {
                window.RevealTransitions.activate(mainContainer, 50);
            }
        }, 100);
    }
    
    /**
     * Configura os event listeners
     */
    function setupEventListeners() {
        // Links de navegação
        const navLinks = document.querySelectorAll('.header-moderna__nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', handleNavLinkClick);
        });
    }
    
    /**
     * Configura scroll suave para links de navegação
     */
    function setupSmoothScroll() {
        const navLinks = document.querySelectorAll('.header-moderna__nav-link[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const headerHeight = 80;
                        const targetPosition = targetElement.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    
    /**
     * Manipula clique nos links de navegação
     */
    function handleNavLinkClick(e) {
        // Scroll suave já é tratado por setupSmoothScroll
        // Pode adicionar lógica adicional aqui se necessário
    }
    
    /**
     * Atualiza o ano no footer
     */
    function updateCurrentYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
    
    // API Pública
    return {
        init: init
    };
})();

// Disponibiliza ModernaModule globalmente
window.ModernaModule = ModernaModule;

// Inicializa automaticamente quando a página carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        ModernaModule.init();
    });
} else {
    ModernaModule.init();
}

