const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    DPI: {
        type: String,
        required: true,
        minlength: 13,
        maxlength: 13
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        minlength: 8,
        maxlength: 8
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                // Expresión regular para validar un email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: 'Invalid email format'
        }
    },
    password: {
        type: String,
        required: true
    },
    nameWorkPlace: {
        type: String,
        required: true
    },
    incomings: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN', 'CLIENT']
    }

},{
    versionKey: false
})


module.exports = mongoose.model('User', userSchema)