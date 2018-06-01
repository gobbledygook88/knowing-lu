import React, { Component } from 'react';
import Gameboard from './Gameboard.js';
import Instructions from './Instructions.js';
import Nav from './Nav.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMode: '',
    };

    this.changeMode = this.changeMode.bind(this);
  }

  changeMode(mode) {
    this.setState({
      currentMode: mode,
    })
  }

  render() {
    return (
      <div>
        {!this.state.currentMode ? (
          <Instructions changeMode={this.changeMode}></Instructions>
        ) : (
          <Nav mode={this.state.currentMode} changeMode={this.changeMode}></Nav>
        )}
        <Gameboard mode={this.state.currentMode}></Gameboard>
      </div>
    );
  }
}

export default App;
