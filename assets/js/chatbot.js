/**
 * ============================================
 * PORTAL EDUCA - CHATBOT DEV
 * ============================================
 */

(function() {
    'use strict';

    let chatHistory = JSON.parse(localStorage.getItem('chatbotHistory') || '[]');
    let currentChatId = null;
    let messages = [];

    function init() {
        if (!document.querySelector('.chatbot-theme')) return;
        
        setupChatbot();
        loadChatHistory();
    }

    function setupChatbot() {
        const form = document.getElementById('chatbot-form');
        const textarea = document.getElementById('chatbot-textarea');
        const newChatBtn = document.getElementById('new-chat-btn');
        const suggestionBtns = document.querySelectorAll('.suggestion-btn');

        // Auto-resize textarea
        if (textarea) {
            textarea.addEventListener('input', () => {
                textarea.style.height = 'auto';
                textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
            });
        }

        // Form submit
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const message = textarea.value.trim();
                if (message) {
                    sendMessage(message);
                    textarea.value = '';
                    textarea.style.height = 'auto';
                }
            });
        }

        // New chat
        if (newChatBtn) {
            newChatBtn.addEventListener('click', startNewChat);
        }

        // Suggestions
        suggestionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const suggestion = btn.dataset.suggestion;
                if (suggestion) {
                    sendMessage(suggestion);
                }
            });
        });
    }

    function startNewChat() {
        if (messages.length > 0) {
            saveCurrentChat();
        }
        currentChatId = Date.now().toString();
        messages = [];
        renderMessages();
        updateHistory();
    }

    function sendMessage(text) {
        if (!currentChatId) {
            currentChatId = Date.now().toString();
        }

        // Hide empty state
        const empty = document.getElementById('chatbot-empty');
        if (empty) empty.style.display = 'none';

        // Add user message
        const userMessage = {
            id: Date.now().toString(),
            role: 'user',
            text: text,
            timestamp: Date.now()
        };
        messages.push(userMessage);
        renderMessages();

        // Simulate AI response
        setTimeout(() => {
            const aiMessage = {
                id: (Date.now() + 1).toString(),
                role: 'ai',
                text: generateAIResponse(text),
                timestamp: Date.now()
            };
            messages.push(aiMessage);
            renderMessages();
            saveCurrentChat();
            updateHistory();
        }, 1000);
    }

    function generateAIResponse(userText) {
        const lowerText = userText.toLowerCase();
        
        if (lowerText.includes('python') || lowerText.includes('integração')) {
            return `Claro! Segue um exemplo de integração Python com o Portal Educa:

\`\`\`python
import requests

BASE_URL = "https://api.portaleduca.dev"
token = "SEU_TOKEN"

payload = {"matricula": "2025A001"}
response = requests.post(
    f"{BASE_URL}/webhooks/sincronizar",
    json=payload,
    headers={"Authorization": f"Bearer {token}"}
)
print(response.json())
\`\`\`

Posso ajudar com CustomTkinter, endpoints ou revisão de prompts. O que você precisa?`;
        }
        
        if (lowerText.includes('customtkinter') || lowerText.includes('desktop')) {
            return `Para criar uma interface desktop com CustomTkinter conectada ao Portal Educa:

\`\`\`python
import customtkinter as ctk
import requests

class PortalApp(ctk.CTk):
    def __init__(self):
        super().__init__()
        self.title("Portal Educa Desktop")
        # Adicione seus componentes aqui
\`\`\`

Quer um exemplo completo de integração?`;
        }
        
        if (lowerText.includes('deploy') || lowerText.includes('checklist')) {
            return `Checklist de Deploy do Portal Educa:

✅ Verificar variáveis de ambiente
✅ Testar endpoints locais
✅ Validar build do frontend
✅ Configurar GitHub Actions
✅ Testar deploy em staging
✅ Validar performance

Precisa de ajuda com algum passo específico?`;
        }
        
        if (lowerText.includes('endpoint')) {
            return `Endpoints disponíveis no Portal Educa:

- POST /api/webhooks/sincronizar - Sincronizar dados
- GET /api/usuarios - Listar usuários
- POST /api/matriculas - Criar matrícula
- GET /api/relatorios - Gerar relatórios

Quer ver exemplos de uso de algum endpoint específico?`;
        }
        
        return `Entendi! Posso ajudar com:
- Integrações Python
- Scripts CustomTkinter
- Endpoints e APIs
- Prompts e processos
- Deploy e configuração

O que você gostaria de explorar?`;
    }

    function renderMessages() {
        const container = document.getElementById('chatbot-messages');
        if (!container) return;

        if (messages.length === 0) {
            const empty = document.getElementById('chatbot-empty');
            if (empty) empty.style.display = 'flex';
            container.innerHTML = '';
            return;
        }

        const empty = document.getElementById('chatbot-empty');
        if (empty) empty.style.display = 'none';

        container.innerHTML = messages.map(msg => {
            const isUser = msg.role === 'user';
            const avatar = isUser ? 'V' : '🤖';
            const author = isUser ? 'Você' : 'Educa AI';
            
            // Check if message contains code blocks
            const hasCode = msg.text.includes('```');
            let textHtml = msg.text;
            
            if (hasCode) {
                textHtml = msg.text.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
                    return `<pre><code>${escapeHtml(code.trim())}</code></pre>`;
                });
            } else {
                textHtml = escapeHtml(msg.text).replace(/\n/g, '<br>');
            }

            return `
                <div class="chat-message ${isUser ? 'message-user' : 'message-ai'}">
                    <div class="chat-message__avatar">${avatar}</div>
                    <div class="chat-message__content">
                        <div class="chat-message__author">${author}</div>
                        <div class="chat-message__text">${textHtml}</div>
                    </div>
                </div>
            `;
        }).join('');

        // Scroll to bottom
        container.scrollTop = container.scrollHeight;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function saveCurrentChat() {
        if (!currentChatId || messages.length === 0) return;

        const chat = {
            id: currentChatId,
            title: messages[0].text.substring(0, 50),
            messages: messages,
            timestamp: Date.now()
        };

        // Remove old chat if exists
        chatHistory = chatHistory.filter(c => c.id !== currentChatId);
        chatHistory.unshift(chat);
        
        // Keep only last 20 chats
        if (chatHistory.length > 20) {
            chatHistory = chatHistory.slice(0, 20);
        }

        localStorage.setItem('chatbotHistory', JSON.stringify(chatHistory));
    }

    function loadChatHistory() {
        const container = document.getElementById('chat-history-list');
        if (!container) return;

        if (chatHistory.length === 0) {
            container.innerHTML = '<p style="color: rgba(255,255,255,0.5); font-size: 0.875rem; text-align: center; padding: var(--spacing-md);">Nenhuma conversa ainda</p>';
            return;
        }

        container.innerHTML = chatHistory.map(chat => {
            const date = new Date(chat.timestamp);
            const dateStr = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
            
            return `
                <button class="chatbot-history-item" data-chat-id="${chat.id}">
                    <div style="font-weight: 500; margin-bottom: 0.25rem;">${escapeHtml(chat.title)}</div>
                    <div style="font-size: 0.75rem; color: rgba(255,255,255,0.5);">${dateStr}</div>
                </button>
            `;
        }).join('');

        // Attach click handlers
        container.querySelectorAll('.chatbot-history-item').forEach(btn => {
            btn.addEventListener('click', () => {
                const chatId = btn.dataset.chatId;
                loadChat(chatId);
            });
        });
    }

    function loadChat(chatId) {
        const chat = chatHistory.find(c => c.id === chatId);
        if (!chat) return;

        currentChatId = chatId;
        messages = chat.messages;
        renderMessages();
    }

    function updateHistory() {
        loadChatHistory();
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

