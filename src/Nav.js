import React, { Component } from 'react';
import './Nav.css';

class Nav extends Component {
  render() {
    const changeMode = this.props.changeMode;
    const mode = this.props.mode;

    return (
      <div className="nav">
        <div className="mode">
          Mode
          <select value={mode} onChange={e => changeMode(e.target.value)}>
            <option value="track">Track</option>
            <option value="quiz">Quiz</option>
          </select>
        </div>
      </div>
    );
  }
}

export default Nav;
