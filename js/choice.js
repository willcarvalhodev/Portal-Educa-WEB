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
        const choiceCards = document.querySelectorAll('.choice-card');
        
        choiceCards.forEach(card => {
            card.addEventListener('click', handleCardClick);
        });
    }
    
    /**
     * Manipula o clique nos cards de escolha
     * @param {Event} event - Evento de clique
     */
    function handleCardClick(event) {
        const card = event.currentTarget;
        const experience = card.getAttribute('data-experience');
        
        if (!experience) {
            console.error('Experiência não definida no card');
            return;
        }
        
        // Animação de saída
        card.style.transform = 'scale(0.95)';
        card.style.opacity = '0.8';
        
        // Navega após pequeno delay para animação
        setTimeout(() => {
            Router.navigateTo(experience);
        }, 200);
    }
    
    // API Pública
    return {
        init: init
    };
})();

// Disponibiliza ChoiceModule globalmente
window.ChoiceModule = ChoiceModule;

