'use strict'

const Admin = require('./admin.model')

exports.test = async (req, res) => {
    try{
        return res.send('Test')
    }catch(err){
        console.log(err)
        next(err)
    }
}

exports.createAdminDefault = async (req, res, next) => {
    try{
        const params = {
            username: process.env.SUPERADMIN_USERNAME,
            email: process.env.SUPERADMIN_EMAIL,
            password: process.env.SUPERADMIN_PASSWORD
        }
        const emailExist = await Admin.findOne({ email: params.email })
        if(emailExist) return console.log('Admin already exists')
        let admin = new Admin(params)
        await admin.save()
        return console.log('Admin created successfully')
    }catch(err){
        console.log(err)
        next(err)
    }
}