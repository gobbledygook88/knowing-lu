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
    this.cancelReset = this.cancelReset.bind(this);
    this.confirmReset = this.confirmReset.bind(this);
    this.reset = this.reset.bind(this);
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

  cancelReset(e) {
    e.preventDefault();
    this.setState({
      confirmReset: false,
    });
  }

  confirmReset(e) {
    e.preventDefault();
    this.setState({
      confirmReset: true,
    })
  }

  reset(e) {
    e.preventDefault();
    this.props.reset();
    this.cancelReset(e);
  }

  render() {
    const numCorrect = Object.keys(this.props.correct).length;
    const totalStations = Object.keys(this.props.stations).length;

    return (
      <div>
        <div id="play-container">
          <input type="text" placeholder="Enter a station name" value={this.state.current} onChange={this.guess}></input>
          {numCorrect}/{totalStations}
        </div>
        <div id="reset">
          {!this.state.confirmReset ? (
            <a href="" onClick={this.confirmReset}>Reset</a>
          ) : (
            <span>Are you sure? <a href="" onClick={this.reset}>Y</a> / <a href="" onClick={this.cancelReset}>N</a></span>
          )}
        </div>
      </div>
    );
  }
}

export default Play;
