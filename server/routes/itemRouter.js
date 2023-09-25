const Router = require('express');
const router = new Router();
const itemController = require('../controllers/itemController');
const fileMiddlaware = require('../middlewares/file');

router.get('/getAll', itemController.getAll);
router.post('/addGood', itemController.addGood);
router.post('/addImg', fileMiddlaware.single('goodsImg'), itemController.addImg);
router.post('/pageViewId', itemController.pageViewId);
router.get('/pageAfter', itemController.pageViewIdAfterRefresh);
router.get('/getAllUserItems', itemController.getAllUserItems);
router.post('/deleteItem', itemController.deleteItem);
router.post('/editItem', itemController.editItem);
router.get('/editItemRefresh', itemController.editItemRefresh);
router.post('/saveChange', itemController.saveChange);

module.exports = router;