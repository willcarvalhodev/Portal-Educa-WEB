/**
 * ============================================
 * PORTAL EDUCA - MÓDULO DE TRANSIÇÕES DE REVELAÇÃO
 * Gerencia animações de entrada suave (slide-up + fade-in)
 * ============================================
 */
const RevealTransitions = (function() {
    'use strict';

    /**
     * Ativa transições de revelação em elementos dentro de um container
     * @param {HTMLElement} containerElement - Container onde buscar elementos com .reveal-transition
     * @param {number} staggerDelay - Delay em ms entre cada elemento (padrão: 50ms)
     */
    function activateElementTransitions(containerElement, staggerDelay = 50) {
        if (!containerElement) {
            console.warn('⚠️ Container não encontrado para ativar transições');
            return;
        }

        // Encontra todos os elementos com a classe .reveal-transition
        const elements = containerElement.querySelectorAll('.reveal-transition');

        if (elements.length === 0) {
            console.warn('⚠️ Nenhum elemento com .reveal-transition encontrado');
            return;
        }

        // Itera sobre os elementos com delay escalonado
        elements.forEach((element, index) => {
            // Remove is-hidden e adiciona is-visible após delay
            setTimeout(() => {
                element.classList.remove('is-hidden');
                element.classList.add('is-visible');
            }, index * staggerDelay);
        });

        console.log(`✅ Transições ativadas para ${elements.length} elemento(s)`);
    }

    /**
     * Reinicia as transições (útil para re-animação)
     * @param {HTMLElement} containerElement - Container onde buscar elementos
     */
    function resetTransitions(containerElement) {
        if (!containerElement) return;

        const elements = containerElement.querySelectorAll('.reveal-transition');
        elements.forEach(element => {
            element.classList.remove('is-visible');
            element.classList.add('is-hidden');
        });
    }

    // API Pública
    return {
        activate: activateElementTransitions,
        reset: resetTransitions
    };
})();

// Disponibiliza globalmente
window.RevealTransitions = RevealTransitions;

