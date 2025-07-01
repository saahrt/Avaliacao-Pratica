# API RESTful de Gerenciamento de Tarefas

Este projeto é uma API desenvolvida em Node.js com Express para gerenciar tarefas, permitindo criar, listar, atualizar e deletar tarefas (CRUD). Também inclui validação de dados, tratamento de erros, filtros e ordenação conforme solicitado na prova prática.

---

## ⚙️ Tecnologias Utilizadas

- Node.js
- Express
- body-parser
- Nodemon (para desenvolvimento)

---

## 🚀 Como Rodar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Iniciar o servidor

```bash
npm start
```

O servidor estará rodando em `http://localhost:3000`

---

## 📋 Endpoints da API

| Método | Rota                          | Descrição                                         | Requisição JSON (quando aplicável)                             |
|--------|-------------------------------|-------------------------------------------------|--------------------------------------------------------------|
| POST   | `/tarefas`                    | Criar uma nova tarefa                            | `{ "titulo": "string", "descricao": "string (min 10 chars)", "status": true/false }` |
| GET    | `/tarefas`                    | Listar todas as tarefas                          | N/A                                                          |
| GET    | `/tarefas/:id`                | Obter uma tarefa pelo ID                         | N/A                                                          |
| PUT    | `/tarefas/:id`                | Atualizar uma tarefa                             | `{ "titulo": "string", "descricao": "string (min 10 chars)", "status": true/false }` |
| DELETE | `/tarefas/:id`                | Deletar uma tarefa                              | N/A                                                          |
| GET    | `/tarefas?status=true|false` | Filtrar tarefas por status (concluída ou pendente) | N/A                                                          |
| GET    | `/tarefas?ordenarPor=status|data` | Ordenar tarefas por status ou data de criação    | N/A                                                          |
| GET    | `/tarefas?status=&ordenarPor=` | Combinar filtro e ordenação                     | N/A                                                          |

---

## 💡 Validações e Tratamento de Erros

- `titulo` e `descricao` devem ser strings não vazias.
- `descricao` deve ter no mínimo 10 caracteres.
- `status` deve ser um booleano (`true` ou `false`).
- Se a tarefa não for encontrada, retorna erro 404 com mensagem clara.
- Se dados inválidos forem enviados, retorna erro 400 com mensagem explicativa.

---

## 🧪 Testes e Uso com Insomnia

### Como importar a collection de testes:

1. No Insomnia, clique em **Import / Export**.
2. Escolha **Import Data > From File**.
3. Selecione o arquivo `insomnia/insomnia-collection-api-prova.json` deste repositório.
4. Após importar, as requisições estarão disponíveis para teste rápido.

---

## 📁 Estrutura do Projeto

```
.
├── src
│   ├── app.js                  # Ponto de entrada da aplicação
│   ├── controllers
│   │   └── tarefasController.js  # Lógica das operações CRUD
│   └── routes
│       └── tarefasRoutes.js       # Definição das rotas
├── package.json               # Configurações do projeto e scripts
├── README.md                  # Este arquivo
└── insomnia
    └── insomnia-collection-api-prova.json # Collection para testes no Insomnia
```

---

## 📌 Como funciona a API (resumo)

- As tarefas são armazenadas em memória (um array).
- Cada tarefa possui `id`, `titulo`, `descricao`, `status` e `createdAt`.
- O sistema permite criar, listar, buscar, atualizar e deletar tarefas via rotas RESTful.
- Filtros por status e ordenação por data ou status são suportados via query params.
- As respostas são em JSON e retornam códigos HTTP apropriados (200, 201, 400, 404).

---

## 👩‍💻 Autor

Raynna — Prova prática de API REST — FAETERJ 2025

---