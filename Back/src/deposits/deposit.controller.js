'use strict'

const Deposit = require('./deposit.model')
const Account = require('../accounts/account.model')

exports.createDeposit = async (req, res, next) => {
    try{
        let data = req.body
        const accountExist = await Account.findById(data.account)
        if(!accountExist) return res.status(400).send({message: 'Account not found to deposit'})

        if(data.amount <= 0) return res.status(400).send({message: 'The amount must be greater than 0'})

        const deposit = new Deposit(data)
        await deposit.save()

        await accountExist.updateOne({$inc: {balance: data.amount, movements: 1}})

        return res.status(201).send({message: 'Deposit created successfully', deposit})
        
    }catch(error){
        console.log(error)
        next(error)
    }
}