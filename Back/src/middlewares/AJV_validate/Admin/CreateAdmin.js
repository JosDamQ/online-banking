const Ajv = require("ajv")
const ajv = new Ajv({allErrors: true, allowUnionTypes:true})
require("ajv-errors")(ajv)

const schemaCreateAdmin = {
    type: 'object',
    properties: {
        email: {
            type: "string",
            pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
            errorMessage: {
              type: "Email must be a string",
              pattern: "Email must be in the format: example@example.com",
            },
        },
        username: {
            type: "string",
            minLength: 3,
            maxLength: 50,
            pattern: "^[a-zA-Z0-9]+$",
            errorMessage: {
              type: "Username must be a string",
              minLength: "Username must be at least 3 characters long",
              maxLength: "Username must be at most 50 characters long",
              pattern: "Username must only contain letters and numbers",
            },
        },
        password: {
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
        }
    },
    required: ["email", "username", "password"],
    errorMessage: {
        required: {
            email: "Email is required",
            username: "Username is required",
            password: "Password is required",
        }
    },
    additionalProperties: false,
}

module.exports = schemaCreateAdmin