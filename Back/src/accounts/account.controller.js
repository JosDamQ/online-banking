'use strict'

const Account = require('./account.model')
const User = require('../users/users.model')
const TypeAccount = require('../TypeAccount/typeAccount.model')

exports.createAccount = async (req, res, next) => {
    try{
        let data = req.body
        let accountNumber = Math.floor(Math.random() * 9000000000) + 1000000000
        const existUser = await User.findById(data.user)
        if(!existUser) return res.status(400).send('User not found')
        const existTypeAccount = await TypeAccount.findById(data.accountType)
        if(!existTypeAccount) return res.status(400).send('Type Account not found')

        if(data.balance < existTypeAccount.minBalance) return res.status(400).send({ message: 'The balance is less than the minimum allowed' })

        const existNumber = await Account.findOne({ accountNumber: accountNumber })
        while(existNumber){
            accountNumber = Math.floor(Math.random() * 9000000000) + 1000000000
            existNumber = await Account.findOne({ accountNumber: accountNumber })
        }

        let account = new Account({
            accountNumber: accountNumber,
            user: existUser._id,
            accountType: existTypeAccount._id,
            balance: data.balance
        })
        await account.save()

        return res.send({message: 'Account created successfully'})

    }catch(err){
        console.error(err)
        next(err)
    }
}