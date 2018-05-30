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
    let state = event.target.value;
    let guess = Utils.normalise(state);

    // Clear the input if the guess is correct
    if (this.props.onGuess(guess)) {
      state = '';
    }

    this.setState({
      current: state,
    });
  }

  render() {
    const numCorrect = Object.keys(this.props.correct).length;
    const totalStations = Object.keys(this.props.stations).length;

    return (
      <div id="play-container">
        <p>{numCorrect}/{totalStations}</p>
        <input type="text" placeholder="Enter a station name" value={this.state.current} onChange={this.guess}></input>
      </div>
    );
  }
}

export default Play;
