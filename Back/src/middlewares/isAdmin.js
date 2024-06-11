'use strict'

//const jwt = require('jsonwebtoken')
const Admin = require('../admins/admin.model')

exports.isAdmin = async (req, res, next)  => {
    try{
        let user = req.user
        const adminExist = await Admin.findOne({ _id: user.id })
        if(!adminExist) return res.status(403).json({message: 'You do not have the necessary permissions'})
        next()
    }catch(err){
        console.log(err)
        return res.status(500).json({message: 'Something went wrong'})
    }
}