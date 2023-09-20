const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.registration);
router.post('/signin', userController.login);
router.post('/signout', userController.logout);
router.get('/checkUser', userController.checkUser);

module.exports = router;