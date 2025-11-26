/**
 * Servidor Express para API do Gemini
 * Pode ser hospedado em Render, Railway, Heroku, etc.
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Validar nicho
function validarNichoProgramacao(mensagem) {
  const palavrasProgramacao = [
    'programação', 'programar', 'código', 'desenvolvimento', 'desenvolver',
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
  
  const perguntasCriacao = [
    'quem criou', 'quem desenvolveu', 'quem fez', 'quem programou',
    'autores', 'criadores', 'desenvolvedores', 'equipe', 'grupo',
    'pim', 'la10', 'william', 'mariane', 'eduarda', 'maysa', 'taynara'
  ];
  
  if (perguntasCriacao.some(p => mensagemLower.includes(p))) {
    return 'criacao';
  }
  
  const temPalavraProgramacao = palavrasProgramacao.some(palavra => 
    mensagemLower.includes(palavra)
  );
  
  return temPalavraProgramacao ? 'programacao' : 'fora_nicho';
}

// Rota principal
app.post('/api/gemini', async (req, res) => {
  try {
    const { mensagem } = req.body;

    if (!mensagem || typeof mensagem !== 'string' || mensagem.trim().length === 0) {
      return res.status(400).json({ error: 'Mensagem é obrigatória' });
    }

    // Validar nicho
    const validacao = validarNichoProgramacao(mensagem);
    
    if (validacao === 'fora_nicho') {
      return res.status(400).json({ 
        error: 'FORA_NICHO',
        message: 'Este assistente é especializado apenas em questões de programação e desenvolvimento de software.'
      });
    }
    
    if (validacao === 'criacao') {
      return res.status(200).json({
        resposta: `Este assistente foi desenvolvido utilizando a tecnologia **Google Gemini AI**, uma inteligência artificial avançada criada pela Google.

A configuração, treinamento e implementação deste chatbot foram realizadas pelo **Grupo PIM LA10**, composto pelos seguintes integrantes:

👥 **Equipe de Desenvolvimento:**
- William
- Mariane
- Eduarda
- Maysa
- Taynara

Este projeto faz parte do Portal Educa e utiliza a API gratuita do Gemini para fornecer suporte técnico especializado em programação e desenvolvimento de software.

**Créditos:**
- IA: Google Gemini
- Desenvolvimento: Grupo PIM LA10`
      });
    }

    // API Key (deve estar em variável de ambiente)
    // IMPORTANTE: Configure GEMINI_API_KEY nas variáveis de ambiente do seu serviço de hospedagem
    const API_KEY = process.env.GEMINI_API_KEY;
    
    if (!API_KEY) {
      return res.status(500).json({ 
        error: 'API Key não configurada',
        message: 'Configure a variável de ambiente GEMINI_API_KEY no servidor'
      });
    }

    // Configurar prompt
    const systemPrompt = `Você é um assistente especializado em programação e desenvolvimento de software. 
Sua função é ajudar desenvolvedores com:
- Linguagens de programação (JavaScript, Python, Java, etc.)
- Frameworks e bibliotecas
- Arquitetura de software
- APIs e integrações
- Ferramentas de desenvolvimento
- Boas práticas de programação
- Resolução de problemas técnicos
- Conceitos de engenharia de software

Responda de forma clara, objetiva e técnica. Use exemplos de código quando apropriado.
Se a pergunta não for sobre programação, informe educadamente que você só responde questões técnicas de desenvolvimento.`;

    // Usar apenas os modelos recomendados: gemini-2.5-flash e gemini-2.5-pro
    const modelos = [
      'gemini-2.5-flash',  // Otimizado para velocidade e custo
      'gemini-2.5-pro'      // Mais poderoso para problemas complexos
    ];
    
    let lastError = null;
    let lastResponse = null;
    
    for (const modelName of modelos) {
      try {
        console.log(`Tentando modelo: ${modelName}`);
        
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`,
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

        lastResponse = response;

        if (response.ok) {
          const data = await response.json();
          console.log(`Modelo ${modelName} funcionou!`);
          
          const resposta = data.candidates?.[0]?.content?.parts?.[0]?.text;
          
          if (resposta) {
            return res.status(200).json({ resposta });
          } else {
            console.warn(`Modelo ${modelName} retornou resposta vazia`);
            lastError = `Resposta vazia do modelo ${modelName}`;
            continue; // Tentar próximo modelo
          }
        } else {
          const errorData = await response.json().catch(() => ({}));
          const errorMsg = errorData.error?.message || `Erro ${response.status}`;
          console.error(`Modelo ${modelName} falhou:`, errorMsg);
          
          // Se for 404, continuar para o próximo modelo
          if (response.status === 404) {
            lastError = `Modelo ${modelName} não encontrado`;
            continue;
          }
          
          // Se for erro de autenticação ou quota, não tentar outros
          if (response.status === 401 || response.status === 403 || response.status === 429) {
            lastError = errorMsg;
            break;
          }
          
          lastError = errorMsg;
        }
      } catch (error) {
        console.error(`Erro ao tentar modelo ${modelName}:`, error.message);
        lastError = error.message;
        continue;
      }
    }

    // Se chegou aqui, todos os modelos falharam
    console.error('Todos os modelos falharam. Último erro:', lastError);
    console.error('Última resposta status:', lastResponse?.status);
    
    return res.status(500).json({ 
      error: 'Erro ao processar mensagem',
      message: lastError || 'Nenhum modelo disponível. Verifique a API key e os modelos disponíveis.'
    });

  } catch (error) {
    console.error('Erro no backend:', error);
    return res.status(500).json({ 
      error: 'Erro interno do servidor',
      message: error.message 
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📡 API disponível em http://localhost:${PORT}/api/gemini`);
});

