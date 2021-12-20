const bodyParser = require('body-parser');
const cors = require('cors')
const debtsRoute = require('./debts-route');
const usersRoute = require('./users-route');
const auth = require('./auth');
const user = require('./user');
const authenticate = require('../middlewares/authenticate');

module.exports = function (app) {
    // parser do body para json
    app.use(bodyParser.json());
    app.use(cors());
    
    // Set globalmente content type accept
    app.use(function (req, res, next) {
        res.header("Content-Type",'application/json');
        res.header("Accept",'*/*');
        next();
    });

    // Rota para checkar se o server está de pé
    app.get('/api/health', function(req, res) {
        res.send('The server is Ok!');
    });

    // Rotas responsáveis pelo CRUD de dívidas
    app.use('/api/debts', debtsRoute);
    app.use('/api/users', usersRoute);
    app.use('/api/v1/auth', auth);
    app.use('/api/v1/admin', authenticate, user);
    return app;
}