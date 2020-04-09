const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("useNewUrlParser", true);

mongoose.set("useUnifiedTopology", true);

mongoose.connect(process.env.MONGODB_URI).catch(e => {
  console.error("Connection error", e.message);
});

const db = mongoose.connection;

module.exports = db;
