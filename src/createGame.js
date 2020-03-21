import React, { Component } from "react";
import api from "./Api.js";

class CreateGame extends Component {
  constructor(props) {
    super(props);

    this.newGame = this.newGame.bind(this);
  }
  getMovie() {
    return fetch(
      `https://api.themoviedb.org/3/genre/27/movies?api_key=4e55ce60390a48e75c13783cf897f2b8&language=en-US&include_adult=false&sort_by=created_at.asc`
    )
      .then(res => res.json())
      .then(res => res.results.map(result => result.title));
  }
  newGame() {
    Promise.all([this.getMovie()])
      .then(([horror]) => [...horror])
      .then(
        function(title) {
          const randomTitle = title.sort(() => {
            return 0.5 - Math.random();
          });
          var guessedWord = randomTitle[0];
          var displayedWord = [];
          var char = "";
          for (var i = 0; i < guessedWord.length; i++) {
            char = guessedWord[i];
            if (char.match(/[a-z]/i)) {
              displayedWord[i] = "_";
            } else {
              displayedWord[i] = "-";
            }
          }
          var canvas = document.getElementById("myCanvas");
          var ctx = canvas.getContext("2d");
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          var childData = [guessedWord, displayedWord, true];
          this.handleInsertGame(childData);
        }.bind(this)
      );
  }

  handleInsertGame = async childData => {
    const data = { childData };
    const payload = { Answer: data.childData[0] };
    const guessedCharacters = [];
    console.log(payload);
    let id = await api.insertGame(payload).then(res => {
      return res.data.id;
    });
    childData.push(id);
    childData.push(guessedCharacters);
    this.props.getDataFromChild(childData);
  };

  render() {
    return (
      <div>
        <button type='button' onClick={this.newGame}>
          New Game
        </button>
      </div>
    );
  }
}

export default CreateGame;
