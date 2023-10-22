const Router = require('express');
const router = new Router();
const categoryController = require('../controllers/categoryController');

router.get('/getMainCategory', categoryController.getMainCategory);
router.post('/getParentCategory', categoryController.getParentCategory);
router.post('/getSelectCategory', categoryController.getSelectCagetory);

module.exports = router;