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

exports.getAccounts = async (req, res, next) => {
    try{
        const accounts = await Account.find().populate('user', '-password').populate('accountType')
        if(!accounts) return res.status(404).send({ message: 'Accounts not found' })
        return res.send(accounts)
    }catch(err){
        console.error(err)
        next(err)
    }
}

exports.getAccount = async (req, res, next) => {
    try{
        const accountId = req.params.id
        const account = await Account.findById(accountId).populate('user', '-password').populate('accountType')
        if(!account) return res.status(404).send({ message: 'Account not found' })
        return res.send(account)
    }catch(err){
        console.error(err)
        next(err)
    }
}

exports.searchAccountByNumber = async (req, res, next) => {
    try{
        const accountNumber = req.params.accountNumber
        const account = await Account.findOne({ accountNumber: accountNumber }).populate('user', '-password').populate('accountType')
        if(!account) return res.status(404).send({ message: 'Account not found' })
        return res.send(account)
    }catch(err){
        console.error(err)
        next(err)
    }
}

exports.getAccountsByUser = async (req, res, next) => {
    try{
        const userId = req.params.id
        const userExist = await User.findById(userId)
        if(!userExist) return res.status(404).send({ message: 'User not found' })
        const accounts = await Account.find({ user: userId }).populate('user', '-password').populate('accountType')
        if(!accounts) return res.status(404).send({ message: 'client doest not have accounts' })
        return res.send(accounts)
    }catch(err){
        console.error(err)
        next(err)
    }
}

exports.getByMovements = async (req, res, next) => {
    try{
        const { order = 'desc' } = req.query  
        const accounts = await Account.find().sort({ movements: order == 'asc' ? 1 : -1 }).populate('user', '-password').populate('accountType')
        if(!accounts) return res.status(404).send({ message: 'Accounts not found' })
        return res.send(accounts)
    }catch(err){
        console.error(err)
        next(err)
    }
}

exports.deleteAccount = async (req, res, next) => {
    try{
        const accountId = req.params.id
        const account = await Account.findById(accountId)
        if(!account) return res.status(404).send({ message: 'Account not found' })
        if(account.balance > 0) return res.status(400).send({ message: 'Account balance must be 0' })
        await Account.findByIdAndDelete(accountId)
        return res.send({ message: 'Account deleted successfully' })
    }catch(err){
        console.error(err)
        next(err)
    }
}