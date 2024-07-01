'use strict'

const moment = require('moment')

const Deposit = require('./deposit.model')
const Account = require('../accounts/account.model')
const { createMovement, types } = require('../movements/movements.controller')

exports.createDeposit = async (req, res, next) => {
    try{
        let data = req.body
        const accountExist = await Account.findById(data.account)
        if(!accountExist) return res.status(400).send({message: 'Account not found to deposit'})

        if(data.amount <= 0) return res.status(400).send({message: 'The amount must be greater than 0'})

        const deposit = new Deposit(data)
        await deposit.save()

        await accountExist.updateOne({$inc: {balance: data.amount, movements: 1}})

        await createMovement(types.deposit, data.account, null, data.amount)

        return res.status(201).send({message: 'Deposit created successfully', deposit})
        
    }catch(error){
        console.log(error)
        next(error)
    }
}

exports.getDeposits = async (req, res, next) => {
    try{
        const deposits = await Deposit.find()
        if(deposits.length === 0) return res.status(404).send({message: 'Deposits not found'})
        return res.status(200).send(deposits)
    }catch(error){
        console.log(error)
        next(error)
    }
}

exports.getDepositsByAccount = async (req, res, next) => {
    try{
        const accountId = req.params.accountId
        const limit = parseInt(req.query.limit)
        const accountExist = await Account.findById(accountId)
        if(!accountExist) return res.status(400).send({message: 'Account not found'})
        const deposits = await Deposit.find({account: accountId}).sort({date: -1}).limit(limit)
        if(deposits.length === 0) return res.status(404).send({message: 'Deposits not found for this account'})
        return res.status(200).send(deposits)
    }catch(error){
        console.log(error)
        next(error)
    }
}

// exports.getMyDeposits = async (req, res, next) => {
//     try{
//         const userId = req.user.id
//         const accounts = await Account.find({user: userId})
//         if(accounts.length == 0) return res.status(404).send({message: 'Accounts not found'})
        
//         const accountsId = accounts.map(account => account._id)

//         const deposits = await Deposit.find({account: {$in: accountsId}})
//         if(deposits.length === 0) return res.status(404).send({message: 'Deposits not found for this user'})

//         return res.status(200).send(deposits)
//     }catch(error){
//         console.log(error)
//         next(error)
//     }
// }


exports.cancelDeposit = async (req, res, next) => {
    try{
        const depositId = req.params.depositId
        const depositExist = await Deposit.findById(depositId)
        if(!depositExist) return res.status(404).send({message: 'Deposit not found'})
        
        const date = moment(depositExist.date)
        console.log(moment().diff(date, 'minutes'))
        if(moment().diff(date, 'minutes') > 1) return res.status(400).send({message: 'You can only cancel a deposit within 1 minute of being created'})

        const accountExist = await Account.findById(depositExist.account)
        if(!accountExist) return res.status(400).send({message: 'Account not found'})

        await accountExist.updateOne({$inc: {balance: -depositExist.amount, movements: -1}})
        await Deposit.findByIdAndDelete(depositId)

        return res.status(200).send({message: 'Deposit canceled successfully'})
    }catch(error){
        console.log(error)
        next(error)
    }
}

