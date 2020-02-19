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
        displayedWord: displayedWord
        });
        
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
        //If it doesn't a new part of the hangman will show.
        // if (this._inputElement.value !== "") {
        //   var newGuess = {
        //     text: this._inputElement.value,
        //   }
        //   this.setState((prevState) => {
        //     return {
        //       names: prevState.names.concat(newGuess)
        //     };
        //   });
        //   this._inputElement.value = "";
        // }
        // e.preventDefault();
        alert(this._inputElement.value);
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
            {/* <Guess 
                entries={this.state.displayedWord} 
            /> */}
        </div>
        );
    }
}

export default Input;