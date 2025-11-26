/**
 * ============================================
 * PORTAL EDUCA - CONFIGURAÇÃO FIREBASE
 * Configuração do Firebase Authentication
 * ============================================
 */

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Inicializa o Firebase (verifica se já foi inicializado)
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else if (typeof firebase === 'undefined') {
    console.warn('⚠️ Firebase SDK não carregado. Certifique-se de incluir os scripts do Firebase no HTML.');
}

// Exporta a instância de autenticação
const auth = typeof firebase !== 'undefined' ? firebase.auth() : null;

