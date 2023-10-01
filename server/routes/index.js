const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const itemRouter = require('./itemRouter');
const messageRouter = require('./messageRouter');

router.use('/user', userRouter);
router.use('/good', itemRouter);
router.use('/message', messageRouter);

module.exports = router;