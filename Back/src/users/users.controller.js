'use strict'

const User = require('./users.model')

exports.register = async(req, res, next) => {
    try{
        let data = req.body
        const emailExist = await User.findOne({ email: data.email })
        if(emailExist) return res.status(400).send({message: 'Email already exists'})
        data.role = 'CLIENT'
        let user = new User(data)
        await user.save()
        return res.send({message: 'Account created successfully'})
    }catch(err){
        console.log(err)
        next(err)
    }
}

