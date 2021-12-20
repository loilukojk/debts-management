const passport = require("passport");
const User = require('../models/user');

module.exports = async (req, res, next) => {
    const authorizationToken = req.headers.authorization;
    if (!authorizationToken) {
        return res.status(401).json({message: "Unauthorized Access - No Token Provided!"});
    }

    const tokenSplit = authorizationToken.split(' ');
    if (tokenSplit.length == 2 && tokenSplit[0] == 'Bearer') {
        const token = tokenSplit[1];

        const exist = await global.db.Get('TOKEN@' + token);
        if (!exist) {
            return res.status(401).json({message: "Unauthorized Access - No Token Provided!"});
        }
    } else {
        return res.status(401).json({message: "Unauthorized Access - No Token Provided!"});
    }
    passport.authenticate('jwt', async function(err, user, info) {
        if (err) return next(err);

        if (!user) return res.status(401).json({message: "Unauthorized Access - No Token Provided!"});

        const userDB = await User.findById(user._id);
        if (!userDB) return res.status(401).json({message: "Unauthorized Access - No Token Provided!"});

        req.user = user;

        next();

    })(req, res, next);
};