import React, { Component } from 'react';

class Guess extends Component {
    // constructor(props) {
    //     super(props);

    //     this.displayWord = this.displayWord.bind(this);
    // }
    // displayWord(displayedWord) {
    //     var toString = displayedWord.value.toString();
    //     toString = toString.replace(",", "");
    //     return <p>{toString}</p>
    // }
    
    render() {
        var characters = this.props.entries.toString();
        var word = characters.replace(/,/g, " ");

        // var word = characters.map(this.displayWord);
        return (
            <div>
                {word} 
            </div>
        );
    }
};

export default Guess;