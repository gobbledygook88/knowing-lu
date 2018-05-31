import React, { Component } from 'react';
import modes from './modes.json';
import './Instructions.css';

class Instructions extends Component {
  render() {
    const changeMode = this.props.changeMode;

    return (
      <div id="instructions">
        <h1>Knowing LU</h1>
        <p>A simple name-the-station game.</p>
        <p>
          This website was inspired by Geoff Marshall&#8217;s <a href="https://www.youtube.com/watch?v=qJc9IDT-kqQ">YouTube video</a> where
          he challanges viewers to track which London Underground
          stations they visit each year. Part of the fun is ticking off visited
          stations on an actual tube map, but here&#8217;s a digital version
          nonetheless!
        </p>
        <p>
          Do watch the video first as there are a few challange variants
          to choose from.
        </p>
        <p>
          In <a href="https://www.youtube.com/watch?v=sGuetKsW5Ek">another video</a>,
          Geoff attempts to fill in a blank tube map!
        </p>
        <p>
          Hence, there are currently two modes available:
        </p>
        <div className="modes">
          <div>
            <button onClick={() => changeMode(modes.track)}>Track</button>
            <p>Enter the names of the stations you have entered or exited.</p>
          </div>
          <div>
            <button onClick={() => changeMode(modes.quiz)}>Quiz</button>
            <p>Challange yourself and see how many stations you can name.</p>
          </div>
        </div>
        <p>
          Data is stored locally on your browser. Choose a mode to get started. You can switch between modes at any time.
        </p>
      </div>
    );
  }
}

export default Instructions;
