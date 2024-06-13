const moongose = require('mongoose');

const accountSchema = moongose.Schema({
    accountNumber: {
        type: Number,
        required: true,
        unique: true
    },
    user: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    accountType: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'TypeAccount',
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    movements: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    } 
}, {
    versionKey: false
})

module.exports = moongose.model('Account', accountSchema)