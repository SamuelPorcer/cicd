const winston = require('winston');
require('dotenv').config();

// Configuração do BetterStack
const BetterStack = require('winston-betterstack');

// Criar logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'tarefas-api' },
  transports: [
    // Console transport
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    
    // BetterStack transport (apenas se o token estiver configurado)
    ...(process.env.BETTERSTACK_SOURCE_TOKEN ? [
      new BetterStack({
        sourceToken: process.env.BETTERSTACK_SOURCE_TOKEN,
        level: 'info'
      })
    ] : [])
  ]
});

// Middleware para logging de requisições
const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logData = {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.get('User-Agent'),
      ip: req.ip || req.connection.remoteAddress
    };
    
    if (res.statusCode >= 400) {
      logger.error('Request failed', logData);
    } else {
      logger.info('Request completed', logData);
    }
  });
  
  next();
};

// Função para logging de erros
const errorLogger = (error, req, res, next) => {
  logger.error('Application error', {
    error: error.message,
    stack: error.stack,
    method: req.method,
    url: req.url,
    body: req.body,
    params: req.params,
    query: req.query
  });
  
  next(error);
};

module.exports = { logger, requestLogger, errorLogger }; 