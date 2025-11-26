/**
 * ============================================
 * PORTAL EDUCA - MÓDULO DE ESCOLHA
 * Gerencia a tela de escolha de experiência
 * ============================================
 */
const ChoiceModule = (function() {
    'use strict';
    
    /**
     * Inicializa o módulo de escolha
     */
    function init() {
        try {
            setupEventListeners();
            console.log('✅ ChoiceModule inicializado');
        } catch (error) {
            console.error('❌ Erro ao inicializar ChoiceModule:', error);
        }
    }
    
    /**
     * Configura os event listeners
     */
    function setupEventListeners() {
        const choiceButtons = document.querySelectorAll('.choice-card__button');
        
        choiceButtons.forEach(button => {
            button.addEventListener('click', handleButtonClick);
        });
        
        // Adiciona efeito hover nos cards
        const choiceCards = document.querySelectorAll('.choice-card');
        choiceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            });
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    /**
     * Manipula o clique nos botões de escolha
     * @param {Event} event - Evento de clique
     */
    function handleButtonClick(event) {
        // Animação de clique
        const button = event.currentTarget;
        button.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
        
        // A navegação é feita pelo link HTML normal
    }
    
    // API Pública
    return {
        init: init
    };
})();

// Disponibiliza ChoiceModule globalmente
window.ChoiceModule = ChoiceModule;

// Inicializa automaticamente quando a página carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        ChoiceModule.init();
    });
} else {
    ChoiceModule.init();
}

