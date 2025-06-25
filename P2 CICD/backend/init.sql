-- Script de inicialização do banco de dados
-- Este script é executado automaticamente quando o container MySQL é criado

-- Criar banco de dados se não existir
CREATE DATABASE IF NOT EXISTS tarefas_db;
USE tarefas_db;

-- Criar tabela de tarefas
CREATE TABLE IF NOT EXISTS tarefas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  descricao VARCHAR(255) NOT NULL,
  status ENUM('pendente', 'em_andamento', 'completa') DEFAULT 'pendente',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Inserir dados de exemplo
INSERT INTO tarefas (descricao, status) VALUES 
  ('Estudar React Native', 'pendente'),
  ('Fazer exercícios', 'completa'),
  ('Ler documentação da API', 'em_andamento')
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP; 