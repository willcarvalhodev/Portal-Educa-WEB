/**
 * ============================================
 * PORTAL EDUCA - MÓDULO DESENVOLVEDORA
 * Gerencia funcionalidades do modo desenvolvedor e chatbot
 * ============================================
 */
const DesenvolvedoraModule = (function() {
    'use strict';
    
    // Configuração da API Gemini
    const GEMINI_MODEL = 'gemini-1.5-flash';
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
    const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY'; // Substitua com sua chave da API Gemini em js/desenvolvedora.js
    
    // Elementos do DOM
    let chatbotForm = null;
    let chatbotInput = null;
    let chatbotMessages = null;
    let chatbotSendButton = null;
    let chatbotStatus = null;
    
    // Estado do chat
    let isProcessing = false;
    
    /**
     * Inicializa o módulo desenvolvedora
     */
    function init() {
        try {
            // Busca elementos do DOM
            chatbotForm = document.getElementById('chatbot-dev-form');
            chatbotInput = document.getElementById('chatbot-dev-input');
            chatbotMessages = document.getElementById('chatbot-dev-messages');
            chatbotSendButton = document.getElementById('chatbot-dev-send-button');
            chatbotStatus = document.getElementById('chatbot-dev-status');
            
            if (!chatbotForm || !chatbotInput || !chatbotMessages) {
                console.warn('Elementos do chatbot não encontrados');
            }
            
            initDeveloperModeChat();
            
            console.log('✅ DesenvolvedoraModule inicializado');
            
        } catch (error) {
            console.error('❌ Erro ao inicializar DesenvolvedoraModule:', error);
        }
    }
    
    /**
     * Inicializa o chatbot do modo desenvolvedor
     */
    function initDeveloperModeChat() {
        if (!chatbotForm || !chatbotInput) return;
        
        // Event listener para o formulário
        chatbotForm.addEventListener('submit', handleChatSubmit);
        
        // Permite enviar com Enter (mas não Shift+Enter para nova linha)
        chatbotInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (!isProcessing) {
                    chatbotForm.dispatchEvent(new Event('submit'));
                }
            }
        });
        
        // Atualiza status inicial
        updateStatus('Pronto para conversar');
    }
    
    /**
     * Manipula o envio de mensagens no chat
     * @param {Event} event - Evento de submissão do formulário
     */
    async function handleChatSubmit(event) {
        event.preventDefault();
        
        if (isProcessing || !chatbotInput || !chatbotMessages) return;
        
        const message = chatbotInput.value.trim();
        
        if (!message) {
            return;
        }
        
        // Limpa o input
        chatbotInput.value = '';
        
        // Adiciona mensagem do usuário
        addMessage(message, 'user');
        
        // Mostra mensagem de loading
        const loadingMessageId = addMessage('Pensando...', 'loading');
        
        // Processa a mensagem
        isProcessing = true;
        updateStatus('Enviando mensagem...');
        if (chatbotSendButton) chatbotSendButton.disabled = true;
        
        try {
            const response = await sendMessageToGemini(message);
            
            // Remove mensagem de loading
            removeMessage(loadingMessageId);
            
            // Adiciona resposta da IA
            addMessage(response, 'assistant');
            updateStatus('Mensagem recebida');
            
        } catch (error) {
            console.error('❌ Erro ao enviar mensagem:', error);
            
            // Remove mensagem de loading
            removeMessage(loadingMessageId);
            
            // Mostra mensagem de erro
            addMessage('Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.', 'system');
            updateStatus('Erro ao processar mensagem');
        } finally {
            isProcessing = false;
            if (chatbotSendButton) chatbotSendButton.disabled = false;
            if (chatbotInput) chatbotInput.focus();
        }
    }
    
    /**
     * Envia mensagem para a API Gemini com Exponential Backoff
     * @param {string} query - Mensagem do usuário
     * @returns {Promise<string>} Resposta da IA
     */
    async function sendMessageToGemini(query) {
        const maxRetries = 3;
        let retryCount = 0;
        let baseDelay = 1000; // 1 segundo
        
        // Verifica se a chave da API está configurada
        if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY') {
            throw new Error('Chave da API Gemini não configurada. Por favor, configure a chave em js/desenvolvedora.js');
        }
        
        while (retryCount < maxRetries) {
            try {
                const url = `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`;
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: query
                            }]
                        }],
                        generationConfig: {
                            temperature: 0.7,
                            topK: 40,
                            topP: 0.95,
                            maxOutputTokens: 1024,
                        }
                    })
                });
                
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                
                // Extrai o texto da resposta
                if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                    const text = data.candidates[0].content.parts[0].text;
                    return text;
                } else {
                    throw new Error('Resposta da API não contém texto válido');
                }
                
            } catch (error) {
                retryCount++;
                
                // Se não há mais tentativas, relança o erro
                if (retryCount >= maxRetries) {
                    throw error;
                }
                
                // Exponential Backoff: calcula o delay
                const delay = baseDelay * Math.pow(2, retryCount - 1);
                
                console.warn(`Tentativa ${retryCount} falhou. Tentando novamente em ${delay}ms...`, error);
                updateStatus(`Tentando novamente (${retryCount}/${maxRetries})...`);
                
                // Aguarda antes de tentar novamente
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    
    /**
     * Adiciona uma mensagem ao chat
     * @param {string} text - Texto da mensagem
     * @param {string} type - Tipo da mensagem ('user', 'assistant', 'system', 'loading')
     * @returns {string} ID da mensagem criada
     */
    function addMessage(text, type = 'system') {
        if (!chatbotMessages) return '';
        
        const messageId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const messageDiv = document.createElement('div');
        messageDiv.id = messageId;
        messageDiv.className = `chatbot-dev__message chatbot-dev__message--${type}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'chatbot-dev__message-content';
        
        // Converte quebras de linha em <br>
        const formattedText = text.replace(/\n/g, '<br>');
        contentDiv.innerHTML = formattedText;
        
        messageDiv.appendChild(contentDiv);
        chatbotMessages.appendChild(messageDiv);
        
        // Scroll para a última mensagem
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
        return messageId;
    }
    
    /**
     * Remove uma mensagem do chat
     * @param {string} messageId - ID da mensagem a ser removida
     */
    function removeMessage(messageId) {
        if (!messageId) return;
        
        const messageElement = document.getElementById(messageId);
        if (messageElement) {
            messageElement.remove();
        }
    }
    
    /**
     * Atualiza o status do chatbot
     * @param {string} status - Texto do status
     */
    function updateStatus(status) {
        if (chatbotStatus) {
            chatbotStatus.textContent = status || '';
        }
    }
    
    // API Pública
    return {
        init: init,
        sendMessageToGemini: sendMessageToGemini
    };
})();

// Disponibiliza DesenvolvedoraModule globalmente
window.DesenvolvedoraModule = DesenvolvedoraModule;

// Inicializa automaticamente quando a página carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        DesenvolvedoraModule.init();
    });
} else {
    DesenvolvedoraModule.init();
}
