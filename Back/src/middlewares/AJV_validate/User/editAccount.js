const Ajv = require("ajv")
const ajv = new Ajv({allErrors: true, allowUnionTypes:true})
require("ajv-errors")(ajv)

const schemaEditMyAccount = {
    type: "object",
    properties: {
        
    }
}