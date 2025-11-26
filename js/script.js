/* ============================================
   PORTAL EDUCA - JAVASCRIPT
   Organizado com separação de responsabilidades
   ============================================ */

/**
 * ============================================
 * 1. MÓDULO DE NAVEGAÇÃO
 * ============================================
 */

const NavigationModule = (function() {
    'use strict';
    
    // Elementos do DOM
    let menuToggle = null;
    let navList = null;
    let navLinks = null;
    
    /**
     * Inicializa o módulo de navegação
     */
    function init() {
        menuToggle = document.querySelector('.header__menu-toggle');
        navList = document.querySelector('.header__nav-list');
        navLinks = document.querySelectorAll('.header__nav-link');
        
        if (!menuToggle || !navList) {
            console.warn('Elementos de navegação não encontrados');
            return;
        }
        
        setupEventListeners();
    }
    
    /**
     * Configura os event listeners
     */
    function setupEventListeners() {
        // Toggle do menu mobile
        if (menuToggle) {
            menuToggle.addEventListener('click', handleMenuToggle);
        }
        
        // Fechar menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', handleNavLinkClick);
        });
        
        // Scroll suave para âncoras
        setupSmoothScroll();
        
        // Atualizar navegação ao scroll
        window.addEventListener('scroll', handleScroll);
    }
    
    /**
     * Manipula o toggle do menu mobile
     */
    function handleMenuToggle() {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navList.classList.toggle('header__nav-list--open');
    }
    
    /**
     * Fecha o menu ao clicar em um link
     */
    function handleNavLinkClick() {
        if (window.innerWidth <= 768) {
            menuToggle.setAttribute('aria-expanded', 'false');
            navList.classList.remove('header__nav-list--open');
        }
    }
    
    /**
     * Configura scroll suave para âncoras
     */
    function setupSmoothScroll() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Verifica se é um link âncora
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const headerHeight = document.querySelector('.header').offsetHeight;
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
     * Atualiza navegação ativa baseada na posição do scroll
     */
    function handleScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('header__nav-link--active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('header__nav-link--active');
                    }
                });
            }
        });
    }
    
    // API Pública
    return {
        init: init
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
    
    /**
     * Manipula o redimensionamento da janela
     */
    window.addEventListener('resize', function() {
        // Fecha o menu mobile se estiver aberto em telas grandes
        const menuToggle = document.querySelector('.header__menu-toggle');
        const navList = document.querySelector('.header__nav-list');
        
        if (window.innerWidth > 768 && navList && navList.classList.contains('header__nav-list--open')) {
            menuToggle.setAttribute('aria-expanded', 'false');
            navList.classList.remove('header__nav-list--open');
        }
    });
})();
