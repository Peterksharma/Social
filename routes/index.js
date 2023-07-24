const router = require('express').Router();

const userRoutes = require('./users')
const thoughtRoutes = require('./thoughts')
const commentRoutes = require('./comments')

router.use('./users', userRoutes)
router.use('./thoughts', thoughtRoutes)
router.use('./comments', commentRoutes)

module.exports = router;
