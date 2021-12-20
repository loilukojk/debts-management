const Debts = require('../db/schemes/debts-scheme');

function DebtsService () {
    const create = async function (data) {
        return Debts.create(data);
    }

    const update = async function (id, data) {
        return Debts.findByIdAndUpdate(id, data);
    }

    const list = async function () {
        return Debts.find();
    }

    const retrieve = async function (id) {
        return Debts.findById(id);
    }
    
    const remove = async function (id) {
        return Debts.findByIdAndRemove(id);
    }

    return {
        create,
        update,
        list,
        retrieve,
        remove
    }
}

module.exports = DebtsService;