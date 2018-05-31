import React, { Component } from 'react';
import Tubemap from './Tubemap.js';
import Play from './Play.js';
import Utils from './Utils.js';
import './Gameboard.css';

class Gameboard extends Component {
  constructor(props) {
    super(props);

    // this._lsKey = 'knowing-lu-correct';
    this._lsKey = `knowing-lu-${props.currentMode}`;

    let lsValue = JSON.parse(localStorage.getItem(this._lsKey));

    this.state = {
      stations: {},
      correct: lsValue ? Utils.arrayToObjKeys(lsValue, true) : {},
      latest: null,
    };

    this.checkCorrect = this.checkCorrect.bind(this);
    this.updateStations = this.updateStations.bind(this);
  }

  updateStations(stations) {
    this.setState({
      stations: stations
    });
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

      // Save current state to LocalStorage
      localStorage.setItem(this._lsKey, JSON.stringify(Utils.objKeysToArray(correct)));

      return true;
    }
  }

  render() {
    const stations = this.state.stations;
    const correct = this.state.correct;

    return (
      <div>
        <Tubemap stations={stations} correct={correct} latest={this.state.latest} updateStations={this.updateStations}></Tubemap>
        <Play stations={stations} correct={correct} onGuess={this.checkCorrect}></Play>
      </div>
    );
  }
}

export default Gameboard;
