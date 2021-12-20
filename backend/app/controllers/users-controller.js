const axios = require('axios');
const UserFactory = require('../factories/UserFactory');
const { ErrorHandler } = require('../helpers/error');

function UsersController () {
    const list = async function (req, res, next) {
        try {
            const { data } = await axios.get('https://jsonplaceholder.typicode.com/users/');
            res.send(data.map(user => UserFactory(user)));
        } catch (err) {
            next(new ErrorHandler(err, "#USER0001", 500, "Listar Usuários.", "falha na tentativa de listar usuários."));
        }
    }

    return {
        list
    }
}

module.exports = UsersController;