module.exports = userRoutes;

function userRoutes(passport) {

    var userController = require('./userController');
    var router = require('express').Router();

    router.post('/login', userController.login);
    router.post('/signup', userController.signup);
    router.post('/unregister', passport.authenticate('jwt', {session: false}), userController.unregister);
    router.get('/api/user', passport.authenticate('jwt', {session: false}), userController.getUserInfo);
    router.post('/api/user', passport.authenticate('jwt', {session: false}), userController.editUserInfo);

    return router;

}
