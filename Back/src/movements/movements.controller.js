'use strict'
const Movements = require('./movements.model')

const types = { deposit: 'deposit', withdraw: 'withdraw', transfer: 'transfer' }
const status = { pending: 'pending', completed: 'completed', canceled: 'canceled' }

const createMovement = async (type, to, from, amount, description, deposit_id) => {
    const movement = new Movements({
        type,
        to,
        from,
        amount,
        description,
        status: status.completed,
        deposit_id
    })
    return await movement.save()
}

const cancelMovement = async (depositId) => {
    return await Movements.findOneAndUpdate(
        {deposit_id: depositId},
        {status: status.canceled},
        {new: true}
    )
}



module.exports = { createMovement, types, status ,cancelMovement}
    


