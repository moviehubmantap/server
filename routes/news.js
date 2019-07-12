const express = require('express')
const NewsRouter = express.Router()
const NewsController = require('../controllers/newsController')

NewsRouter.get('/',NewsController.fetchAll)
NewsRouter.get('/detail/:id',NewsController.fetchDetail)

module.exports = NewsRouter