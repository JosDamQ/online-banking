'use strict'

const User = require('./users.model')

exports.test = async(req, res, next) => {
    try{
        return res.send({message: 'User controller works'})
    }catch(err){
        console.log(err)
        next(err)
    }
}