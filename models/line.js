const mongoose = require("mongoose") // requiring the mongoose package

const lineSchema = new mongoose.Schema({
  // creating a schema for todo
  Line: {
    // field1: task
    type: String, // task is a string
    unique: true, // it has to be unique
  },
  Items: {
    // field2: completed
    type: Array, // it is a boolean
  },
  Type : {
    type: String,
  },
  Start: {
    type: Date,
  },
})

const lineModel = mongoose.model("Line", lineSchema) // creating the model from the schema

module.exports = lineModel // exporting the model
