'use strict'
const User = require('../models/user')
const {comparePassword} = require('../helpers/bcrypt')
const {signToken} = require('../helpers/jwt')
class UserController {
    static register(req, res) {
        const { username, password, email } = req.body
        const newUser = { username, password, email }
        User.create(newUser)
            .then(newuser => {
                res.status(201).json(newuser)
            })
            .catch(err => {
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
        User.findOne({username})
            .then(user => {
                if (!user) {
                    res.status(404).json({
                        message: 'invalid username / password'
                    })
                }else{
                  if (comparePassword(password, user.password)) {
                      console.log(comparePassword(password, user.password))
                      let payload = {
                          id: user.id
                      }

                      req.headers.token = signToken(payload)
                      console.log(req.headers)
                      res.status(200).json({
                          message: 'signin success'
                      })
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
}

module.exports = UserController;