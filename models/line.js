const mongoose = require("mongoose") // requiring the mongoose package

const lineSchema = new mongoose.Schema({
  // creating a schema for todo
  Line: {
    // field1: task
    type: String, // task is a string
    unique: true, // it has to be unique
    required: true, // it is required
  },
  Items: {
    // field2: completed
    type: Array, // it is a boolean
    required: true, // it is required
  },
  Type : {
    type: String,
    required: true,
  },
  Start: {
    type: Date,
    required: false,
  },
})

const lineModel = mongoose.model("Line", lineSchema) // creating the model from the schema

module.exports = lineModel // exporting the model
