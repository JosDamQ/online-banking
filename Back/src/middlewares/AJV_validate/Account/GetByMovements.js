const Ajv = require("ajv")
const ajv = new Ajv({allErrors: true, allowUnionTypes:true})
require("ajv-errors")(ajv)

const schemaGetByMovements = {
    type: 'object',
    properties: {
        order: {
            type: 'string',
            enum: ['asc', 'desc'],
            errorMessage: {
                type: 'Order must be a string',
                enum: 'Order must be asc or desc'
            }
        }
    },
    additionalProperties: false
}

module.exports = schemaGetByMovements