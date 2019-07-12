'use strict'
const {OAuth2Client} = require('google-auth-library')
const User = require('../models/user')
const {comparePassword} = require('../helpers/bcrypt')
const {signToken} = require('../helpers/jwt')
class UserController {
    static register(req, res) {
        const { username, password, email } = req.body
        const newUser = { username, password, email }
        console.log(newUser)
        User.create(newUser)
            .then(newuser => {
                console.log(newuser, 'masuk create')
                res.status(201).json(newuser)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    message: 'internal server error',
                    source: 'User Controller',
                    detail: err
                })
            })
    }

    // static update(req, res) {
    //     User.updateOne({_id:req.params.id}, req.body)
    //         .then(success => {

    //         })
    //         .catch(err => {
    //             res.status(500).json({
    //                 message: 'internal server error',
    //                 source: 'Controller update',
    //                 detail: err
    //             })
    //         })
    // }

    // static delete(req, res) {
    //     User.deleteOne({_id: req.params.id})
    //         .then(success => {
    //             res.status(200).json({
    //                 message: 'success delete collection.'
    //             })
    //         })
    //         .catch(err => {
    //             res.status(500).json({
    //                 message: 'internal server error',
    //                 source: 'Controller delete',
    //                 detail: err
    //             })
    //         })
    // }

    // static findOne(req, res) {
    //     User.findById(req.params.id)
    //         .then(user => {
    //             res.status(200).json(user)
    //         })
    //         .catch(err => {
    //             res.status(500).json({
    //                 message: 'internal server error',
    //                 source: 'Controllre findOne',
    //                 detail: err
    //             })
    //         })
    // }

    // static findAll(req, res) {
    //     User.find()
    //         .then(users => {
    //             res.status(200).json(users)
    //         })
    //         .catch(err => {
    //             res.status(500).json({
    //                 message: 'internal server error',
    //                 source: 'Controller findAll',
    //                 detail: err
    //             })
    //         })
    // }

    static login(req, res) {
        let {username, password, email} = req.body
        User.findOne({email})
            .then(user => {
                if (!user) {
                    res.status(404).json({
                        message: 'invalid username / password'
                    })
                }else{
                  if (comparePassword(password, user.password)) {
                      let payload = {
                          id: user.id,
                          username: user.username
                      }
                      const token = signToken(payload)
                      res.status(200).json({token, payload})
                  }else{
                      res.status(400).json({
                          message: 'invalid username / password'
                      })
                  }
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({err})
            })
    }

    static signinGoogle(req, res) {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket => {
            const {name, email} = ticket.getPayload()
            let payload = {name, email}
            const token = signToken(payload)
            let password = name+ 'moviesHub'
            return Promise.all([User.findOne({email}), token, password, payload])
        })
        .then(([user, token, password, payload]) => {
            if (user) {
                res.status(200).json({token})
            }else {
                let newUser = {
                    username: payload.name,
                    email: payload.email,
                    password: password
                }
                return Promise.all([User.create(newUser), token])
            }
        })
        .then(([user, token]) => {
            res.status(200).json({token})
        })
        .catch(err => {
            res.status(500).json({
                messsage: 'internal server error',
                source: 'User controller',
                detail: err
            })
        })
    }
}

module.exports = UserController;