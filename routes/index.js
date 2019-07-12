const express = require('express')
const router = express.Router()
const newsRouter = require('./news')
const userRouter = require('./user')

router.use('/users', userRouter)
router.use('/news',newsRouter)


module.exports = router