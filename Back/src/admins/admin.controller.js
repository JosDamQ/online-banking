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