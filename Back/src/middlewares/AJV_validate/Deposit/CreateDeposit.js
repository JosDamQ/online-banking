const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true, allowUnionTypes:true})
require('ajv-errors')(ajv)

const schemaCreateDeposit = {
    type: 'object',
    properties: {
        account: {
            type: 'string',
            pattern: '^[0-9a-fA-F]{24}$',
            errorMessage: {
                type: 'User must be a string',
                pattern: 'User must be a valid ObjectId'
            }
        },
        amount: {
            type: 'number',
            errorMessage: {
                type: 'Amount must be a number',
            }
        }
    },
    required: ['account', 'amount'],
    errorMessage: {
        required: {
            account: 'Account is required',
            amount: 'Amount is required'
        }
    },

    additionalProperties: false
}

module.exports = schemaCreateDeposit