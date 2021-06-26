import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Player extends Component {
  render() {
    const { index, name, score, picture } = this.props;
    return (
      <div>
        <span data-testid={ `player-name-${index}` }>{name}</span>
        <span data-testid={ `player-score-${index}` }>{score}</span>
        <img src={ picture } alt="Foto do perfil" />
      </div>
    );
  }
}

Player.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Player;
