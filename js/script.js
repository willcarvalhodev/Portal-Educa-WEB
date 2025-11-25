// Menu Mobile Toggle
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Scroll Suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header com scroll
let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Tabs de Soluções
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active de todos
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Adiciona active no selecionado
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Animação ao scroll (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .solution-feature, .benefit-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Animação do dashboard mockup
const dashboardMockup = document.querySelector('.dashboard-mockup');
if (dashboardMockup) {
    let mouseX = 0;
    let mouseY = 0;
    
    dashboardMockup.addEventListener('mousemove', (e) => {
        const rect = dashboardMockup.getBoundingClientRect();
        mouseX = (e.clientX - rect.left) / rect.width;
        mouseY = (e.clientY - rect.top) / rect.height;
        
        const rotateY = (mouseX - 0.5) * 10;
        const rotateX = (0.5 - mouseY) * 10;
        
        dashboardMockup.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    });
    
    dashboardMockup.addEventListener('mouseleave', () => {
        dashboardMockup.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(5deg)';
    });
}

// Animação dos nós de IA
const aiNodes = document.querySelectorAll('.ai-node');
if (aiNodes.length > 0) {
    aiNodes.forEach((node, index) => {
        node.style.animation = `float ${3 + index}s infinite ease-in-out`;
        node.style.animationDelay = `${index * 0.5}s`;
    });
}
