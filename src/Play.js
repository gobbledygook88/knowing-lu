import React, { Component } from 'react';
import Utils from './Utils.js';
import './Play.css';

class Play extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: '',
    };

    this.guess = this.guess.bind(this);
  }

  guess(event) {
    let guess = Utils.normalise(event.target.value);

    // Clear the input if the guess is correct
    if (this.props.onGuess(guess)) {
      guess = '';
    }

    this.setState({
      current: guess,
    });
  }

  render() {
    return (
      <div id="play-container">
        <input type="text" placeholder="Enter a station name" value={this.state.current} onChange={this.guess}></input>
      </div>
    );
  }
}

export default Play;
