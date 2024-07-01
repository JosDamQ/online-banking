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
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'canceled'],
        default: 'completed'
    },
    deposit_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deposit',
        default: null
    },
    withdraw_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Withdraw',
        default: null
    },
    transfer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transfer',
        default: null
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('Movement', movementSchema)