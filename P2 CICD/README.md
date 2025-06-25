# 📱 App de Gerenciamento de Tarefas

Uma aplicação React Native completa para gerenciamento de tarefas, conectada a uma API REST desenvolvida com Express.

## 🚀 Funcionalidades

- ✅ **Listar tarefas** - Visualize todas as suas tarefas
- ➕ **Adicionar tarefa** - Crie novas tarefas com descrição e status
- ✏️ **Editar tarefa** - Modifique descrição e status de tarefas existentes
- 🗑️ **Excluir tarefa** - Remova tarefas desnecessárias
- 🔄 **Alternar status** - Marque tarefas como pendentes ou completas
- 🔍 **Filtrar tarefas** - Visualize apenas tarefas pendentes ou completas
- 📱 **Interface moderna** - Design limpo e intuitivo

## 🛠️ Tecnologias Utilizadas

### Frontend (React Native)
- React Native com Expo
- React Navigation para navegação
- Axios para requisições HTTP
- Expo Vector Icons para ícones

### Backend (Node.js)
- Express.js
- CORS para permitir requisições cross-origin
- Armazenamento em memória (array)

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Expo CLI
- Emulador Android/iOS ou dispositivo físico

## 🔧 Instalação e Configuração

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd tarefas-app
```

### 2. Instale as dependências do frontend
```bash
npm install
```

### 3. Instale as dependências do backend
```bash
cd backend
npm install
cd ..
```

### 4. Configure a URL da API
Se necessário, ajuste a URL da API nos arquivos das telas:
- `screens/HomeScreen.js`
- `screens/NovaTarefaScreen.js`
- `screens/EditarTarefaScreen.js`

Por padrão, a API está configurada para rodar em `http://localhost:3000`.

## 🚀 Como Executar

### 1. Inicie o servidor backend
```bash
cd backend
npm start
```

O servidor estará disponível em `http://localhost:3000`

### 2. Inicie o aplicativo React Native
Em um novo terminal:
```bash
npm start
```

Isso abrirá o Expo DevTools. Você pode:
- Pressionar `a` para abrir no Android
- Pressionar `i` para abrir no iOS
- Escanear o QR code com o app Expo Go no seu dispositivo

## 📱 Estrutura do Projeto

```
tarefas-app/
├── backend/
│   ├── server.js          # Servidor Express
│   └── package.json       # Dependências do backend
├── screens/
│   ├── HomeScreen.js      # Tela principal com lista de tarefas
│   ├── NovaTarefaScreen.js # Tela para adicionar tarefas
│   └── EditarTarefaScreen.js # Tela para editar tarefas
├── App.js                 # Componente principal com navegação
└── package.json           # Dependências do frontend
```

## 🔌 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/tarefas` | Lista todas as tarefas |
| POST | `/tarefas` | Cria uma nova tarefa |
| PUT | `/tarefas/:id` | Atualiza uma tarefa existente |
| DELETE | `/tarefas/:id` | Remove uma tarefa |

### Estrutura de uma Tarefa
```json
{
  "id": 1,
  "descricao": "Estudar React Native",
  "status": "pendente"
}
```

## 🎨 Funcionalidades da Interface

### HomeScreen
- Lista todas as tarefas com design de cards
- Botões de filtro (Todas, Pendentes, Completas)
- Botão flutuante para adicionar nova tarefa
- Toque na tarefa para alternar status
- Botões de editar e excluir para cada tarefa

### NovaTarefaScreen
- Formulário para criar nova tarefa
- Campo de descrição com contador de caracteres
- Seleção de status (Pendente/Completa)
- Validação de campos obrigatórios

### EditarTarefaScreen
- Formulário pré-preenchido com dados da tarefa
- Mesmas funcionalidades da tela de nova tarefa
- Botão só fica ativo se houver mudanças
- Informações adicionais da tarefa

## 🔧 Configurações Avançadas

### Para desenvolvimento em dispositivo físico
Se estiver testando em um dispositivo físico, você precisará alterar a URL da API de `localhost` para o IP da sua máquina na rede local.

### Para produção
- Configure um banco de dados real (MongoDB, PostgreSQL, etc.)
- Implemente autenticação de usuários
- Configure variáveis de ambiente
- Implemente validações mais robustas

## 🐛 Solução de Problemas

### Erro de conexão com a API
- Verifique se o servidor backend está rodando
- Confirme se a URL da API está correta
- Verifique se não há firewall bloqueando a porta 3000

### Erro de navegação
- Certifique-se de que todas as dependências de navegação foram instaladas
- Reinicie o Metro bundler se necessário

### Erro no emulador
- Limpe o cache do Expo: `expo start -c`
- Reinicie o emulador
- Verifique se todas as dependências estão instaladas

## 📝 Relatório Técnico

### Estrutura da API
A API REST foi desenvolvida com Express.js e implementa todas as operações CRUD:
- **Create**: POST /tarefas - Cria novas tarefas
- **Read**: GET /tarefas - Lista todas as tarefas
- **Update**: PUT /tarefas/:id - Atualiza tarefas existentes
- **Delete**: DELETE /tarefas/:id - Remove tarefas

### Telas e Funcionalidades
1. **HomeScreen**: Tela principal com lista de tarefas, filtros e ações
2. **NovaTarefaScreen**: Formulário para criação de tarefas
3. **EditarTarefaScreen**: Formulário para edição de tarefas existentes

### Integração Frontend-Backend
O React Native utiliza Axios para fazer requisições HTTP para a API Express, implementando:
- Tratamento de erros
- Estados de loading
- Validações de formulário
- Feedback visual para o usuário

### Melhorias Implementadas
- ✅ Filtros para visualizar tarefas por status
- ✅ Validações nos formulários
- ✅ Interface moderna com ícones e cores
- ✅ Confirmações para ações destrutivas
- ✅ Estados de loading e feedback
- ✅ Design responsivo e acessível

## 📄 Licença

Este projeto foi desenvolvido como exercício educacional. Sinta-se livre para usar e modificar conforme necessário.

## 👨‍💻 Autor

Desenvolvido como parte de um exercício de desenvolvimento mobile com React Native e APIs REST. 