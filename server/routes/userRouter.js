const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const fileMiddlaware = require('../middlewares/file');

router.post('/signup', userController.registration);
router.post('/addPhoto', fileMiddlaware.single('userPhoto'), userController.addPhoto);
router.post('/signin', userController.login);
router.post('/signout', userController.logout);
router.get('/checkUser', userController.checkUser);
router.get("/getUserProfile", userController.getUserProfile)
router.put("/editProfileInfo", userController.safeChanges)


module.exports = router;
