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
        showUndoButton: false
      }
  
      this.addGuess = this.addGuess.bind(this);
      this.newGame = this.newGame.bind(this);
      this.resetGame = this.resetGame.bind(this);
      var guessNames = ["Russell", "Andrea", "Time"];
    }
    newGame() {
        // var filteredNames = this.state.names.filter(function (name) {
        //     return (name.key !== key);
        // });
        // var deletedName = this.state.names.filter(function (name) {
        //     return (name.key === key);
        // });
        // this.setState({
        //     names: filteredNames,
        //     deletedNames: this.state.deletedNames.concat(deletedName),
        //     showUndoButton: true
        // });
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
        if (this._inputElement.value !== "") {
          var newGuess = {
            text: this._inputElement.value,
          }
          this.setState((prevState) => {
            return {
              names: prevState.names.concat(newGuess)
            };
          });
          this._inputElement.value = "";
        }
        e.preventDefault();
      }
    
    resetGame() {
        this.setState({
            names: this.state.names.concat(this.state.deletedNames),
            deletedNames: [],
            showUndoButton: false

        })
    }
    
    render() {
        const showing = this.state.showUndoButton;
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
                    { showing
                        ? <button 
                            className="delete" 
                            type="submit"
                            onClick={this.resetGame}
                          >Undo</button>
                        : null
                    }
                </form>
            </div>
            <Guess 
                entries={this.state.names} 
                delete={this.newGame}
            />
        </div>
        );
    }
}

export default Input;