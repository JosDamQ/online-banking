'use strict'
const moongose = require('mongoose')

const adminSchema = moongose.Schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: 'Invalid email format'
        }
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dateCreate: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
})

module.exports = moongose.model('Admin', adminSchema)