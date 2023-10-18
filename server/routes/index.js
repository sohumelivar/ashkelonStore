const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const itemRouter = require('./itemRouter');
const messageRouter = require('./messageRouter');
const categoryRouter = require('./categoryRouter');

router.use('/user', userRouter);
router.use('/good', itemRouter);
router.use('/message', messageRouter);
router.use('/category', categoryRouter);

module.exports = router;