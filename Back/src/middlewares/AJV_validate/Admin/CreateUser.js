const Ajv = require("ajv")
const ajv = new Ajv({allErrors: true, allowUnionTypes:true})
require("ajv-errors")(ajv)

const schemaCreateUser = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 3,
      maxLength: 50,
      pattern: "^[a-zA-Z ]+$",
      errorMessage: {
        type: "Name must be a string",
        minLength: "Name must be at least 1 character long",
        maxLength: "Name must be at most 50 characters long",
        pattern: "Name must only contain letters",
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
    NoIdentification: {
      type: ["string", "number"],
      minLength: 13,
      maxLength: 13,
      pattern: "^[0-9]+$",
      errorMessage: {
        type: "NoIdentification must be a string or number",
        minLength: "NoIdentification must be at least 13 characters long",
        maxLength: "NoIdentification must be at most 13 characters long",
        pattern: "NoIdentification must only contain numbers",
      },
    },
    birthdate: {
      type: "string",
      pattern: "^\\d{4}-\\d{2}-\\d{2}$",
      errorMessage: {
        type: "El campo fecha_inicial debe ser de tipo string",
        pattern: "El campo fecha_inicial debe tener el formato YYYY-MM-DD",
      },
    },
    address: {
      type: "string",
      minLength: 3,
      maxLength: 50,
      errorMessage: {
        type: "Address must be a string",
        minLength: "Address must be at least 3 characters long",
        maxLength: "Address must be at most 50 characters long",
      },
    },
    phone: {
      type: "number",
      minimum: 10000000,
      maximum: 99999999,
      errorMessage: {
        type: "Phone must be a number",
        minimum: "Phone must be 8 digits long",
        maximum: "Phone must be 8 digits long",
      },
    },
    email: {
      type: "string",
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
      errorMessage: {
        type: "Email must be a string",
        pattern: "Email must be in the format: example@example.com",
      },
    },
    password: {
      type: "string",
      minLength: 8,
      maxLength: 50,
      errorMessage: {
        type: "Password must be a string",
        minLength: "Password must be at least 8 characters long",
        maxLength: "Password must be at most 50 characters long",
      },
    },
    ocupation: {
      type: "string",
      minLength: 3,
      maxLength: 50,
      errorMessage: {
        type: "Ocupation must be a string",
        minLength: "Ocupation must be at least 3 characters long",
        maxLength: "Ocupation must be at most 50 characters long",
      },
    },
    nameWorkPlace: {
      type: "string",
      minLength: 3,
      maxLength: 50,
      errorMessage: {
        type: "NameWorkPlace must be a string",
        minLength: "NameWorkPlace must be at least 3 characters long",
        maxLength: "NameWorkPlace must be at most 50 characters long",
      },
    },
    incomings: {
      type: "number",
      minimum: 100,
      errorMessage: {
        type: "Incomings must be a number",
        minimum: "Incomings must be at least 100",
      },
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
      minimum: 100,
      errorMessage: {
          type: 'Balance must be a number',
          minimum: 'Balance must be at least 100'
      }
    }
    // image: {
    //   type: "string",
    //   errorMessage: {
    //     type: "Image must be a string",
    //   },
    // },
  },
  required: [
    "name",
    "username",
    "NoIdentification",
    "birthdate",
    "address",
    "phone",
    "email",
    "password",
    "ocupation",
    "nameWorkPlace",
    "incomings",
    "accountType",
    "balance"
  ],
  errorMessage: {
    required: {
      name: "Name is required",
      username: "Username is required",
      NoIdentification: "NoIdentification is required",
      birthdate: "Birthdate is required",
      address: "Address is required",
      phone: "Phone is required",
      email: "Email is required",
      password: "Password is required",
      ocupation: "Ocupation is required",
      nameWorkPlace: "NameWorkPlace is required",
      incomings: "Incomings is required",
      accountType: "AccountType is required",
      balance: "Balance is required"
    },
  },
  additionalProperties: false,
};

module.exports = schemaCreateUser