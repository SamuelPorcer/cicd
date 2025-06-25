const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'tarefas_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// Função para inicializar o banco de dados
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    
    // Criar tabela de tarefas se não existir
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS tarefas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        descricao VARCHAR(255) NOT NULL,
        status ENUM('pendente', 'em_andamento', 'completa') DEFAULT 'pendente',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    
    await connection.execute(createTableQuery);
    
    // Inserir dados de exemplo se a tabela estiver vazia
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM tarefas');
    
    if (rows[0].count === 0) {
      const insertQuery = `
        INSERT INTO tarefas (descricao, status) VALUES 
        ('Estudar React Native', 'pendente'),
        ('Fazer exercícios', 'completa')
      `;
      await connection.execute(insertQuery);
      console.log('Dados de exemplo inseridos no banco de dados');
    }
    
    connection.release();
    console.log('Banco de dados inicializado com sucesso');
  } catch (error) {
    console.error('Erro ao inicializar banco de dados:', error);
    throw error;
  }
}

module.exports = { pool, initializeDatabase }; 