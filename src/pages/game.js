import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Questions from '../components/Questions';
import Header from '../components/Header';

class Game extends Component {
  constructor() {
    super();
    this.updateScore = this.updateScore.bind(this);
    this.state = {
      score: 0,
    };
  }

  updateScore(newScore) {
    const { score } = this.state;
    this.setState({ score: score + newScore });
  }

  render() {
    const { score } = this.state;
    const { history } = this.props;

    return (
      <div>
        <Header score={ score } />
        <Questions history={ history } updateScore={ this.updateScore } />
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Game;
