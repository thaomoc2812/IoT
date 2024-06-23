const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  packet_id: {
    required: true,
    type: Number
  },
  payload_utf8: {
    MAC: {
      required: true,
      type: String
    },
    Soil: {
      required: true,
      type: Number
    }, 
    Water: {
      required: true,
      type: Number
    }, 
    Temperature: {
      required: true,
      type: Number
    },
    Humidity: {
      required: true,
      type: Number
    }
  },
  arrival_timestamp: {
    type: Date,
    default: Date.now
  }
}, { collection: 'rawmqtt' })

module.exports = mongoose.model('Data', schema);