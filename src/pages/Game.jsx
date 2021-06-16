import React, { Component } from 'react';
import Header from '../components/Header';
import TriviaGame from '../components/TriviaGame';

class Game extends Component {
  render() {
    return (
      <div>
        Game
        <Header />
        <TriviaGame />
      </div>
    );
  }
}

export default Game;
