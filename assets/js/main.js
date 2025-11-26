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
        setupFlightExperience();
        console.log('✅ Aplicação inicializada');
    }

    /**
     * Prepara transição de voo entre páginas
     */
    function setupFlightExperience() {
        const flightTriggers = document.querySelectorAll('[data-flight]');
        const consultForm = document.querySelector('.consult-form');
        const roleTabs = document.querySelectorAll('[data-role-tab]');
        const rolePanels = document.querySelectorAll('[data-role-content]');

        if (flightTriggers.length) {
            const overlay = createFlightOverlay();

            flightTriggers.forEach(trigger => {
                trigger.addEventListener('click', event => {
                    handleFlightTrigger(event, trigger, overlay);
                });
            });
        }

        if (consultForm) {
            attachConsultFormHandler(consultForm);
        }

        if (roleTabs.length && rolePanels.length) {
            attachRoleTabs(roleTabs, rolePanels);
        }
    }

    function createFlightOverlay() {
        let overlay = document.querySelector('.flight-overlay');

        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'flight-overlay';
            overlay.innerHTML = `
                <div class="flight-window">
                    <div class="flight-sky">
                        <span class="flight-plane" aria-hidden="true">✈️</span>
                        <span class="flight-cloud cloud-a"></span>
                        <span class="flight-cloud cloud-b"></span>
                        <span class="flight-cloud cloud-c"></span>
                    </div>
                    <p class="flight-caption">Decolando...</p>
                </div>
            `;

            document.body.appendChild(overlay);
        }

        return overlay;
    }

    function handleFlightTrigger(event, trigger, overlay) {
        const href = trigger.getAttribute('href');
        const flightMode = trigger.dataset.flight || 'go';

        // Evita interceptar âncoras da mesma página
        if (!href || href.startsWith('#') || document.body.classList.contains('is-flight')) {
            return;
        }

        event.preventDefault();
        startFlightTransition(overlay, flightMode, () => {
            window.location.href = href;
        });
    }

    function startFlightTransition(overlay, mode, callback) {
        const body = document.body;
        const caption = overlay.querySelector('.flight-caption');
        const messages = {
            go: 'Decolando para a próxima experiência...',
            return: 'Pousando de volta ao hub...'
        };

        body.classList.add('is-flight');
        overlay.dataset.mode = mode;
        overlay.classList.add('is-active');
        caption.textContent = messages[mode] || messages.go;

        window.setTimeout(() => {
            callback();
        }, 1200);
    }

    function attachConsultFormHandler(form) {
        const successEl = form.querySelector('.form-success');

        form.addEventListener('submit', event => {
            event.preventDefault();

            if (successEl) {
                successEl.textContent = 'Recebemos sua solicitação de cotação! Responderemos em breve.';
                successEl.classList.add('is-visible');
            }

            form.reset();
        });
    }

    function attachRoleTabs(tabs, panels) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.dataset.roleTab;

                tabs.forEach(btn => btn.classList.toggle('is-active', btn === tab));
                panels.forEach(panel => {
                    panel.classList.toggle('is-visible', panel.dataset.roleContent === target);
                });
            });
        });
    }

    // Inicia a aplicação
    init();

    // Expõe funções globais se necessário
    window.PortalEduca = {
        init: initApp
    };

})();

