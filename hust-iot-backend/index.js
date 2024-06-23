const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT;

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;

db.on('error', err => {
  console.log(err);
})

db.once('connected', () => {
  console.log("Connected to database");
})

const app = express();

app.use(cors());
app.use(express.json());

// const userRoutes = require("./routes/user");
// app.use("/api/user", userRoutes);

// const datapackageRoutes = require("./routes/data_package");
// app.use("/api/data_package",datapackageRoutes)

// const CartRoutes = require("./routes/Cart");
// app.use("/api/Cart",CartRoutes)

const CommandRoutes = require("./routes/command");
app.use("/api/command",CommandRoutes)

const ChaucayRoutes = require("./routes/chaucay");
app.use("/api/chaucay",ChaucayRoutes)

app.listen(8000, () => {
  console.log("Listening on port 8000");
})