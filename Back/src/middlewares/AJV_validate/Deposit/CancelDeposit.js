const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true, allowUnionTypes:true})
require('ajv-errors')(ajv)

const schemaCancelDeposit = {
    type: 'object',
    properties: {
        depositId: {
            type: 'string',
            pattern: '^[0-9a-fA-F]{24}$',
            errorMessage: {
                type: 'Deposit must be a string',
                pattern: 'Deposit must be a valid ObjectId'
            }
        }
    },
    required: ['depositId'],
    errorMessage: {
        required: {
            depositId: 'Deposit is required'
        }
    },

    additionalProperties: false
}

module.exports = schemaCancelDeposit