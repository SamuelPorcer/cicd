# API de Gerenciamento de Tarefas

API REST completa para gerenciamento de tarefas com pipeline CI/CD automatizado.

**Desenvolvido por:** Samuel Pregnolatto  
**Repositório:** https://github.com/SamuelPorcer/cicd

## 🚀 Funcionalidades

- ✅ CRUD completo de tarefas
- ✅ Documentação Swagger
- ✅ Logging com BetterStack
- ✅ Banco de dados PostgreSQL
- ✅ Docker e Docker Compose
- ✅ Pipeline CI/CD com GitHub Actions
- ✅ Deploy automático no Render
- ✅ Versionamento automático
- ✅ Notificações de erro por email
- ✅ Imagem Docker personalizada do PostgreSQL

## 📋 Pré-requisitos

- Node.js 18+
- Docker e Docker Compose
- PostgreSQL (para desenvolvimento local)
- Conta no GitHub
- Conta no Docker Hub
- Conta no Render
- Conta no BetterStack

## 🛠️ Configuração Local

### 1. Clone o repositório

```bash
git clone https://github.com/SamuelPorcer/cicd.git
cd cicd
```

### 2. Configure as variáveis de ambiente

```bash
cd backend
cp env.example .env
```

Edite o arquivo `.env` com suas configurações:

#### Para Desenvolvimento Local:
```env
# Configurações do Servidor
PORT=3000
NODE_ENV=development

# Configurações do Banco de Dados PostgreSQL (Local)
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=tarefas_db
DB_SSL=false

# Configurações do BetterStack
BETTERSTACK_SOURCE_TOKEN=seu_token_aqui
```

#### Para Produção (Render):
```env
# Configurações do Servidor
PORT=3000
NODE_ENV=production
RENDER=true

# Configurações do Banco de Dados PostgreSQL (Render)
DB_HOST=dpg-d1gsp1ngi27c73c345og-a.oregon-postgres.render.com
DB_PORT=5432
DB_USER=tarefas_db_6kjg_user
DB_PASSWORD=vElqqRldCgAuj0ZbXP76I6mTZQ5uOpSo
DB_NAME=tarefas_db_6kjg
DB_SSL=true

# Configurações do BetterStack
BETTERSTACK_SOURCE_TOKEN=WP1Eq5fRkv7m44iNWPMUngLJ
```

### 3. Instale as dependências

```bash
cd backend
npm install
```

### 4. Execute com Docker Compose (Recomendado)

```bash
# Na raiz do projeto
docker-compose up --build
```

**Nota:** O Docker Compose está configurado para usar as mesmas credenciais do banco PostgreSQL do Render, mas rodando localmente.

### 5. Execute localmente (Alternativo)

#### Opção A: Usando a imagem PostgreSQL personalizada

```bash
# Terminal 1 - Banco de dados PostgreSQL
docker run --name postgres-tarefas \
  -e POSTGRES_DB=tarefas_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -d samuelpregnolatto/dockerpostgres:latest

# Terminal 2 - Backend
cd backend
npm start
```

#### Opção B: PostgreSQL local

```bash
# Terminal 1 - Banco de dados
docker run --name postgres-tarefas -e POSTGRES_PASSWORD=password -e POSTGRES_DB=tarefas_db -p 5432:5432 -d postgres:15

# Terminal 2 - Backend
cd backend
npm start
```

### 6. Teste a imagem PostgreSQL localmente

```bash
# No Windows (PowerShell)
cd backend
.\test-postgres-image.ps1

# No Linux/Mac
cd backend
./test-postgres-image.sh
```

## 🐘 Imagem Docker PostgreSQL

O projeto inclui uma imagem Docker personalizada do PostgreSQL 15 com:

- **Configuração pré-definida** para o projeto
- **Tabela `tarefas`** criada automaticamente
- **Dados de exemplo** inseridos
- **Health check** configurado
- **Scripts de inicialização** personalizados

### Imagens Disponíveis no Docker Hub

- `samuelpregnolatto/dockerpostgres:latest`
- `samuelpregnolatto/dockerpostgres:postgres15`
- `samuelpregnolatto/dockerpostgres:{commit-sha}`

### Como Usar a Imagem

```bash
# Executar com configurações padrão
docker run -d \
  --name postgres-tarefas \
  -p 5432:5432 \
  -e POSTGRES_DB=tarefas_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  samuelpregnolatto/dockerpostgres:latest

# Executar com Docker Compose
version: '3.8'
services:
  postgres:
    image: samuelpregnolatto/dockerpostgres:latest
    environment:
      POSTGRES_DB: tarefas_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
```

Para mais detalhes, consulte o arquivo `backend/README-POSTGRES.md`.

## 📚 Documentação da API

A documentação Swagger está disponível em:
- **Local**: http://localhost:3000/api-docs
- **Produção**: https://cicd-api.onrender.com/api-docs

### Endpoints Principais

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/tarefas` | Lista todas as tarefas |
| GET | `/tarefas/:id` | Busca uma tarefa específica |
| POST | `/tarefas` | Cria uma nova tarefa |
| PUT | `/tarefas/:id` | Atualiza uma tarefa |
| DELETE | `/tarefas/:id` | Remove uma tarefa |
| GET | `/health` | Verificação de saúde da API |

### Exemplo de uso

```bash
# Listar tarefas (Local)
curl http://localhost:3000/tarefas

# Listar tarefas (Produção)
curl https://cicd-api.onrender.com/tarefas

# Criar tarefa (Local)
curl -X POST http://localhost:3000/tarefas \
  -H "Content-Type: application/json" \
  -d '{"descricao": "Nova tarefa", "status": "pendente"}'

# Criar tarefa (Produção)
curl -X POST https://cicd-api.onrender.com/tarefas \
  -H "Content-Type: application/json" \
  -d '{"descricao": "Nova tarefa", "status": "pendente"}'

# Atualizar tarefa (Local)
curl -X PUT http://localhost:3000/tarefas/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "completa"}'

# Atualizar tarefa (Produção)
curl -X PUT https://cicd-api.onrender.com/tarefas/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "completa"}'
```

## 🔄 Pipeline CI/CD

O projeto utiliza GitHub Actions para automatizar o processo de CI/CD:

### Etapas do Pipeline

1. **CI (Continuous Integration)**
   - Checkout do código
   - Instalação de dependências
   - Execução de testes
   - Build da aplicação
   - Linting do código

2. **Versionamento**
   - Geração automática de versão
   - Atualização do package.json
   - Commit das mudanças

3. **Build das Imagens Docker**
   - **Aplicação**: Build e push da imagem da API
   - **PostgreSQL**: Build e push da imagem do banco de dados
   - Login no Docker Hub
   - Push para o registry
   - Criação das tags

4. **Deploy no Render**
   - Atualização de variáveis de ambiente
   - Deploy da nova imagem
   - Verificação do status

5. **Notificações**
   - Email em caso de erro

### Secrets Necessários

Configure os seguintes secrets no GitHub:

```bash
# Docker Hub
DOCKER_USERNAME=seu_usuario_docker
DOCKER_PASSWORD=sua_senha_docker

# Render
RENDER_API_KEY=sua_api_key_render
RENDER_SERVICE_ID=id_do_servico_render

# Banco de Dados
DB_HOST=host_do_banco
DB_PORT=5432
DB_USER=usuario_do_banco
DB_PASSWORD=senha_do_banco
DB_NAME=nome_do_banco

# BetterStack
BETTERSTACK_SOURCE_TOKEN=seu_token_betterstack

# Email (para notificações)
EMAIL_USERNAME=seu_email@gmail.com
EMAIL_PASSWORD=sua_senha_app_gmail
NOTIFICATION_EMAIL=email_para_notificacoes@exemplo.com
```

## 🐳 Docker

### Imagens Disponíveis

- **Backend**: Node.js 18 Alpine
- **Banco de Dados**: PostgreSQL 15 (imagem personalizada)

### Comandos Docker

```bash
# Build da imagem da aplicação
docker build -t tarefas-api ./backend

# Build da imagem PostgreSQL
docker build -f backend/Dockerfile.postgres -t postgres-tarefas ./backend

# Executar container da aplicação
docker run -p 3000:3000 tarefas-api

# Executar container PostgreSQL
docker run -p 5432:5432 samuelpregnolatto/dockerpostgres:latest

# Executar com Docker Compose
docker-compose up --build

# Parar containers
docker-compose down
```

## 📁 Estrutura do Projeto

```
cicd/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   ├── logger.js
│   │   └── swagger.js
│   ├── routes/
│   │   └── tarefas.js
│   ├── Dockerfile
│   ├── Dockerfile.postgres
│   ├── init.sql
│   ├── server.js
│   ├── test-postgres-image.sh
│   ├── test-postgres-image.ps1
│   └── README-POSTGRES.md
├── screens/
├── services/
├── .github/
│   └── workflows/
│       └── ci-cd.yml
├── docker-compose.yml
└── README.md
```

## 🔧 Troubleshooting

### Problemas com o Banco de Dados

1. **Erro de conexão recusada**:
   ```bash
   # Verificar se o container está rodando
   docker ps
   
   # Verificar logs do PostgreSQL
   docker logs postgres-tarefas
   ```

2. **Erro de autenticação**:
   ```bash
   # Verificar credenciais
   docker exec -it postgres-tarefas psql -U postgres -d tarefas_db
   ```