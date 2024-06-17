const Ajv = require("ajv")
const ajv = new Ajv({allErrors: true, allowUnionTypes:true})
require("ajv-errors")(ajv)

const schemaCreateAccount = {
    type: 'object',
    properties: {
        user: {
            type: 'string',
            pattern: '^[0-9a-fA-F]{24}$',
            errorMessage: {
                type: 'User must be a string',
                pattern: 'User must be a valid ObjectId'
            }
        },
        accountType: {
            type: 'string',
            pattern: '^[0-9a-fA-F]{24}$',
            errorMessage: {
                type: 'AccountType must be a string',
                pattern: 'AccountType must be a valid ObjectId'
            }
        },
        balance: {
            type: 'number',
            errorMessage: {
                type: 'Balance must be a number',
            }
        }
    },
    required: ['user', 'accountType', 'balance'],
    errorMessage: {
        required: {
            user: 'User is required',
            accountType: 'AccountType is required',
            balance: 'Balance is required'
        }
    },
    additionalProperties: false
}

module.exports = schemaCreateAccount