const Router = require('express');
const router = new Router();
const categoryController = require('../controllers/categoryController');

router.get('/getMainCategory', categoryController.getMainCategory);

module.exports = router;