const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Importações locais
const { initializeDatabase } = require('./config/database');
const { logger, requestLogger, errorLogger } = require('./config/logger');
const swaggerSpecs = require('./config/swagger');
const swaggerUi = require('swagger-ui-express');

// Rotas
const tarefasRoutes = require('./routes/tarefas');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares de segurança
app.use(helmet());

// Middlewares de logging
app.use(morgan('combined'));
app.use(requestLogger);

// Middlewares básicos
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Rota de teste da API
 *     tags: [Teste]
 *     responses:
 *       200:
 *         description: API funcionando corretamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 version:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
app.get('/', (req, res) => {
  res.json({ 
    message: 'API de Gerenciamento de Tarefas funcionando!',
    version: process.env.npm_package_version || '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Verificação de saúde da API
 *     tags: [Teste]
 *     responses:
 *       200:
 *         description: API saudável
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 uptime:
 *                   type: number
 *                 timestamp:
 *                   type: string
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Rotas da API
app.use('/tarefas', tarefasRoutes);

// Middleware de tratamento de erros
app.use(errorLogger);

// Tratamento de rotas não encontradas
app.use('*', (req, res) => {
  logger.warn('Rota não encontrada', { 
    method: req.method, 
    url: req.originalUrl,
    ip: req.ip 
  });
  res.status(404).json({ 
    error: 'Rota não encontrada',
    path: req.originalUrl,
    method: req.method
  });
});

// Tratamento de erros globais
app.use((error, req, res, next) => {
  logger.error('Erro não tratado', {
    error: error.message,
    stack: error.stack,
    method: req.method,
    url: req.url
  });
  
  res.status(500).json({ 
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Algo deu errado'
  });
});

// Inicialização do servidor
async function startServer() {
  try {
    // Inicializar banco de dados
    await initializeDatabase();
    
    // Iniciar servidor
    app.listen(PORT, () => {
      logger.info('Servidor iniciado com sucesso', {
        port: PORT,
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString()
      });
      
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📚 Documentação disponível em: http://localhost:${PORT}/api-docs`);
      console.log(`🔍 Health check em: http://localhost:${PORT}/health`);
      console.log(`📊 API disponível em: http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error('Erro ao inicializar servidor', { error: error.message });
    console.error('❌ Erro ao inicializar servidor:', error.message);
    process.exit(1);
  }
}

// Tratamento de sinais para graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM recebido, encerrando servidor graciosamente');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT recebido, encerrando servidor graciosamente');
  process.exit(0);
});

// Iniciar servidor
startServer(); 