const Ajv = require("ajv")
const ajv = new Ajv({allErrors: true, allowUnionTypes:true})
require("ajv-errors")(ajv)

const schemaGetByUser = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            pattern: '^[0-9a-fA-F]{24}$',
            errorMessage: {
                type: 'Id must be a string',
                pattern: 'Id must be a valid ObjectId'
            }
        }
    },
    required: ['id'],
    errorMessage: {
        required: {
            id: 'Id is required'
        }
    },
    additionalProperties: false
}

module.exports = schemaGetByUser