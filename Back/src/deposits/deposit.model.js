'use strict'

const mongoose = require('mongoose')

const depositSchema = mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('Deposit', depositSchema)