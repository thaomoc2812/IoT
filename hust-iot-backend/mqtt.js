var mqtt = require('mqtt');
const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  console.log("MQTT connected");
})

module.exports = client;
// client.on("connect", () => {
//   client.subscribe("presence", (err) => {
//     if (!err) {
//       client.publish("presence", "Hello mqtt");
//     }
//   });
// });

// client.on("message", (topic, message) => {
//   // message is Buffer
//   console.log(message.toString());
//   client.end();
// });