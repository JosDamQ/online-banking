'use strict'

const Admin = require('./admin.model')
const User = require('../users/users.model')
const Account = require('../accounts/account.model')
const TypeAccount = require('../TypeAccount/typeAccount.model')
const { generateToken } = require('../services/jwt')
const { generateVerificationToken } = require('../services/jwt')
const { encrypt, comparePassword } = require('../utils/validate')
const sendEmail = require('../services/sendEmails')
const generateAccountNumber = require('../services/createAccountNumber')

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

exports.login = async (req, res, next) => {
    try{
        let data = req.body
        let admin = await Admin.findOne({ username: data.username })
        let user = await User.findOne({ username: data.username })
        if(admin) {
            let validPassword = await comparePassword(data.password, admin.password)
            if(!validPassword) return res.status(400).send('Invalid password')
            let token = await generateToken(admin)
            return res.send({ message: 'Login successfully for admin', token: token })  
        } else if(user) {
            if(user.activate == 0) return res.status(400).send({ message: 'User not activated' })
            let validPassword = await comparePassword(data.password, user.password)
            if(!validPassword) return res.status(400).send('Invalid password')
            let token = await generateToken(user)
            return res.send({ message: 'Login successfully for user', token: token })
        }else{
            return res.status(404).send({ message: 'Username not found' })
        } 
    }catch(err){
        console.error(err)
        next(err)
    }
}

exports.createAdmin = async (req, res, next) => {
    try{
        let data = req.body
        let emailExist = await Admin.findOne({ email: data.email })
        if(emailExist) return res.status(400).send('Email already exists')
        let existUsername = await Admin.findOne({ username: data.username })
        if(existUsername) return res.status(400).send('Username already exists')
        data.password = await encrypt(data.password)
        let admin = new Admin(data)
        await admin.save()
        return res.send('Admin created successfully')
    }catch(err){
        console.error(err)
        next(err)
    }
}

exports.createUser = async (req, res, next) => {
    try{
        let data = req.body
        let emailExist = await User.findOne({ email: data.email })
        if(emailExist) return res.status(400).send({ message: 'Email already exists' })
        let usernameExist = await User.findOne({ username: data.username })
        if(usernameExist) return res.status(400).send({ message: 'Username already exists'})
        let NoIdentification = await User.findOne({ NoIdentification: data.NoIdentification })
        if(NoIdentification) return res.status(400).send({ message: 'NoIdentification already exists' })
        //
        let typeAccount = await TypeAccount.findOne({ _id: data.accountType })
        if(!typeAccount) return res.status(404).send({ message: 'TypeAccount not found' })
        // Encrypt password
        data.password = await encrypt(data.password)
        //Create User
        let user = new User(data)
        await user.save()

        //Generate token for verification
        const activationToken = await generateVerificationToken(user)
        const activationLink = `http://localhost:1234/users/verifyEmail/${activationToken}`;

        //Create account for user
        const userExist = await User.findOne({ _id: user._id })

        if(data.balance < typeAccount.minBalance) return res.status(400).send({ message: 'The balance is less than the minimum allowed' })
        const accountNumber = await generateAccountNumber() 

        let account = new Account({
            accountNumber: accountNumber,
            user: userExist._id,
            accountType: typeAccount._id,
            balance: data.balance
        })
        await account.save()

        //Email
        const dataEmail = {
            name: data.name,
            accountNumber: accountNumber,
            accountType: typeAccount.name,
            activationLink: activationLink
        }

        await sendEmail(data.email, 'Welcome to nodeBank', 'welcomeEmail', dataEmail)

        return res.send({ message: 'User created successfully with account' })
    }catch(err){
        console.error(err)
        next(err)
    }
}

