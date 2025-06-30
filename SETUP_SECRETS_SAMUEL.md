# Configuração de Secrets para Samuel Pregnolatto

## 📋 Lista de Secrets Necessárias

### 1. Docker Hub Secrets
- **DOCKER_USERNAME**: Seu usuário do Docker Hub
- **DOCKER_PASSWORD**: Sua senha/token do Docker Hub

### 2. Render Secrets
- **RENDER_API_KEY**: Chave da API do Render
- **RENDER_SERVICE_ID**: ID do serviço criado no Render

### 3. Database Secrets
- **DB_HOST**: Host do banco de dados
- **DB_PORT**: Porta do banco de dados (geralmente 5432 para PostgreSQL)
- **DB_USER**: Usuário do banco de dados
- **DB_PASSWORD**: Senha do banco de dados
- **DB_NAME**: Nome do banco de dados

### 4. BetterStack Secrets
- **BETTERSTACK_SOURCE_TOKEN**: Token do BetterStack para logs

### 5. Email Secrets (para notificações)
- **EMAIL_USERNAME**: Seu email Gmail
- **EMAIL_PASSWORD**: Senha de app do Gmail
- **NOTIFICATION_EMAIL**: Email para receber notificações de erro

## 🔧 Como Configurar as Secrets

### Passo 1: Acessar as Secrets do Repositório
1. Vá para seu repositório: https://github.com/SamuelPorcer/cicd
2. Clique em **Settings** (aba superior)
3. No menu lateral esquerdo, clique em **Secrets and variables** → **Actions**
4. Clique em **New repository secret**

### Passo 2: Configurar Docker Hub

#### DOCKER_USERNAME
- **Name**: `DOCKER_USERNAME`
- **Value**: Seu usuário do Docker Hub (ex: `samuelpregnolatto`)

#### DOCKER_PASSWORD
- **Name**: `DOCKER_PASSWORD`
- **Value**: Sua senha ou token de acesso do Docker Hub

**Como criar token do Docker Hub:**
1. Acesse https://hub.docker.com/settings/security
2. Clique em **New Access Token**
3. Dê um nome (ex: "GitHub Actions")
4. Copie o token gerado

### Passo 3: Configurar Render

#### RENDER_API_KEY
- **Name**: `RENDER_API_KEY`
- **Value**: Chave da API do Render

**Como obter:**
1. Acesse https://dashboard.render.com/account/api-keys
2. Clique em **New API Key**
3. Dê um nome (ex: "GitHub Actions")
4. Copie a chave gerada

#### RENDER_SERVICE_ID
- **Name**: `RENDER_SERVICE_ID`
- **Value**: ID do serviço criado no Render

**Como obter:**
1. Crie um serviço no Render
2. Na URL do serviço, copie o ID (ex: `https://dashboard.render.com/web/srv-abc123def456` → `srv-abc123def456`)

### Passo 4: Configurar Database

#### DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
Configure com os dados do seu banco de dados PostgreSQL online.

**Opções de banco:**
- **Neon**: https://neon.tech
- **Supabase**: https://supabase.com
- **Railway**: https://railway.app

### Passo 5: Configurar BetterStack

#### BETTERSTACK_SOURCE_TOKEN
- **Name**: `BETTERSTACK_SOURCE_TOKEN`
- **Value**: Token do BetterStack

**Como obter:**
1. Acesse https://app.betterstack.com
2. Vá em **Sources** → **Add Source**
3. Escolha **Node.js**
4. Copie o token gerado

### Passo 6: Configurar Email

#### EMAIL_USERNAME
- **Name**: `EMAIL_USERNAME`
- **Value**: Seu email Gmail (ex: `samuelpregnolatto@gmail.com`)

#### EMAIL_PASSWORD
- **Name**: `EMAIL_PASSWORD`
- **Value**: Senha de app do Gmail

**Como criar senha de app:**
1. Acesse https://myaccount.google.com/security
2. Ative **Verificação em duas etapas**
3. Vá em **Senhas de app**
4. Gere uma senha para "GitHub Actions"

#### NOTIFICATION_EMAIL
- **Name**: `NOTIFICATION_EMAIL`
- **Value**: Email para receber notificações (pode ser o mesmo: `samuelpregnolatto@gmail.com`)

## 🐳 Configuração do Docker Hub

### Criar Repositórios no Docker Hub
1. Acesse https://hub.docker.com
2. Crie dois repositórios:
   - `samuelpregnolatto/cicd` (para a aplicação)
   - `samuelpregnolatto/dockerpostgres` (para o PostgreSQL)

## 🚀 Configuração do Render

### Criar Serviço no Render
1. Acesse https://dashboard.render.com
2. Clique em **New** → **Web Service**
3. Conecte com seu repositório GitHub
4. Configure:
   - **Name**: `cicd-api`
   - **Environment**: `Docker`
   - **Region**: Escolha a mais próxima
   - **Branch**: `main`
   - **Root Directory**: Deixe vazio
   - **Docker Command**: Deixe vazio (usará Dockerfile)

## 📊 Configuração do BetterStack

### Criar Source no BetterStack
1. Acesse https://app.betterstack.com
2. Vá em **Sources** → **Add Source**
3. Escolha **Node.js**
4. Dê um nome (ex: "CICD API")
5. Copie o token gerado

## ✅ Checklist Final

- [ ] Todas as secrets configuradas no GitHub
- [ ] Repositórios criados no Docker Hub
- [ ] Serviço criado no Render
- [ ] Source criado no BetterStack
- [ ] Banco de dados configurado
- [ ] Pipeline testado com sucesso

## 🔍 Como Testar

1. Faça um push para a branch `main`
2. Verifique se o pipeline executou com sucesso em **Actions**
3. Confirme se as imagens foram enviadas para o Docker Hub
4. Verifique se o deploy foi realizado no Render
5. Teste a API no endpoint público do Render
6. Verifique os logs no BetterStack 