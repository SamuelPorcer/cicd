# API de Gerenciamento de Tarefas

API REST completa para gerenciamento de tarefas com pipeline CI/CD automatizado.

## 🚀 Funcionalidades

- ✅ CRUD completo de tarefas
- ✅ Documentação Swagger
- ✅ Logging com BetterStack
- ✅ Banco de dados MySQL
- ✅ Docker e Docker Compose
- ✅ Pipeline CI/CD com GitHub Actions
- ✅ Deploy automático no Render
- ✅ Versionamento automático
- ✅ Notificações de erro por email

## 📋 Pré-requisitos

- Node.js 18+
- Docker e Docker Compose
- MySQL (para desenvolvimento local)
- Conta no GitHub
- Conta no Docker Hub
- Conta no Render
- Conta no BetterStack

## 🛠️ Configuração Local

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/tarefas-api.git
cd tarefas-api
```

### 2. Configure as variáveis de ambiente

```bash
cd backend
cp env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Configurações do Servidor
PORT=3000
NODE_ENV=development

# Configurações do Banco de Dados
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=tarefas_db

# Configurações do BetterStack
BETTERSTACK_SOURCE_TOKEN=seu_token_aqui
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

### 5. Execute localmente (Alternativo)

```bash
# Terminal 1 - Banco de dados
docker run --name mysql-tarefas -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=tarefas_db -p 3306:3306 -d mysql:8.0

# Terminal 2 - Backend
cd backend
npm start
```

## 📚 Documentação da API

A documentação Swagger está disponível em:
- **Local**: http://localhost:3000/api-docs
- **Produção**: https://sua-api-render.onrender.com/api-docs

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
# Listar tarefas
curl http://localhost:3000/tarefas

# Criar tarefa
curl -X POST http://localhost:3000/tarefas \
  -H "Content-Type: application/json" \
  -d '{"descricao": "Nova tarefa", "status": "pendente"}'

# Atualizar tarefa
curl -X PUT http://localhost:3000/tarefas/1 \
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

3. **Build da Imagem Docker**
   - Login no Docker Hub
   - Build da imagem
   - Push para o registry
   - Criação da tag latest

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
DB_PORT=3306
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
- **Banco de Dados**: MySQL 8.0

### Comandos Docker

```bash
# Build da imagem
docker build -t tarefas-api ./backend

# Executar container
docker run -p 3000:3000 tarefas-api

# Executar com Docker Compose
docker-compose up --build

# Parar containers
docker-compose down

# Ver logs
docker-compose logs -f backend
```

## 📊 Monitoramento

### BetterStack Logs

O projeto está integrado com BetterStack para logging centralizado:

1. Crie uma conta no BetterStack
2. Crie um novo stream para logs
3. Configure o token no arquivo `.env` ou nas secrets do GitHub
4. Os logs serão enviados automaticamente

### Health Check

```bash
curl http://localhost:3000/health
```

Resposta esperada:
```json
{
  "status": "OK",
  "uptime": 123.456,
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## 🧪 Testes

```bash
cd backend
npm test
```

## 📝 Padrões de Commit

Utilizamos o padrão Conventional Commits:

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação de código
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Tarefas de manutenção

Exemplo:
```bash
git commit -m "feat: adiciona endpoint para buscar tarefa por ID"
```

## 🔧 Desenvolvimento

### Estrutura do Projeto

```
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   ├── logger.js
│   │   └── swagger.js
│   ├── routes/
│   │   └── tarefas.js
│   ├── server.js
│   ├── Dockerfile
│   └── package.json
├── .github/
│   └── workflows/
│       └── ci-cd.yml
├── docker-compose.yml
└── README.md
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Executa em modo desenvolvimento
npm run start        # Executa em produção

# Docker
docker-compose up    # Inicia todos os serviços
docker-compose down  # Para todos os serviços
```

## 🚀 Deploy

### Render

1. Conecte seu repositório GitHub ao Render
2. Configure as variáveis de ambiente
3. O deploy será automático a cada push na branch main

### Variáveis de Ambiente no Render

- `NODE_ENV`: production
- `PORT`: 3000
- `DB_HOST`: Host do banco de dados
- `DB_PORT`: 3306
- `DB_USER`: Usuário do banco
- `DB_PASSWORD`: Senha do banco
- `DB_NAME`: Nome do banco
- `BETTERSTACK_SOURCE_TOKEN`: Token do BetterStack

## 📞 Suporte

Para dúvidas ou problemas:

1. Abra uma issue no GitHub
2. Consulte a documentação Swagger
3. Verifique os logs no BetterStack

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Contribuidores

- [Seu Nome](https://github.com/seu-usuario)
- [festmedeiros](https://github.com/festmedeiros)

---

**Desenvolvido com ❤️ para o projeto de CI/CD** 