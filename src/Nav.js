import React, { Component } from 'react';
import './Nav.css';

class Nav extends Component {
  render() {
    const changeMode = this.props.changeMode;

    return (
      <div className="nav">
        <div className="mode">
          Mode
          <select onChange={e => changeMode(e.target.value)}>
            <option value="track">Track</option>
            <option value="quiz">Quiz</option>
          </select>
        </div>
      </div>
    );
  }
}

export default Nav;
