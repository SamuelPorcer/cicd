# 🚀 Guia Rápido - App de Tarefas

## ⚡ Início Rápido

### 1. Instalar Dependências
```bash
# Instalar tudo de uma vez
npm run install-all
```

### 2. Iniciar Backend
cd tarefas-app/backend
# Terminal 1
npm run backend
```

### 3. Iniciar Frontend
```bash
# Terminal 2
npm start
```

### 4. Testar API (Opcional)
```bash
# Terminal 3
node test-api.js
```

## 📱 Como Usar

1. **Ver Tarefas**: A tela inicial mostra todas as tarefas
2. **Adicionar**: Toque no botão "+" para criar nova tarefa
3. **Editar**: Toque no ícone de lápis para editar
4. **Excluir**: Toque no ícone de lixeira para excluir
5. **Alternar Status**: Toque na tarefa para marcar como completa/pendente
6. **Filtrar**: Use os botões "Todas", "Pendentes", "Completas"

## 🔧 Configuração para Dispositivo Físico

Se estiver testando no seu celular, edite o arquivo `config/api.js`:

```javascript
export const API_CONFIG = {
  BASE_URL: 'http://SEU_IP_AQUI:3000', // Ex: 192.168.1.100
  // ... resto da configuração
};
```

## 🐛 Problemas Comuns

### Erro de Conexão
- Verifique se o backend está rodando na porta 3000
- Confirme se a URL da API está correta

### Erro de Navegação
- Reinicie o Metro bundler: `expo start -c`

### Erro no Emulador
- Limpe o cache: `expo start -c`
- Reinicie o emulador

## 📞 Suporte

- Leia o `README.md` para documentação completa
- Leia o `RELATORIO_TECNICO.md` para detalhes técnicos
- Execute `node test-api.js` para testar a API

---

**🎉 Pronto! Seu app de tarefas está funcionando!** 