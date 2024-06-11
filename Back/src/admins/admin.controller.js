'use strict'

const Admin = require('./admin.model')
const { generateToken } = require('../services/jwt')
const { encrypt, comparePassword } = require('../utils/validate')

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
        params.password = await encrypt(params.password)
        let admin = new Admin(params)
        await admin.save()
        return console.log('Admin created successfully')
    }catch(err){
        console.log(err)
        next(err)
    }
}

exports.loginAdmin = async (req, res, next) => {
    try{
        let data = req.body
        let admin = await Admin.findOne({ username: data.username })
        if(!admin) return res.status(404).send('Username not found')
        let validPassword = await comparePassword(data.password, admin.password)
        if(!validPassword) return res.status(400).send('Invalid password')
        let token = generateToken(admin)
        return res.send(token)   
    }catch(err){
        console.error(err)
        next(err)
    }
}