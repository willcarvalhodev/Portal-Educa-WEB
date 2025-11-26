/**
 * ============================================
 * FIREBASE CONFIGURAÇÃO
 * Configuração do Firebase Auth para autenticação
 * ============================================
 */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// Configuração do Firebase
// IMPORTANTE: Substitua com suas próprias credenciais do Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Inicializa Firebase
try {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    
    // Disponibiliza globalmente
    window.firebaseApp = app;
    window.firebaseAuth = auth;
    
    console.log('✅ Firebase inicializado com sucesso');
} catch (error) {
    console.error('❌ Erro ao inicializar Firebase:', error);
    window.firebaseAuth = null;
}

