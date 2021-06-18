import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const { ranking } = this.props;
    return (
      <div>
        <p data-testid="feedback-text">FeedBack text to be put on here</p>
        <h2 data-testid="ranking-title">Ranking</h2>
        <ul>
          {ranking
            .sort((a, b) => b.score - a.score)
            .map(({ name, score, gravatar }, index) => (
              <li key={ index }>
                <img src={ gravatar } alt="imagem do jogador" />
                <span data-testid={ `player-name-${index}` }>{name}</span>
                <span data-testid={ `player-score-${index}` }>{score}</span>
              </li>
            ))}
        </ul>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Voltar para o inicio
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ranking: state.ranking,
});

Ranking.propTypes = {
  points: PropTypes.number,
  gravatar: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Ranking);
