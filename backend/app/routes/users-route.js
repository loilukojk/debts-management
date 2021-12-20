const express = require('express');
const UsersRouter = express.Router();
const UsersController = require('../controllers/users-controller');

// Rota responsável por recuperar uma dívida
UsersRouter.get('/', UsersController().list);

module.exports = UsersRouter;