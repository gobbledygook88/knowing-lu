import React, { Component } from 'react';
import './Play.css';

class Play extends Component {
  render() {
    return (
      <div id="play-container">
        <input id="guess" type="text" placeholder="Enter a station name" onChange={this.props.onGuess}></input>
      </div>
    );
  }
}

export default Play;
