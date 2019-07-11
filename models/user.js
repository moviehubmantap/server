const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { hashPassword } = require('../helpers/bcrypt')
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'what do we call you?'],
        unique:[true, 'username must be unique.']
    },
    password: {
        type: String,
        required: [true, 'this field is required.'],
        minlength: [8, 'too short, min length is 8']
    },
    email: {
        unique: [true, 'email must be unique.'],
        required: [true, 'this field is required aswell.']
    }
})

userSchema.pre('save', function(next) {
    this.password = hashPassword(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User