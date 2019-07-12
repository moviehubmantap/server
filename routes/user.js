const router = require('express').Router()
const User = require('../controllers/user')
router.post('/login', User.login)
router.post('/register', User.register)
module.exports = router