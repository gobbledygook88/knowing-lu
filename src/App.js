import React, { Component } from 'react';
import Tubemap from './Tubemap.js';
import Play from './Play.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stations: {},
      correct: {},
      latest: null,
    };

    this.checkCorrect = this.checkCorrect.bind(this);
  }

  checkCorrect(guess) {
    const stations = this.state.stations;
    const correct = Object.assign({}, this.state.correct);  // We will be updating this so we make a copy

    if(correct[guess]) {
      console.log('Already guessed');
    }

    if(stations[guess] && !correct[guess]) {
      // Display the station labels
      stations[guess].forEach(el => el.setAttribute("display", "visible"));

      // Add to correct guesses
      correct[guess] = true;  // TODO copy lines and zones
      this.setState({
        correct: correct,
        latest: guess,
      });

      return true;
    }
  }

  render() {
    const stations = this.state.stations;
    const correct = this.state.correct;

    return (
      <div>
        <Tubemap stations={stations} correct={correct} latest={this.state.latest}></Tubemap>
        <Play onGuess={this.checkCorrect}></Play>
      </div>
    );
  }
}

export default App;
