import React, { Component } from "react";

class Guess extends Component {
  render() {
    var characters = this.props.entries.toString();
    var word = characters.replace(/,/g, " ");
    return <div>{word}</div>;
  }
}

export default Guess;
