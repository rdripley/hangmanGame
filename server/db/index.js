const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://sysAdmin:CYBjWSQGW0QFytYK@testcluster-nkd4n.mongodb.net/test/Test_Database/HangmanGame",
    { useNewUrlParser: true }
  )
  .catch(e => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
