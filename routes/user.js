const router = require('express').Router()
const User = require('../controllers/user')
router.get('/users/login', User.login)
module.exports = router