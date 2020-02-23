import React, { Component } from 'react';
import Guess from "./Guess";
import "./Input.css";


class Input extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        correctAnswer: [],
        guessedCharacters: [],
        displayedWord: [],
        showInput: false,
        guessNames: ["Russell is a doof", "Andrea is awesome", "Tim is sweet"],
        numberOfWrongAnswers: 0
      }
  
      this.addGuess = this.addGuess.bind(this);
      this.newGame = this.newGame.bind(this);
      this.resetGame = this.resetGame.bind(this); 
    }
    newGame() {
        var guessedWord = this.state.guessNames[Math.floor(Math.random() * this.state.guessNames.length)].split('')
        var displayedWord = []
        var char = ''

        for (var i=0; i < guessedWord.length; i++) {
            char = guessedWord[i]
            if (char.match(/[a-z]/i)) {
              displayedWord[i] = "_"
            } else {
              displayedWord[i] = "-"
            }
        }

        this.setState({
        correctAnswer: guessedWord,
        displayedWord: displayedWord,
        guessedCharacters: [],
        showInput: true
        });
        console.log(guessedWord)
    }

    addGuess(e) {
        if (this._inputElement.value !== "" && this.state.guessedCharacters.includes(this._inputElement.value.toUpperCase()) === false) {
          var newDisplayedWord = []
          newDisplayedWord = this.state.displayedWord.slice()
          var guessedLetter = this._inputElement.value.toUpperCase()
          for(let i = 0; i < this.state.correctAnswer.length; i++) {
            let characterCheck = this.state.correctAnswer[i]
            let characterToUpper = characterCheck !== " " ? characterCheck.toUpperCase() : characterCheck
            if(characterToUpper === guessedLetter) {
              console.log('check');
              newDisplayedWord[i] = characterCheck
              break;
            } else {
              console.log('here');
              this.wrongAnswer();
              break;
            }
          }
          this.GameOver(newDisplayedWord)
          this.setState({
            guessedCharacters: [...this.state.guessedCharacters, guessedLetter],
            displayedWord: newDisplayedWord
          })
          this._inputElement.value = "";
        e.preventDefault();
      } else if (this._inputElement.value === "") {
        alert("Please guess a letter!")
        e.preventDefault();
        return false;
      } else {
        alert("Please choose a letter you haven't guessed yet!")
        this._inputElement.value = "";
        e.preventDefault();
        return false;
      }
    }
    
    GameOver(checkArray) {

      if(!checkArray.includes("_")) {
        this.setState({
          showInput: false
        })
      }
    };

    resetGame() {
      var displayedWord = []
        var char = ''
        var resetGuessedWord = []
        resetGuessedWord = this.state.correctAnswer.slice()
        for (var i=0; i < resetGuessedWord.length; i++) {
            char = resetGuessedWord[i]
            if (char.match(/[a-z]/i)) {
              displayedWord[i] = "_"
            } else {
              displayedWord[i] = "-"
            }
        }

        this.setState({
        correctAnswer: this.state.guessedWord,
        displayedWord: displayedWord,
        guessedCharacters: [],
        showInput: true
        });
    }
    
    wrongAnswer() {
      var addToWrongAnswers = this.state.numberOfWrongAnswers
      addToWrongAnswers++
      console.log(addToWrongAnswers);
      var canvas = document.getElementById("myCanvas");
      var ctx = canvas.getContext("2d");
      switch(addToWrongAnswers) {
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
          ctx.arc(60, 25, 10, 0, Math.PI*2, true);
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
      })
      if(addToWrongAnswers === 10) {
        this.setState({
          showInput: false
        })
      }
    }

    render() {
      const showing = this.state.showInput;
      const canvasStyling = {
        border:'1px solid #000000'
      }
        return (
        <div className="inputListMain">
          <canvas id="myCanvas" width="300" height="150" style={canvasStyling}></canvas>
            <div className="header">
            { showing
                ?
                <form onSubmit={this.addGuess}>
                    <input 
                        placeholder="Guess a Letter" 
                        ref={(a) => this._inputElement = a}
                        maxlength="1"
                        pattern="[A-Za-z]{1}"
                    >
                    </input>
                    <button type="submit">add</button>
                </form>
                : null
            }
            </div>
            <div>
            <button type="button" onClick={this.newGame}>New Game</button>
            <button type="button" onClick={this.resetGame}>Reset Game</button>
            </div>
            <div>
              <p>{this.state.guessedCharacters}</p>
            </div>
            <Guess 
                entries={this.state.displayedWord} 
            />
        </div>
        );
    }
}

export default Input;