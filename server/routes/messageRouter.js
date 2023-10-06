const Router = require('express');
const router = new Router();
const messageController = require('../controllers/messageController');

router.post('/sendMessageItemPage', messageController.sendMessageItemPage);
router.get('/getAllLastMessages', messageController.getAllLastMessages);

module.exports = router;
