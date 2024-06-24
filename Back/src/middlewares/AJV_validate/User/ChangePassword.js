const Ajv = require("ajv")
const ajv = new Ajv({allErrors: true, allowUnionTypes:true})
require("ajv-errors")(ajv)

const schemaChangePassword = {
    type: 'object',
    properties: {
        newPassword: {
            type: "string",
            minLength: 8,
            maxLength: 50,
            pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])",
            errorMessage: {
                type: "Password must be a string",
                minLength: "Password must be at least 8 characters long",
                maxLength: "Password must be at most 50 characters long",
                pattern: "Password must contain at least one lowercase letter, one uppercase letter, one number and one special character",
            },
        },
        oldPassword: {
            type: "string",
            errorMessage: {
                type: "Old password must be a string",
            },
        }
    },
    required: ["newPassword", "oldPassword"],
    errorMessage: {
        required: {
            newPassword: "New password is required",
            oldPassword: "Old password is required",
        }
    },
    additionalProperties: false,
}

module.exports = schemaChangePassword