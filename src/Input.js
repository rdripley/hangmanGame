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
        guessNames: ["Russell is a doof", "Andrea is awesome", "Tim is sweet"]
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
    //newGame will first clear correctAnswer, guessedCharacters,
    //and displayedWord arrays and will register a loss for that
    //user.
    //Then it will pick a name from the array and put it in the 
    //correctAnswer array. It will also use the correctAnswer array
    //to create the displayedWord array, this will be the empty
    //letters on the screen.

    addGuess(e) {
        //This will take the character, check it against the
        //correct answer. If it is in there, every match
        //will go into the displayedWord array.
        //If it doesn't a new part f the hangman will show.
        if (this._inputElement.value !== "" && this.state.guessedCharacters.includes(this._inputElement.value.toUpperCase()) === false) {
          var newDisplayedWord = []
          newDisplayedWord = this.state.displayedWord.slice()
          var guessedLetter = this._inputElement.value.toUpperCase()
          for(let i = 0; i < this.state.correctAnswer.length; i++) {
            let characterCheck = this.state.correctAnswer[i]
            let characterToUpper = characterCheck !== " " ? characterCheck.toUpperCase() : characterCheck
            if(characterToUpper === guessedLetter) {
              newDisplayedWord[i] = characterCheck
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

    }

    render() {
      const showing = this.state.showInput;
      const canvasStyling = {
        border:'1px solid #000000'
      }
        return (
        <div className="inputListMain">
          <canvas id="myCanvas" width="300" height="300" style={canvasStyling}></canvas>
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