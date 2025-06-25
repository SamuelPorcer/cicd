const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000';

async function testarAPI() {
  console.log('🧪 Testando API de Tarefas...\n');

  try {
    // Teste 1: Verificar se o servidor está rodando
    console.log('1️⃣ Testando conexão com o servidor...');
    const response = await axios.get(`${API_BASE_URL}/`);
    console.log('✅ Servidor respondendo:', response.data.message);
    console.log('');

    // Teste 2: Listar tarefas iniciais
    console.log('2️⃣ Listando tarefas existentes...');
    const tarefas = await axios.get(`${API_BASE_URL}/tarefas`);
    console.log('✅ Tarefas encontradas:', tarefas.data.length);
    tarefas.data.forEach(tarefa => {
      console.log(`   - ID: ${tarefa.id}, Descrição: ${tarefa.descricao}, Status: ${tarefa.status}`);
    });
    console.log('');

    // Teste 3: Criar nova tarefa
    console.log('3️⃣ Criando nova tarefa...');
    const novaTarefa = await axios.post(`${API_BASE_URL}/tarefas`, {
      descricao: 'Tarefa de teste criada via script',
      status: 'pendente'
    });
    console.log('✅ Nova tarefa criada:', novaTarefa.data);
    console.log('');

    // Teste 4: Atualizar tarefa
    console.log('4️⃣ Atualizando tarefa...');
    const tarefaAtualizada = await axios.put(`${API_BASE_URL}/tarefas/${novaTarefa.data.id}`, {
      descricao: 'Tarefa de teste atualizada',
      status: 'completa'
    });
    console.log('✅ Tarefa atualizada:', tarefaAtualizada.data);
    console.log('');

    // Teste 5: Listar tarefas após mudanças
    console.log('5️⃣ Listando tarefas após mudanças...');
    const tarefasFinais = await axios.get(`${API_BASE_URL}/tarefas`);
    console.log('✅ Total de tarefas:', tarefasFinais.data.length);
    tarefasFinais.data.forEach(tarefa => {
      console.log(`   - ID: ${tarefa.id}, Descrição: ${tarefa.descricao}, Status: ${tarefa.status}`);
    });
    console.log('');

    // Teste 6: Excluir tarefa de teste
    console.log('6️⃣ Excluindo tarefa de teste...');
    await axios.delete(`${API_BASE_URL}/tarefas/${novaTarefa.data.id}`);
    console.log('✅ Tarefa excluída com sucesso');
    console.log('');

    console.log('🎉 Todos os testes passaram! A API está funcionando corretamente.');

  } catch (error) {
    console.error('❌ Erro durante os testes:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Dica: Certifique-se de que o servidor backend está rodando:');
      console.log('   cd backend && npm start');
    }
  }
}

// Executar testes
testarAPI(); 