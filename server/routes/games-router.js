const express = require("express");

const GameCtrl = require("../controllers/games-ctrl");

const router = express.Router();

router.post("/game", GameCtrl.createGame);
router.put("/game/:id", GameCtrl.updateGame);
router.delete("/game/:id", GameCtrl.deleteGame);
router.get("/game/:id", GameCtrl.getGameById);
router.get("/games", GameCtrl.getGames);

module.exports = router;
