'use strict'

const jwt = require('jsonwebtoken')

exports.generateToken = async (data) => {
    try{
        const payload = {
            id: data._id,
            email: data.email,
            username: data.username,
            //role: data.role
        }
        const options = {
            expiresIn: '2h'
        }
        const token = jwt.sign(payload, process.env.SECRET_KEY, options)
        return token
    }catch(err){
        console.log(err)
        return err
    }
}