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
        showUndoButton: false,
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
              displayedWord[i] = " "
            }
        }

        this.setState({
        correctAnswer: guessedWord,
        displayedWord: displayedWord,
        guessedCharacters: []
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
        if (this._inputElement.value !== "") {
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
          this.setState({
            guessedCharacters: [...this.state.guessedCharacters, guessedLetter],
            displayedWord: newDisplayedWord
          })
          this._inputElement.value = "";
        e.preventDefault();
      }
    }
    
    resetGame() {

    }
    
    render() {
        return (
        <div className="inputListMain">
            <div className="header">
                <form onSubmit={this.addGuess}>
                    <input 
                        placeholder="enter name" 
                        ref={(a) => this._inputElement = a}
                        maxlength="1"
                        pattern="[A-Za-z]{1}"
                    >
                    </input>
                    <button type="submit">add</button>
                </form>
            </div>
            <div>
            <button type="button" onClick={this.newGame}>New Game</button>
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