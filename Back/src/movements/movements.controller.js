'use strict'
const Movements = require('./movements.model')

const types = { deposit: 'deposit', withdraw: 'withdraw', transfer: 'transfer' }

const createMovement = async (type, to, from, amount, description) => {
    const movement = new Movements({
        type,
        to,
        from,
        amount,
        description
    })
    return await movement.save()
}

module.exports = { createMovement, types }
    


