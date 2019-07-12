require('dotenv').config()
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const morgan = require('morgan')
const routes = require('./routes')
const errorHandler = require('./helpers/errorHandler')

const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/moviehub'
mongoose.connect(url, {useNewUrlParser: true}, (err) => {
  if(err) {
    console.log(err)
  }
  else {
    console.log('mongoose connected')
  }
})


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use('/api', routes)
app.use(errorHandler)




app.listen(port, () => console.log(`listening on port port`))

//install axios, bcrypt, cors, dotenv, express, jwt, mongoose