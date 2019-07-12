const {verifyToken} = require('../helpers/jwt')

module.exports = {
    authentication(req, res, next){
        if (!req.headers.hasOwnProperty('token')) {
            throw new Error('authentication failure')
        }else {
            try {
                const decode = verifyToken(req.headers.token)
                req.decode = decode
                next()
            }catch(err) {
                res.status(403).json({err})
            }
        }
    }
}