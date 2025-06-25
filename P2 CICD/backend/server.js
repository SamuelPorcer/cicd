const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Armazenamento em memória das tarefas
let tarefas = [
  {
    id: 1,
    descricao: "Estudar React Native",
    status: "pendente"
  },
  {
    id: 2,
    descricao: "Fazer exercícios",
    status: "completa"
  }
];

let nextId = 3;

// Endpoints da API

// GET /tarefas - Listar todas as tarefas
app.get('/tarefas', (req, res) => {
  res.json(tarefas);
});

// POST /tarefas - Adicionar nova tarefa
app.post('/tarefas', (req, res) => {
  const { descricao, status = 'pendente' } = req.body;
  
  if (!descricao || descricao.trim() === '') {
    return res.status(400).json({ error: 'Descrição é obrigatória' });
  }

  const novaTarefa = {
    id: nextId++,
    descricao: descricao.trim(),
    status: status
  };

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

// PUT /tarefas/:id - Atualizar tarefa existente
app.put('/tarefas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { descricao, status } = req.body;

  const tarefaIndex = tarefas.findIndex(tarefa => tarefa.id === id);
  
  if (tarefaIndex === -1) {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }

  if (descricao && descricao.trim() === '') {
    return res.status(400).json({ error: 'Descrição não pode estar vazia' });
  }

  tarefas[tarefaIndex] = {
    ...tarefas[tarefaIndex],
    descricao: descricao ? descricao.trim() : tarefas[tarefaIndex].descricao,
    status: status || tarefas[tarefaIndex].status
  };

  res.json(tarefas[tarefaIndex]);
});

// DELETE /tarefas/:id - Excluir tarefa
app.delete('/tarefas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  const tarefaIndex = tarefas.findIndex(tarefa => tarefa.id === id);
  
  if (tarefaIndex === -1) {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }

  const tarefaRemovida = tarefas.splice(tarefaIndex, 1)[0];
  res.json({ message: 'Tarefa removida com sucesso', tarefa: tarefaRemovida });
});

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API de Gerenciamento de Tarefas funcionando!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`API disponível em: http://localhost:${PORT}`);
}); 