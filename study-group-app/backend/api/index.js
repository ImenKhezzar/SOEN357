const verifyJWT = require('../middleware/verifyJWT');

module.exports = (app) => {
    app.use('/register', require('./register'));
    app.use('/auth', require('./auth'));
    app.use('/refresh', require('./refresh'));
    app.use('/logout', require('./logout'));

    // every endpoint defined under will require the JWT validation
    // basically you need to be authenticated to access these endpoints 
    app.use(verifyJWT);
    app.use('/users', require('./users'));
    app.use('/study-rooms', require('./studyRooms'))
    app.use('/tasks', require('./tasks'));
    app.use('/playlists', require('./playlists'));
};