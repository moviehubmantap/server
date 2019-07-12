const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const axios = require('axios')
const tasteDiveAPI = 'https://tastedive.com/api/similar?type=movies&k=340179-movieHub-6N3RBPCP&limit=10&info=1&q='
require('dotenv').config()

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

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

app.get('/similiar/:title', (req, res) => {
  axios({
    method: 'GET',
    url: `${tasteDiveAPI}${req.params.title}`
  })
  .then(({data}) => {
    res.status(200).json(data)
  })
  .catch(err => {
    console.log(err)
  })
})



app.listen(port, () => console.log(`listening on port port`))

//install axios, bcrypt, cors, dotenv, express, jwt, mongoose