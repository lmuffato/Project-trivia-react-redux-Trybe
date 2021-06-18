import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

Game.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),
}.isRequired;

export default Game;
