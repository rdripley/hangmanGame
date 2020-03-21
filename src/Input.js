import React, { Component } from "react";
import Guess from "./Guess";
import "./Input.css";
import api from "./Api.js";
import CreateGame from "./createGame.js";

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      correctAnswer: "",
      guessedCharacters: [],
      displayedWord: [],
      showInput: false,
      numberOfWrongAnswers: 0,
      id: null
    };

    this.addGuess = this.addGuess.bind(this);
    // this.newGame = this.newGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.createGameData = this.createGameData.bind(this);
  }
  createGameData = childDataArray => {
    this.setState({
      correctAnswer: childDataArray[0],
      displayedWord: childDataArray[1],
      showInput: childDataArray[2],
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
      console.log(this.state.correctAnswer);
      var arraysMatch = function() {
        for (let i = 0; i < newDisplayedWord.length; i++) {
          if (newDisplayedWord[i] !== checkDisplayedWord[i]) {
            return false;
          }
        }
        return true;
      };
      this.setState({
        guessedCharacters: [...this.state.guessedCharacters, guessedLetter],
        displayedWord: newDisplayedWord
      });
      this.handleUpdateGame("Guess");
      // console.log(arraysMatch(newDisplayedWord, checkDisplayedWord));
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
    this.handleUpdateGame(gameState);
    this.setState({
      showInput: false
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

    this.setState({
      correctAnswer: this.state.guessedWord,
      displayedWord: displayedWord,
      guessedCharacters: [],
      showInput: true,
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
        ctx.stroke();
        break;
      case 2:
        ctx.moveTo(10, 0);
        ctx.lineTo(10, 600);
        ctx.stroke();
        break;
      case 3:
        ctx.moveTo(0, 5);
        ctx.lineTo(70, 5);
        ctx.stroke();
        break;
      case 4:
        ctx.moveTo(60, 5);
        ctx.lineTo(60, 15);
        ctx.stroke();
        break;
      case 5:
        ctx.beginPath();
        ctx.arc(60, 25, 10, 0, Math.PI * 2, true);
        ctx.stroke();
        break;
      case 6:
        ctx.moveTo(60, 36);
        ctx.lineTo(60, 70);
        ctx.stroke();
        break;
      case 7:
        ctx.moveTo(60, 46);
        ctx.lineTo(100, 50);
        ctx.stroke();
        break;
      case 8:
        ctx.moveTo(60, 46);
        ctx.lineTo(20, 50);
        ctx.stroke();
        break;
      case 9:
        ctx.moveTo(60, 70);
        ctx.lineTo(100, 100);
        ctx.stroke();
        break;
      case 10:
        ctx.moveTo(60, 70);
        ctx.lineTo(20, 100);
        ctx.stroke();
        break;
      default:
        break;
    }
    this.setState({
      numberOfWrongAnswers: addToWrongAnswers
    });
    if (addToWrongAnswers === 10) {
      this.GameOver("Loss");
    }
  }

  handleUpdateGame = async calledFrom => {
    const { id, correctAnswer } = this.state;
    let payload = {};
    if (calledFrom === "Guess") {
      payload = {
        Answer: correctAnswer,
        Win: 0,
        Loss: 0
      };
    } else if (calledFrom === "Win") {
      payload = {
        Answer: correctAnswer,
        Win: 1,
        Loss: 0
      };
    } else if (calledFrom === "Loss") {
      payload = {
        Answer: correctAnswer,
        Win: 0,
        Loss: 1
      };
    }

    console.log(payload, id);
    await api.updateGameById(id, payload).then(res => {
      window.alert(`Game updated successfully`);
    });
  };

  render() {
    const showing = this.state.showInput;
    const canvasStyling = {
      border: "1px solid #000000"
    };
    return (
      <div className='inputListMain'>
        <canvas
          id='myCanvas'
          width='300'
          height='150'
          style={canvasStyling}
        ></canvas>
        <div className='header'>
          {showing ? (
            <form onSubmit={this.addGuess}>
              <input
                placeholder='Guess a Letter'
                ref={a => (this._inputElement = a)}
                maxlength='1'
                pattern='[A-Za-z]{1}'
              ></input>
              <button type='submit'>add</button>
            </form>
          ) : null}
        </div>
        <div>
          <CreateGame getDataFromChild={this.createGameData} />
          <button type='button' onClick={this.resetGame}>
            Reset Game
          </button>
        </div>
        <div>
          <p>{this.state.guessedCharacters}</p>
        </div>
        <Guess entries={this.state.displayedWord} />
      </div>
    );
  }
}

export default Input;
