/* ============================================
   PORTAL EDUCA - JAVASCRIPT
   Organizado com separação de responsabilidades
   ============================================ */

/**
 * ============================================
 * 1. MÓDULO DE NAVEGAÇÃO
 * Componente Header responsivo com menu hamburger
 * ============================================
 */

const NavigationModule = (function() {
    'use strict';
    
    // Elementos do DOM
    let menuToggle = null;
    let navList = null;
    let navLinks = null;
    let header = null;
    
    // Constantes
    const MOBILE_BREAKPOINT = 768;
    const SCROLL_OFFSET = 150;
    const DEBOUNCE_DELAY = 100;
    
    // Controle de scroll (throttle)
    let scrollTimer = null;
    
    /**
     * Verifica se está em viewport mobile
     * @returns {boolean}
     */
    function isMobile() {
        return window.innerWidth < MOBILE_BREAKPOINT;
    }
    
    /**
     * Inicializa o módulo de navegação
     */
    function init() {
        try {
            // Busca elementos do DOM
            menuToggle = document.querySelector('.header__menu-toggle');
            navList = document.querySelector('.header__nav-list');
            navLinks = document.querySelectorAll('.header__nav-link');
            header = document.querySelector('.header');
            
            // Validação de elementos essenciais
            if (!header) {
                console.warn('Header não encontrado no DOM');
                return;
            }
            
            if (!navList) {
                console.warn('Lista de navegação não encontrada');
                return;
            }
            
            // Configura eventos apenas se os elementos existirem
            setupEventListeners();
            
            // Fecha menu se estiver aberto em desktop ao redimensionar
            handleResize();
            
            console.log('✅ NavigationModule inicializado com sucesso');
        } catch (error) {
            console.error('❌ Erro ao inicializar NavigationModule:', error);
        }
    }
    
    /**
     * Configura todos os event listeners
     */
    function setupEventListeners() {
        // Toggle do menu mobile (hamburger)
        if (menuToggle) {
            menuToggle.addEventListener('click', handleMenuToggle);
            menuToggle.addEventListener('keydown', handleMenuToggleKeydown);
        }
        
        // Logo clicável para voltar ao topo
        const logo = document.querySelector('.header__logo');
        if (logo) {
            logo.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#home' || href === '#') {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    // Fecha menu se estiver aberto
                    if (isMobile() && isMenuOpen()) {
                        closeMenu();
                    }
                }
            });
        }
        
        // Fechar menu ao clicar em um link (apenas mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', handleNavLinkClick);
        });
        
        // Scroll suave para âncoras
        setupSmoothScroll();
        
        // Atualizar navegação ativa ao scroll (com throttle)
        window.addEventListener('scroll', handleScrollThrottled, { passive: true });
        
        // Fechar menu ao redimensionar janela
        window.addEventListener('resize', handleResize, { passive: true });
        
        // Fechar menu ao clicar fora (apenas mobile)
        document.addEventListener('click', handleClickOutside, true);
        
        // Fechar menu ao pressionar ESC
        document.addEventListener('keydown', handleEscapeKey, true);
    }
    
    /**
     * Manipula o toggle do menu mobile (hamburger)
     * @param {Event} e - Evento de clique
     */
    function handleMenuToggle(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (!menuToggle || !navList) return;
        
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        const newState = !isExpanded;
        
        // Atualiza estado ARIA
        menuToggle.setAttribute('aria-expanded', String(newState));
        
        // Toggle classe do menu
        if (newState) {
            navList.classList.add('header__nav-list--open');
            // Previne scroll do body quando menu está aberto
            document.body.style.overflow = 'hidden';
        } else {
            navList.classList.remove('header__nav-list--open');
            document.body.style.overflow = '';
        }
    }
    
    /**
     * Manipula teclado no botão do menu (Enter e Space)
     * @param {KeyboardEvent} e - Evento de teclado
     */
    function handleMenuToggleKeydown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleMenuToggle(e);
        }
    }
    
    /**
     * Fecha o menu ao clicar fora dele (apenas mobile)
     * @param {Event} e - Evento de clique
     */
    function handleClickOutside(e) {
        if (!isMobile()) return;
        
        const isMenuOpen = navList && navList.classList.contains('header__nav-list--open');
        if (!isMenuOpen) return;
        
        const clickedInsideNav = navList.contains(e.target);
        const clickedOnToggle = menuToggle && menuToggle.contains(e.target);
        
        if (!clickedInsideNav && !clickedOnToggle) {
            closeMenu();
        }
    }
    
    /**
     * Fecha o menu ao pressionar ESC
     * @param {KeyboardEvent} e - Evento de teclado
     */
    function handleEscapeKey(e) {
        if (e.key === 'Escape' && isMenuOpen()) {
            closeMenu();
            // Foca no botão toggle após fechar
            if (menuToggle) {
                menuToggle.focus();
            }
        }
    }
    
    /**
     * Verifica se o menu está aberto
     * @returns {boolean}
     */
    function isMenuOpen() {
        return navList && navList.classList.contains('header__nav-list--open');
    }
    
    /**
     * Fecha o menu mobile
     */
    function closeMenu() {
        if (!menuToggle || !navList) return;
        
        menuToggle.setAttribute('aria-expanded', 'false');
        navList.classList.remove('header__nav-list--open');
        document.body.style.overflow = '';
    }
    
    /**
     * Fecha o menu ao clicar em um link de navegação (apenas mobile)
     */
    function handleNavLinkClick() {
        if (isMobile() && isMenuOpen()) {
            closeMenu();
        }
    }
    
    /**
     * Configura scroll suave para links âncora
     */
    function setupSmoothScroll() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Verifica se é um link âncora
                if (href && href.startsWith('#')) {
                    const targetId = href.substring(1);
                    
                    // Se for apenas #, rola para o topo
                    if (!targetId || targetId === 'home') {
                        e.preventDefault();
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                        return;
                    }
                    
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        e.preventDefault();
                        
                        const headerHeight = header ? header.offsetHeight : 0;
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
     * Atualiza navegação ativa baseada na posição do scroll (com throttle)
     */
    function handleScrollThrottled() {
        if (scrollTimer) return;
        
        scrollTimer = setTimeout(() => {
            handleScroll();
            scrollTimer = null;
        }, DEBOUNCE_DELAY);
    }
    
    /**
     * Atualiza navegação ativa baseada na posição do scroll
     */
    function handleScroll() {
        if (!navLinks || navLinks.length === 0) return;
        
        const sections = document.querySelectorAll('section[id]');
        if (sections.length === 0) return;
        
        const scrollPosition = window.pageYOffset + SCROLL_OFFSET;
        let currentSection = null;
        
        // Encontra a seção atual
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Atualiza classes ativas
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            const sectionId = linkHref ? linkHref.substring(1) : null;
            
            link.classList.remove('header__nav-link--active');
            
            if (sectionId === currentSection || (sectionId === 'home' && !currentSection && window.pageYOffset < 100)) {
                link.classList.add('header__nav-link--active');
            }
        });
    }
    
    /**
     * Fecha menu ao redimensionar para desktop
     */
    function handleResize() {
        if (!isMobile() && isMenuOpen()) {
            closeMenu();
        }
    }
    
    // API Pública
    return {
        init: init,
        closeMenu: closeMenu // Expor para uso externo se necessário
    };
})();

/**
 * ============================================
 * 2. MÓDULO DE ANIMAÇÕES
 * ============================================
 */

const AnimationModule = (function() {
    'use strict';
    
    let observer = null;
    
    /**
     * Inicializa o módulo de animações
     */
    function init() {
        setupIntersectionObserver();
    }
    
    /**
     * Configura o Intersection Observer para animações ao scroll
     */
    function setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        // Observa elementos que devem ser animados
        const animateElements = document.querySelectorAll('.feature-card, .about__container, .contact__container');
        animateElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }
    
    // API Pública
    return {
        init: init
    };
})();

/**
 * ============================================
 * 3. MÓDULO DE UTILITÁRIOS
 * ============================================
 */

const UtilsModule = (function() {
    'use strict';
    
    /**
     * Atualiza o ano no footer
     */
    function updateFooterYear() {
        const yearElement = document.querySelector('.footer__year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
    
    /**
     * Previne quebra de layout em imagens sem dimensões
     */
    function handleImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.hasAttribute('width') && !img.hasAttribute('height')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }
    
    /**
     * Inicializa utilitários
     */
    function init() {
        updateFooterYear();
        handleImages();
    }
    
    // API Pública
    return {
        init: init
    };
})();

/**
 * ============================================
 * 4. INICIALIZAÇÃO PRINCIPAL
 * ============================================
 */

(function() {
    'use strict';
    
    /**
     * Aguarda o DOM estar totalmente carregado
     */
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🚀 Portal Educa - Iniciando aplicação...');
        
        // Inicializa todos os módulos
        try {
            NavigationModule.init();
            AnimationModule.init();
            UtilsModule.init();
            
            console.log('✅ Portal Educa - Aplicação iniciada com sucesso!');
        } catch (error) {
            console.error('❌ Erro ao iniciar aplicação:', error);
        }
    });
    
})();
