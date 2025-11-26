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

    async function sendMessage(text) {
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

        // Chamar API do Gemini
        try {
            const respostaIA = await chamarGeminiAPI(text);
            
            const aiMessage = {
                id: (Date.now() + 1).toString(),
                role: 'ai',
                text: respostaIA,
                timestamp: Date.now()
            };
            messages.push(aiMessage);
            renderMessages();
            saveCurrentChat();
            updateHistory();
        } catch (error) {
            console.error('Erro ao chamar Gemini API:', error);
            
            // Tratar erro de fora do nicho
            if (error.message === 'FORA_NICHO') {
                alert('⚠️ Este assistente é especializado apenas em questões de programação e desenvolvimento de software.\n\nPor favor, faça perguntas relacionadas a:\n- Linguagens de programação\n- Frameworks e bibliotecas\n- APIs e integrações\n- Ferramentas de desenvolvimento\n- Arquitetura de software\n- Boas práticas de programação');
                return;
            }
            
            // Tratar erro de backend offline
            if (error.message === 'BACKEND_OFFLINE') {
                alert('⚠️ Backend não disponível\n\nO servidor da API não está respondendo. Por favor:\n\n1. Verifique se o backend foi deployado no Render\n2. Acesse: https://render.com e verifique o status do serviço\n3. Aguarde alguns minutos se o deploy acabou de ser feito\n4. Verifique a URL do backend nos arquivos de configuração\n\nURL esperada: https://portal-educa-api.onrender.com/api/gemini');
                return;
            }
            
            // Mostrar erro genérico
            alert('Erro ao processar sua mensagem. Por favor, tente novamente.\n\nDetalhes: ' + (error.message || 'Erro desconhecido'));
        }
    }
    
    async function chamarGeminiAPI(mensagem) {
        // URL do backend
        // Para desenvolvimento local, descomente a linha abaixo e comente a de produção:
        // const API_URL = 'http://localhost:3000/api/gemini';
        const API_URL = 'https://portal-educa-api.onrender.com/api/gemini';
        
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mensagem }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                
                if (errorData.error === 'FORA_NICHO') {
                    throw new Error('FORA_NICHO');
                }
                
                throw new Error(errorData.message || errorData.error || 'Erro ao chamar API');
            }

            const data = await response.json();
            
            if (!data.resposta) {
                throw new Error('Resposta vazia da API');
            }

            return data.resposta;
        } catch (error) {
            console.error('Erro na API do Gemini:', error);
            
            // Verificar se é erro de conexão (backend não disponível)
            if (error.message.includes('Failed to fetch') || 
                error.message.includes('NetworkError') ||
                error.message.includes('Network request failed') ||
                error.name === 'TypeError') {
                
                // Tentar verificar se o backend está online
                try {
                    const healthCheck = await fetch(API_URL.replace('/api/gemini', '/api/health'));
                    if (!healthCheck.ok) {
                        throw new Error('BACKEND_OFFLINE');
                    }
                } catch (e) {
                    throw new Error('BACKEND_OFFLINE');
                }
            }
            
            throw error;
        }
    }
    
    // Função antiga (mantida para referência, mas não usada)
    async function chamarGeminiAPIDireto(mensagem) {
        // Esta função não deve ser usada - API key não deve estar no frontend
        const API_KEY = 'AIzaSyCqENZk9QG7d_S4I77kYgmHZbOXeNe0X-k';

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `${systemPrompt}\n\nPergunta do usuário: ${mensagem}\n\nResposta:`
                            }]
                        }],
                        generationConfig: {
                            temperature: 0.7,
                            topK: 40,
                            topP: 0.95,
                            maxOutputTokens: 1024,
                        },
                    }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'Erro ao chamar API do Gemini');
            }

            const data = await response.json();
            const resposta = data.candidates?.[0]?.content?.parts?.[0]?.text;
            
            if (!resposta) {
                throw new Error('Resposta vazia da API');
            }

            return resposta;
        } catch (error) {
            console.error('Erro na API do Gemini:', error);
            throw error;
        }
    }
    
    function validarNichoProgramacao(mensagem) {
        const palavrasProgramacao = [
            'programação', 'programar', 'código', 'código', 'desenvolvimento', 'desenvolver',
            'javascript', 'python', 'java', 'html', 'css', 'react', 'node', 'api', 'endpoint',
            'função', 'variável', 'array', 'objeto', 'classe', 'método', 'framework', 'biblioteca',
            'git', 'github', 'deploy', 'backend', 'frontend', 'fullstack', 'database', 'banco de dados',
            'sql', 'nosql', 'json', 'xml', 'rest', 'graphql', 'docker', 'kubernetes', 'aws', 'azure',
            'algoritmo', 'estrutura de dados', 'debug', 'teste', 'testar', 'bug', 'erro', 'exception',
            'loop', 'condicional', 'if', 'else', 'for', 'while', 'async', 'await', 'promise',
            'componente', 'módulo', 'package', 'npm', 'yarn', 'vite', 'webpack', 'babel',
            'typescript', 'interface', 'type', 'generics', 'decorator', 'annotation',
            'mvc', 'mvp', 'mvvm', 'arquitetura', 'design pattern', 'singleton', 'factory',
            'integração', 'integra', 'sistema', 'aplicação', 'app', 'software', 'hardware',
            'servidor', 'cliente', 'request', 'response', 'http', 'https', 'tcp', 'udp',
            'autenticação', 'autorização', 'token', 'jwt', 'oauth', 'session', 'cookie',
            'segurança', 'criptografia', 'hash', 'encrypt', 'decrypt', 'ssl', 'tls'
        ];

        const mensagemLower = mensagem.toLowerCase();
        
        // Verificar perguntas sobre criação/autores
        const perguntasCriacao = [
            'quem criou', 'quem desenvolveu', 'quem fez', 'quem programou',
            'autores', 'criadores', 'desenvolvedores', 'equipe', 'grupo',
            'pim', 'la10', 'william', 'mariane', 'eduarda', 'maysa', 'taynara'
        ];
        
        if (perguntasCriacao.some(p => mensagemLower.includes(p))) {
            return 'criacao';
        }
        
        // Verificar se é sobre programação
        const temPalavraProgramacao = palavrasProgramacao.some(palavra => 
            mensagemLower.includes(palavra)
        );
        
        return temPalavraProgramacao ? 'programacao' : 'fora_nicho';
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
                <div class="chat-message ${isUser ? 'message-user' : 'message-ai'}" data-message-id="${msg.id}">
                    <div class="chat-message__avatar">${avatar}</div>
                    <div class="chat-message__content">
                        <div class="chat-message__header">
                            <div class="chat-message__author">${author}</div>
                            <button class="chat-message__delete" onclick="deleteMessage('${msg.id}')" title="Apagar mensagem">🗑️</button>
                        </div>
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

    // Função global para apagar mensagem
    window.deleteMessage = function(messageId) {
        if (confirm('Tem certeza que deseja apagar esta mensagem?')) {
            messages = messages.filter(msg => msg.id !== messageId);
            renderMessages();
            saveCurrentChat();
        }
    };

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

