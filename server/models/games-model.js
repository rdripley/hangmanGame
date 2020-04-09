const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Game = new Schema(
  {
    Answer: { type: String },
    GuessedCharacters: { type: String },
    Win: { type: Number, default: 0 },
    Loss: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("games", Game);
