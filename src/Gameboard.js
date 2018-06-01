import React, { Component } from 'react';
import Tubemap from './Tubemap.js';
import Play from './Play.js';
import Utils from './Utils.js';
import './Gameboard.css';

class Gameboard extends Component {
  constructor(props) {
    super(props);

    let key = Gameboard.createKey(props.mode);

    this.state = {
      key: key,
      stations: {},
      correct: Gameboard.getCorrectStations(key),
      latest: null,
    };

    this.checkCorrect = this.checkCorrect.bind(this);
    this.updateStations = this.updateStations.bind(this);
    this.resetBoard = this.resetBoard.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    let key = Gameboard.createKey(props.mode);

    if (state.key !== key) {
      let correct = Gameboard.getCorrectStations(key);

      Gameboard.refreshBoard(state.stations, correct);

      return {
        key: key,
        correct: correct,
      }
    }

    return null;
  }

  static createKey(mode) {
    return !!mode ? `knowing-lu-${mode}` : null;
  }

  static getCorrectStations(key) {
    let lsValue = JSON.parse(localStorage.getItem(key));
    return lsValue ? Utils.arrayToObjKeys(lsValue, true) : {}
  }

  static refreshBoard(stations, correct) {
    // Hide all stations
    Object.values(stations).forEach(
      arr => arr.forEach(
        el => el.setAttribute("display", "none")
      )
    );

    // Show all correct stations
    Object.keys(correct).forEach(
      s => stations[s].forEach(
        el => el.setAttribute("display", "visible")
      )
    );
  }

  updateStations(stations) {
    this.setState({
      stations: stations
    });
  }

  updateCorrect(correct) {
    this.setState({
      correct: correct
    })
  }

  resetBoard() {
    this.updateCorrect({});
    Gameboard.refreshBoard(this.state.stations, this.state.correct);
    localStorage.removeItem(this.state.key);
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
      localStorage.setItem(this.state.key, JSON.stringify(Utils.objKeysToArray(correct)));

      return true;
    }
  }

  render() {
    const stations = this.state.stations;
    const correct = this.state.correct;

    return (
      <div>
        <Tubemap stations={stations} correct={correct} latest={this.state.latest} updateStations={this.updateStations}></Tubemap>
        {this.state.key &&
          <Play stations={stations} correct={correct} onGuess={this.checkCorrect} reset={this.resetBoard}></Play>
        }
      </div>
    );
  }
}

export default Gameboard;
