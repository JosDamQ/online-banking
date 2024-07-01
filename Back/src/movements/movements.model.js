'use strict'

const mongoose = require('mongoose')

const movementSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['deposit', 'withdraw', 'transfer']
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('Movement', movementSchema)