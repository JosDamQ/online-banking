'use strict'

const TypeAccount = require('./typeAccount.model')

exports.createTypeAccount = async (req, res, next ) => {
    try{
        let data = req.body
        const existTypeAccount = await TypeAccount.findOne({ name: data.name })
        if(existTypeAccount) return res.status(400).send({ message: 'Type account already exists' })
        const typeAccount = new TypeAccount(data)
        await typeAccount.save()
        return res.status(201).send(typeAccount)
    }catch(error){
        console.log(error)
        next(error)
    }
}

exports.getTypeAccounts = async (req, res, next) => {
    try{
        const typeAccounts = await TypeAccount.find()
        if(typeAccounts.length === 0) return res.status(404).send({ message: 'Dont have TypeAccounts' })
        return res.send(typeAccounts)
    }catch(error){
        console.log(error)
        next(error)
    }
}

exports.getTypeAccount = async (req, res, next) => {
    try{
        const typeAccount = await TypeAccount.findById(req.params.id)
        if(!typeAccount) return res.status(404).send({ message: 'TypeAccount not found' })
        return res.send(typeAccount)
    }catch(error){
        console.log(error)
        next(error)
    }
}