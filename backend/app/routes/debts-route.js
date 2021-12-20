const express = require('express');
const DebtsRouter = express.Router();
const DebtsController = require('../controllers/debts-controller');

// Rota responsável por recuperar uma dívida
DebtsRouter.get('/:id/', DebtsController().retrieve);

// Rota responsável por listar todas dívidas
DebtsRouter.get('/', DebtsController().list);

// Rota responsável pelo cadastro de dívidas
DebtsRouter.post('/', DebtsController().create);

// Rota responsável pela atualização dos dados da dívida
DebtsRouter.put('/:id/', DebtsController().update);

// Rota responsável por remover dívidas
DebtsRouter.delete('/:id/', DebtsController().remove);

module.exports = DebtsRouter;