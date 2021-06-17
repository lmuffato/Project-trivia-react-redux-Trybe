import React, { Component } from 'react';
import Questions from '../components/questions';
import Header from '../components/Header';

class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <Questions />
      </div>
    );
  }
}

export default Game;
