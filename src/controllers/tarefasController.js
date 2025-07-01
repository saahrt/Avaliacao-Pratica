let tarefas = [];
let idAtual = 1;

function validarTarefa(tarefa) {
  if (!tarefa) return { valido: false, erro: 'Corpo da requisição vazio.' };

  const { titulo, descricao, status } = tarefa;

  if (typeof titulo !== 'string' || titulo.trim() === '') {
    return { valido: false, erro: 'Título é obrigatório e deve ser uma string.' };
  }
  if (typeof descricao !== 'string' || descricao.trim().length < 10) {
    return { valido: false, erro: 'Descrição deve ter pelo menos 10 caracteres.' };
  }
  if (typeof status !== 'boolean') {
    return { valido: false, erro: 'Status deve ser booleano (true ou false).' };
  }

  return { valido: true };
}

exports.criarTarefa = (req, res) => {
  const tarefa = req.body;
  const { valido, erro } = validarTarefa(tarefa);
  if (!valido) {
    return res.status(400).json({ erro });
  }

  // Adiciona data de criação para ord futura
  const novaTarefa = { id: idAtual++, createdAt: new Date(), ...tarefa };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
};

exports.listarTarefas = (req, res) => {
  const { status, ordenarPor } = req.query;
  let resultado = [...tarefas]; // cópia p n alterar original

  // Filtro por status (pendente/concluída)
  if (status !== undefined) {
    if (status !== 'true' && status !== 'false') {
      return res.status(400).json({ erro: 'O parâmetro "status" deve ser true ou false.' });
    }
    const filtro = status === 'true';
    resultado = resultado.filter(tarefa => tarefa.status === filtro);
  }

  // Ordenação
  if (ordenarPor) {
    if (ordenarPor === 'data') {
      resultado.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (ordenarPor === 'status') {
      resultado.sort((a, b) => a.status - b.status); // false (pendente) vem antes de true (concluído)
    } else {
      return res.status(400).json({
        erro: 'Parâmetro "ordenarPor" inválido. Use "data" ou "status".'
      });
    }
  }

  res.json(resultado);
};

exports.obterTarefaPorId = (req, res) => {
  const id = parseInt(req.params.id);
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });
  res.json(tarefa);
};

exports.atualizarTarefa = (req, res) => {
  const id = parseInt(req.params.id);
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });

  const atualizada = req.body;
  const { valido, erro } = validarTarefa(atualizada);
  if (!valido) {
    return res.status(400).json({ erro });
  }

  tarefa.titulo = atualizada.titulo;
  tarefa.descricao = atualizada.descricao;
  tarefa.status = atualizada.status;

  res.json(tarefa);
};

exports.deletarTarefa = (req, res) => {
  const id = parseInt(req.params.id);
  const index = tarefas.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ erro: 'Tarefa não encontrada' });

  tarefas.splice(index, 1);
  res.json({ mensagem: 'Tarefa deletada com sucesso' });
};
