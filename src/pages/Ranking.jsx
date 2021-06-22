import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/ranking.css';

class Ranking extends Component {
  render() {
    const { ranking, history } = this.props;
    return (
      <main className="ranking-container">
        <h2 data-testid="ranking-title" className="ranking-title">Ranking</h2>
        <ul className="items-ranking-container">
          {ranking
            .sort((a, b) => b.score - a.score)
            .map(({ name, score, gravatar }, index) => (
              <li key={ index } className="ranking-item">
                <img src={ gravatar } alt="imagem do jogador" className="avatar-image" />
                <span data-testid={ `player-name-${index}` }>{name}</span>
                <span data-testid={ `player-score-${index}` }>{score}</span>
              </li>
            ))}
        </ul>
        <button
          type="button"
          data-testid="btn-go-home"
          className="button-play-again"
          onClick={ () => history.push('/') }
        >
          Voltar para o inicio
        </button>

      </main>
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
