module.exports = (app) => {
    app.use('/register', require('./register'));
    app.use('/auth', require('./auth'));
};