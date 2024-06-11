'use strict'

const bycrypt = require('bcrypt')

exports.encrypt = async (password) => {
    try{
        return await bycrypt.hash(password, 10)
    }catch(err){
        console.error(err)
    }
}

exports.comparePassword = async (password, hash) => {
    try{
        return await bycrypt.compare(password, hash)
    }catch(err){
        console.error(err)
    }
}