const express = require('express')
const router = express.Router()
const newsRouter = require('./news')
const userRouter = require('./user')
const movie = require('../controllers/newsController')

router.use('/users', userRouter)
router.use('/news',newsRouter)
router.get('/similiar/:title',movie.fetchMovie)


module.exports = router