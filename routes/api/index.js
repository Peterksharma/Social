const router = require('express').Router();
const userRoutes = require('./user');
const thoughtsRoutes = require('./thoughts');

router.use('/user', userRoutes);
router.use('/thoughts', thoughtsRoutes);

module.exports = router;
