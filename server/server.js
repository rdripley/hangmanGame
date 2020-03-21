const express = require("express");
const favicon = require("express-favicon");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 8080;

const db = require("./db");
const gameRouter = require("./routes/games-router");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// app.use(favicon(__dirname + "../build/favicon.ico"));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "../build")));
app.get("/ping", function(req, res) {
  return res.send("pong");
});

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.use("/api", gameRouter);

app.listen(port);
