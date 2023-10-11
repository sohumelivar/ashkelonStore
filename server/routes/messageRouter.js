const Router = require('express');
const router = new Router();
const messageController = require('../controllers/messageController');

router.post('/sendMessageItemPage', messageController.sendMessageItemPage);
router.get('/getAllLastMessages', messageController.getAllLastMessages);
router.get('/unreadMessage', messageController.getUnreadMessage);
router.post('/clearCountMessages', messageController.clearCountMessages);


module.exports = router;
