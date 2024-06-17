const Ajv = require("ajv")
const ajv = new Ajv({allErrors: true, allowUnionTypes:true})
require("ajv-errors")(ajv)

const schemaGetByNumber = {
    type: 'object',
    properties: {
        accountNumber: {
            type: 'string',
            pattern: '^[0-9]{10}$',
            errorMessage: {
                type: 'AccountNumber must be a string',
                pattern: 'AccountNumber must be 10 digits long'
            }
        }
    },
    required: ['accountNumber'],
    errorMessage: {
        required: {
            accountNumber: 'AccountNumber is required'
        }
    },
    additionalProperties: false
}

module.exports = schemaGetByNumber