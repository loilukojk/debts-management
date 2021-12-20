const { ErrorHandler } = require('../helpers/error');
const DebtsService = require('../services/debts-service');

function DebtsController () {
    const retrieve = async function (req, res, next) {
        try {
            const debts = await DebtsService().retrieve(req.params.id);
            res.send(debts);
        } catch (err) {
            next(new ErrorHandler(err, "#DBTS0001", 500, "Recuperar Dívida.", "falha na tentativa de recuperar uma dívida."));
        }
    }

    const list = async function (req, res, next) {
        try {
            const debtsList = await DebtsService().list();
            res.send(debtsList);
        } catch (err) {
            next(new ErrorHandler(err, "#DBTS0002", 500, "Listar Dívida.", "falha na tentativa de listar as dívidas."));
        }
    }

    const create = async function (req, res, next) {
        try {
            const createdDebts = await DebtsService().create(req.body);
            res.send(createdDebts);
        } catch (err) {
            next(new ErrorHandler(err, "#DBTS0003", 500, "Cadastrar Dívida.", "falha na tentativa de cadastrar uma nova dívida."));
        }
    }

    const update = async function (req, res, next) {
        try {
            const updatedDebts = await DebtsService().update(req.params.id, req.body);
            res.send(updatedDebts);
        } catch (err) {
            next(new ErrorHandler(err, "#DBTS0004", 500, "Atualizar Dívida.", "falha na tentativa de atualizar dívida."));
        }
    }
    
    const remove = async function (req, res, next) {
        try {
            const removedDebts = await DebtsService().remove(req.params.id);;
            res.send(removedDebts);
        } catch (err) {
            next(new ErrorHandler(err, "#DBTS0005", 500, "Deletar Dívida.", "falha na tentativa de deletar dívida."));
        }
    }

    return {
        create,
        update,
        list,
        retrieve,
        remove
    }
}

module.exports = DebtsController;