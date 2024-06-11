'use strict'

const jwt = require('jsonwebtoken')

exports.verifyToken = async (req, res, next) => {
    if(!req.headers.authorization) return res.status(401).json({message: 'Does not have authorization header'})
    try{
        const token = req.headers.authorization.replace(/['"]+/g, '').split(' ').pop();
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    }catch(err){
        console.log(err)
        if (err instanceof jwt.JsonWebTokenError) {
            if (err.message === 'jwt expired') {
                return res.status(401).json({message: 'Expired Token'})
            } else {
                return res.status(401).json({message: 'Invalid token'})
            }
        } else {
            return res.status(500).json({message: 'Something went wrong'})
        }
    }
}