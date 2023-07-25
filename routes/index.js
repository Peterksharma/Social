const router = require('express').Router();

const userRoutes = require('./api/user')
const thoughtRoutes = require('./api/thoughts')

router.use('/api/user', userRoutes)
router.use('/api/thoughts', thoughtRoutes)

module.exports = router;
