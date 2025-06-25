# 🐳 Configuração do Docker Hub

## Passos para configurar o Docker Hub para o pipeline CI/CD

### 1. Criar conta no Docker Hub

1. Acesse https://hub.docker.com
2. Clique em "Sign Up"
3. Preencha os dados necessários
4. Confirme seu email

### 2. Criar repositório

1. Faça login no Docker Hub
2. Clique em "Create Repository"
3. Configure:
   - **Repository Name**: Deve ser igual ao nome do repositório GitHub
   - **Visibility**: Public (recomendado) ou Private
   - **Description**: "API de Gerenciamento de Tarefas"
4. Clique em "Create"

### 3. Gerar Access Token

1. Vá em **Account Settings** > **Security**
2. Clique em **New Access Token**
3. Configure:
   - **Token name**: `github-actions`
   - **Access permissions**: Read & Write
4. Clique em **Generate**
5. **Copie o token** (você não conseguirá vê-lo novamente)

### 4. Configurar secrets no GitHub

Adicione os seguintes secrets no seu repositório GitHub:

```bash
DOCKER_USERNAME=seu_usuario_docker_hub
DOCKER_PASSWORD=seu_access_token_aqui
```

### 5. Verificar configuração

O pipeline irá automaticamente:

1. Fazer login no Docker Hub
2. Build da imagem Docker
3. Push da imagem para o repositório
4. Criar tags automáticas

### 6. Estrutura das tags

O pipeline criará as seguintes tags:

- `latest` - Sempre a versão mais recente
- `main` - Versão da branch main
- `v1.0.1234567890` - Versão específica (timestamp)
- `sha-abc123` - Commit específico

### 7. Verificar imagens

Após o primeiro deploy, você verá as imagens em:
```
https://hub.docker.com/r/seu_usuario/seu_repositorio
```

### 8. Comandos úteis

```bash
# Login manual no Docker Hub
docker login

# Pull da imagem
docker pull seu_usuario/seu_repositorio:latest

# Executar imagem localmente
docker run -p 3000:3000 seu_usuario/seu_repositorio:latest

# Ver tags disponíveis
docker images seu_usuario/seu_repositorio
```

### 9. Troubleshooting

#### Erro de autenticação:
- Verifique se o DOCKER_USERNAME está correto
- Use o Access Token como DOCKER_PASSWORD, não a senha normal
- Confirme se o token tem permissões de Read & Write

#### Erro de push:
- Verifique se o repositório existe no Docker Hub
- Confirme se o nome do repositório está correto
- Verifique se o repositório não está privado (se for, configure autenticação)

#### Imagem não aparece:
- Aguarde alguns minutos após o push
- Verifique os logs do GitHub Actions
- Confirme se o pipeline foi executado com sucesso

### 10. Monitoramento

- **Docker Hub**: Verifique as imagens em https://hub.docker.com
- **GitHub Actions**: Monitore o pipeline em https://github.com/seu_usuario/seu_repositorio/actions
- **Logs**: Verifique os logs do job "Build Docker Image"

---

**Importante**: O nome do repositório no Docker Hub deve ser exatamente igual ao nome do repositório no GitHub. 