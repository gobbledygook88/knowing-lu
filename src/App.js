import React, { Component } from 'react';
import Gameboard from './Gameboard.js';
import Instructions from './Instructions.js';
import modes from './modes.json';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMode: modes.quiz,  // Default mode
    };
  }

  render() {
    return (
      <div>
        <Instructions></Instructions>
        <Gameboard mode={this.state.currentMode}></Gameboard>
      </div>
    );
  }
}

export default App;
