const Ajv = require("ajv")
const ajv = new Ajv({allErrors: true, allowUnionTypes:true})
require("ajv-errors")(ajv)

const schemaCreateTypeAccount = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            enum: [
                'SAVINGS',
                'MONETARY',
                'CHILDREN',
                'STUDENT',
                'BUSINESS',
                'DEFAULT'
            ],
            errorMessage: {
                type: 'Name must be a string',
                enum: 'Name must be SAVINGS, MONETARY, CHILDREN, STUDENT, BUSINESS or DEFAULT'
            }
        },
        minBalance: {
            type: 'number',
            errorMessage: {
                type: 'MinBalance must be a number'
            }
        }
    },
    required: ['name', 'minBalance'],
    errorMessage: {
        required: {
            name: 'Name is required',
            minBalance: 'MinBalance is required'
        }
    },
    additionalProperties: false
}

module.exports = schemaCreateTypeAccount