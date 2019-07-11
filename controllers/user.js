const User = require('../models/user')
class UserController {
    static register(req, res) {
        const { username, password, email } = req.body
        User.create(newUser)
            .then(newuser => {
                res.status(201).json(newUser)
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
        const {username, password, email} = req.body
        User.findOne({username})
            .then(user => {
                if (!user) {
                    res.status(404).json({
                        message: 'invalid username / password'
                    })
                }else{
                    
                }
            })
    }
}

module.exports = UserController;