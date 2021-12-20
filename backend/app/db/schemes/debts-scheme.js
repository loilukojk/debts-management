const mongoose = require('../config');

const debtsSchema = new mongoose.Schema({
    // userID: {
    //     type: String,
    //     required: [true, 'precisamos saber de qual usuário é a dívida']
    // },
    userName: {
        type: String
    },
    cause: {
        type: String,
        required: [true, 'precisamos saber o motivo da dívida']
    },
    date: {
        type: String,
        required: [true, 'precisamos saber a data da dívida']
    },
    value: {
        type: String,
        required: [true, 'precisamos saber o valor da dívida']
    }
});

module.exports = mongoose.model('Debts', debtsSchema);