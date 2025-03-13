const verifyJWT = require('../middleware/verifyJWT');

module.exports = (app) => {
    app.use('/register', require('./register'));
    app.use('/auth', require('./auth'));
    app.use('/refresh', require('./refresh'));
    app.use('/logout', require('./logout'));

    // every endpoint defined under will require the JWT validation
    app.use(verifyJWT);
    app.use('/users', require('./users'));
};