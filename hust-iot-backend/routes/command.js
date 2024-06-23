const express = require("express");
const router = express.Router();
const client = require("../mqtt");

router.get("/:value", async (req, res) => {
  try {
    const data = '{"limit":' + req.params.value + '}';
    client.publish("output", data);
    res.status(200).send(data + " sent to broker");
  } catch (err) {
    res.status(500).json({ message: "Data not found", error: err });
  }
})

module.exports = router;