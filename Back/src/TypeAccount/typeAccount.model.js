'use strict'

const moongoose = require("mongoose");

const typeAccountSchema = moongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: [
        "SAVINGS",
        "MONETARY",
        "CHILDREN",
        "STUDENT",
        "BUSINESS",
        "DEFAULT",
      ],
    },
  },
  {
    versionKey: false,
  }
);

module.exports = moongoose.model('TypeAccount', typeAccountSchema);