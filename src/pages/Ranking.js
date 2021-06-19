import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { resetQuestionReducer } from '../actions/manageQuestions';
import { resetGameReducer, resetPlayerReducer } from '../actions';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
    this.getRanking = this.getRanking.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  componentDidMount() {
    this.getRanking();
  }

  getRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const ONE = 1;
    const ONE_NEGATIVE = -1;
    const ZERO = 0;
    if (ranking !== null) {
      const rankingOrdered = ranking.sort((a, b) => {
        if (a.score > b.score) return ONE_NEGATIVE;
        if (a.score < b.score) return ONE;
        return ZERO;
      });
      this.setState({
        ranking: rankingOrdered,
      });
    }
  }

  resetState() {
    const { resetQuestion, resetPlayer, resetGame } = this.props;
    resetGame();
    resetPlayer();
    resetQuestion();
  }

  render() {
    const { ranking } = this.state;
    console.log(ranking);
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol>
          { ranking.map((player, index) => (
            <li key={ `${player.name}-${index}` }>
              <img src={ player.picture } alt="imagem do jogador" />
              <p>
                Nome:
                <span data-testid={ `player-name-${index}` }>{ player.name }</span>
              </p>
              <p>
                Pontuação:
                <span data-testid={ `player-score${index}` }>{ player.score }</span>
              </p>
            </li>
          )) }
        </ol>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ this.resetState }
          >
            Voltar ao Inicio
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetQuestion: () => dispatch(resetQuestionReducer()),
  resetPlayer: () => dispatch(resetPlayerReducer()),
  resetGame: () => dispatch(resetGameReducer()),
});

Ranking.propTypes = {
  resetQuestion: PropTypes.func,
  resetPlayer: PropTypes.func,
  resetGame: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Ranking);
