const express = require("express");
const Model = require("../models/chaucay");
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const data = await Model.findOne({ 'payload_utf8.MAC': req.params.id }).sort({ arrival_timestamp: -1 });
    if (data) {
      const updatedTimestamp = new Date(data.arrival_timestamp.getTime() + 7 * 60 * 60 * 1000);
      const formattedData = {
          MAC: data.payload_utf8.MAC,
          Soil: data.payload_utf8.Soil,
          Water: data.payload_utf8.Water,
          Temperature: data.payload_utf8.Temperature,
          Humidity: data.payload_utf8.Humidity,
          arrival_timestamp: updatedTimestamp.toISOString()
      };
      res.status(200).json(formattedData);
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

module.exports = router;