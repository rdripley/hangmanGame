import React, { Component } from "react";
import Guess from "./Guess";
import "./Input.css";
import api from "./Api.js";
import CreateGame from "./createGame.js";
import GamesTable from "./gamesTable.js";

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      correctAnswer: "",
      guessedCharacters: [],
      displayedWord: [],
      showHideFormatting: false,
      numberOfWrongAnswers: 0,
      id: null,
      games: [],
      isLoading: false
    };

    this.addGuess = this.addGuess.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.createGameData = this.createGameData.bind(this);
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });

    await api.getAllGames().then(games => {
      this.setState({
        games: games.data.data,
        isLoading: false
      });
    });
  };

  createGameData = childDataArray => {
    this.setState({
      correctAnswer: childDataArray[0],
      displayedWord: childDataArray[1],
      showHideFormatting: childDataArray[2],
      id: childDataArray[3],
      guessedCharacters: childDataArray[4]
    });
  };

  addGuess(e) {
    if (
      this._inputElement.value !== "" &&
      this.state.guessedCharacters.includes(
        this._inputElement.value.toUpperCase()
      ) === false
    ) {
      var newDisplayedWord = [];
      newDisplayedWord = this.state.displayedWord.slice();
      var checkDisplayedWord = this.state.displayedWord.slice();
      var guessedLetter = this._inputElement.value.toUpperCase();
      var guessedCharactersDB = this.state.guessedCharacters + guessedLetter;
      for (let i = 0; i < this.state.correctAnswer.length; i++) {
        let characterCheck = this.state.correctAnswer[i];
        let characterToUpper =
          characterCheck !== " "
            ? characterCheck.toUpperCase()
            : characterCheck;
        if (characterToUpper === guessedLetter) {
          newDisplayedWord[i] = characterCheck;
        }
      }
      var arraysMatch = function() {
        for (let i = 0; i < newDisplayedWord.length; i++) {
          if (newDisplayedWord[i] !== checkDisplayedWord[i]) {
            return false;
          }
        }
        return true;
      };
      this.setState(prevState => ({
        guessedCharacters: [...this.state.guessedCharacters, guessedLetter],
        displayedWord: newDisplayedWord
      }));
      this.handleUpdateGame("Guess", guessedCharactersDB);
      if (arraysMatch(newDisplayedWord, checkDisplayedWord) === true) {
        this.wrongAnswer();
      }
      if (!newDisplayedWord.includes("_")) {
        this.GameOver("Win");
      }
      this._inputElement.value = "";
      e.preventDefault();
    } else if (this._inputElement.value === "") {
      alert("Please guess a letter!");
      e.preventDefault();
      return false;
    } else {
      alert("Please choose a letter you haven't guessed yet!");
      this._inputElement.value = "";
      e.preventDefault();
      return false;
    }
  }

  GameOver(gameState) {
    this.handleUpdateGame(gameState, "");
    this.setState({
      showHideFormatting: false
    });
  }

  resetGame() {
    var displayedWord = [];
    var char = "";
    var resetGuessedWord = [];
    resetGuessedWord = this.state.correctAnswer.slice();
    for (var i = 0; i < resetGuessedWord.length; i++) {
      char = resetGuessedWord[i];
      if (char.match(/[a-z]/i)) {
        displayedWord[i] = "_";
      } else {
        displayedWord[i] = "-";
      }
    }
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    this.handleUpdateGame("Reset", "");
    this.setState({
      correctAnswer: resetGuessedWord,
      displayedWord: displayedWord,
      guessedCharacters: [],
      showHideFormatting: true,
      numberOfWrongAnswers: 0
    });
  }

  wrongAnswer() {
    var addToWrongAnswers = this.state.numberOfWrongAnswers;
    addToWrongAnswers++;
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    switch (addToWrongAnswers) {
      case 1:
        ctx.moveTo(0, 150);
        ctx.lineTo(150, 150);
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 5;
        ctx.stroke();
        break;
      case 2:
        ctx.moveTo(10, 0);
        ctx.lineTo(10, 600);
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 5;
        ctx.stroke();
        break;
      case 3:
        ctx.moveTo(0, 5);
        ctx.lineTo(70, 5);
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 5;
        ctx.stroke();
        break;
      case 4:
        ctx.moveTo(60, 5);
        ctx.lineTo(60, 15);
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 5;
        ctx.stroke();
        break;
      case 5:
        ctx.beginPath();
        ctx.arc(60, 25, 10, 0, Math.PI * 2, true);
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 5;
        ctx.stroke();
        break;
      case 6:
        ctx.moveTo(60, 36);
        ctx.lineTo(60, 70);
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 5;
        ctx.stroke();
        break;
      case 7:
        ctx.moveTo(60, 46);
        ctx.lineTo(100, 50);
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 5;
        ctx.stroke();
        break;
      case 8:
        ctx.moveTo(60, 46);
        ctx.lineTo(20, 50);
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 5;
        ctx.stroke();
        break;
      case 9:
        ctx.moveTo(60, 70);
        ctx.lineTo(100, 100);
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 5;
        ctx.stroke();
        break;
      case 10:
        ctx.moveTo(60, 70);
        ctx.lineTo(20, 100);
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 5;
        ctx.stroke();
        break;
      default:
        break;
    }
    this.setState(prevState => ({
      numberOfWrongAnswers: addToWrongAnswers
    }));
    if (addToWrongAnswers === 10) {
      this.GameOver("Loss");
    }
  }

  handleUpdateGame = async (calledFrom, guessedCharactersDB) => {
    const { id, correctAnswer } = this.state;
    let payload = {};
    let guessedCharacters = guessedCharactersDB;
    if (calledFrom === "Guess") {
      payload = {
        GuessedCharacters: guessedCharacters
      };
    } else if (calledFrom === "Reset") {
      payload = {
        Answer: correctAnswer,
        Win: 0,
        Loss: 0,
        GuessedCharacters: ""
      };
    } else if (calledFrom === "Win") {
      payload = {
        Win: 1,
        Loss: 0
      };
    } else if (calledFrom === "Loss") {
      payload = {
        Win: 0,
        Loss: 1
      };
    }

    await api.updateGameById(id, payload).then(res => {});
    if (calledFrom === "Win" || calledFrom === "Loss") {
      this.componentDidMount();
    }
  };

  render() {
    const showingInputReset = this.state.showHideFormatting;
    const showingNewGame =
      this.state.showHideFormatting === true ? false : true;
    const canvasStyling = {
      border: "1px solid #FFFFFF"
    };
    const Padding = { padding: "0px 50px" };
    return (
      <div className='inputListMain'>
        <div style={Padding}>
          <canvas
            id='myCanvas'
            width='300'
            height='150'
            style={canvasStyling}
          ></canvas>
          <div className='header'>
            {showingInputReset ? (
              <form onSubmit={this.addGuess}>
                <input
                  placeholder='Guess a Letter'
                  ref={a => (this._inputElement = a)}
                  maxlength='1'
                ></input>
                <button type='submit'>add</button>
              </form>
            ) : null}
          </div>
          <div>
            {showingNewGame ? (
              <CreateGame getDataFromChild={this.createGameData} />
            ) : null}
            {showingInputReset ? (
              <button type='button' className='Reset' onClick={this.resetGame}>
                Reset Game
              </button>
            ) : null}
          </div>
        </div>
        <div>
          <p>{this.state.guessedCharacters}</p>
        </div>
        <div className='DisplayedWord'>
          <Guess entries={this.state.displayedWord} />
        </div>
        <div>
          <GamesTable
            games={this.state.games}
            isLoading={this.state.isLoading}
          />
        </div>
      </div>
    );
  }
}

export default Input;
