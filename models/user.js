const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { hashPassword } = require('../helpers/bcrypt')

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username is required.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required.'],
        minlength: [8, 'too short, min length is 8']
    },
    email: {
        type: String,
        required: [true, 'email is required aswell.'],
        validate:[{
            validator:function(v){
                const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                return re.test(v)
            },
            message: props => `${props.value} is not a valid email!`
        },
        {
            validator: function(value) {
              return new Promise ((resolve, reject) => {
                User.findOne({email: value})
                .then (member => {
                  if (member){
                    resolve (false)
                  } else {
                    resolve (true)
                  }
                })
                .catch(err => {
                  reject (err)
                })
              })
            },
            message: props => `${props.value} is already used!`
          }]
    }
})

userSchema.pre('save', function(next) {
    this.password = hashPassword(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User