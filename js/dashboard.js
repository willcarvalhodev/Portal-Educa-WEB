// ============================================
// DASHBOARD - FUNCIONALIDADES
// ============================================

// Carregar informações do usuário
function loadUserInfo() {
    const userName = localStorage.getItem('portalEducaUserName');
    const userEmail = localStorage.getItem('portalEducaUserEmail');
    
    if (userName) {
        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            // Capitalizar primeira letra
            const capitalizedName = userName.charAt(0).toUpperCase() + userName.slice(1);
            userNameElement.textContent = capitalizedName;
        }
    }
}

// Logout
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja sair?')) {
            // Limpar localStorage
            localStorage.removeItem('portalEducaLoggedIn');
            localStorage.removeItem('portalEducaUserEmail');
            localStorage.removeItem('portalEducaUserName');
            
            // Redirecionar para login
            window.location.href = 'login.html';
        }
    });
}

// Proteção de rota - verificar se está logado
function checkAuth() {
    const isLoggedIn = localStorage.getItem('portalEducaLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html';
    }
}

// Verificar autenticação a cada 30 segundos
setInterval(checkAuth, 30000);

// Carregar informações ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    loadUserInfo();
    checkAuth();
});

// Animações dos cards
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

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.stat-card, .action-card, .activity-item');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

console.log('📊 Dashboard Carregado!');

