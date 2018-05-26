import React, { Component } from 'react';
import Tubemap from './Tubemap.js';
import Play from './Play.js';
import Utils from './Utils.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stations: {},
      correct: {},
    };

    this.checkCorrect = this.checkCorrect.bind(this);
  }

  checkCorrect(event) {
    const guess = Utils.normalise(event.target.value);
    const stations = Object.assign({}, this.state.stations);
    const correct = Object.assign({}, this.state.correct);

    if(correct[guess]) {
      console.log('Already guessed');
    }

    if(stations[guess]) {
      // Display the station labels
      stations[guess].forEach(el => el.setAttribute("display", "visible"));

      // Remove DOM references
      delete stations[guess];

      // Add to correct guesses
      correct[guess] = true;  // TODO copy lines and zones
      this.setState({
        stations: stations,
        correct: correct,
      });
    }
  }

  render() {
    const stations = this.state.stations;
    const correct = this.state.correct;

    return (
      <div>
        <Tubemap stations={stations} correct={correct}></Tubemap>
        <Play onGuess={this.checkCorrect}></Play>
      </div>
    );
  }
}

export default App;
