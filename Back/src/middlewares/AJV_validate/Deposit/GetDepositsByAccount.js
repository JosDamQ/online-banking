const Ajv = require('ajv')
const ajv = new Ajv({allErrors: true, allowUnionTypes:true})
require('ajv-errors')(ajv)

const schemaGetDepositsByAccountParam = {
    type: 'object',
    properties: {
        accountId: {
            type: 'string',
            pattern: '^[0-9a-fA-F]{24}$',
            errorMessage: {
                type: 'Account must be a string',
                pattern: 'Account must be a valid ObjectId'
            }
        }
    },
    required: ['accountId'],
    errorMessage: {
        required: {
            accountId: 'Account is required'
        }
    },
    additionalProperties: false
}

const schemaGetDepositsByAccountQuery = {
    type: 'object',
    properties: {
        limit: {
            type: 'string',
            pattern: '^[0-9]+$',
            errorMessage: {
                type: 'Limit must be a string',
                pattern: 'Limit must be a number'
            }
        }
    },
    additionalProperties: false
}

module.exports = {schemaGetDepositsByAccountParam, schemaGetDepositsByAccountQuery}