const express = require('express');
const bodyParser = require('body-parser');
const tarefasRoutes = require('./routes/tarefasRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/tarefas', tarefasRoutes);

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
