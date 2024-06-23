const Ajv = require("ajv");
const ajv = new Ajv({allErrors: true, allowUnionTypes:true})
require("ajv-errors")(ajv)

const schemaEditUser = {
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
  },
  required: [
    "name",
    "username",
    "birthdate",
    "address",
    "phone",
    "email",
    "ocupation",
    "nameWorkPlace",
    "incomings",
  ],
  errorMessage: {
    required: {
      name: "Name is required",
      username: "Username is required",
      birthdate: "Birthdate is required",
      address: "Address is required",
      phone: "Phone is required",
      email: "Email is required",
      ocupation: "Ocupation is required",
      nameWorkPlace: "NameWorkPlace is required",
      incomings: "Incomings is required",
    },
  },
  additionalProperties: false
};

module.exports = schemaEditUser;