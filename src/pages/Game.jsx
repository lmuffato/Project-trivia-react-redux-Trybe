import React, { Component } from 'react';
import Header from '../components/Header';
import GameManager from '../components/GameManager';

class Game extends Component {
  render() {
    const { history: { push } } = this.props;
    return (
      <div>
        Game
        <Header />
        <GameManager redirect={ push } />
      </div>
    );
  }
}

export default Game;
