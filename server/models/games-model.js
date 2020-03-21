const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Game = new Schema(
  {
    Answer: { type: String, required: true },
    //UserId: { type: [String], required: true },
    Win: { type: Number, default: 0 },
    Loss: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("games", Game);
