const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  id: {
    required: true,
    type: Number
  },
  name: {
    required: true,
    type: String
  },
  value: {
    required: true,
    type: Number
  },
  receiveTime: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Data', schema);