import React from 'react';
import PropTypes from 'prop-types';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.mensage = this.mensage.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);
    this.redirectToRanking = this.redirectToRanking.bind(this);
  }

  mensage() {
    const result = localStorage.state.player.assertions;
    const ThreeCorrectAnswer = 3;
    let mensage;
    if (result < ThreeCorrectAnswer) {
      mensage = 'Podia ser melhor...';
    } else {
      mensage = 'Mandou bem!';
    }
    return mensage;
  }

  redirectToLogin() {
    const { history } = this.props;
    history.push('/');
  }

  redirectToRanking() {
    const { history } = this.props;
    history.push('/Ranking');
  }

  render() {
    const { score, assertions } = localStorage.state.player;
    return (
      <div>
        <p data-testid="feedback-text">{ this.mensage() }</p>
        <p data-testid="feedback-total-score">
          Placar final:
          { score }
        </p>
        <p data-testid="feedback-total-question">
          Acerto:
          { assertions }
        </p>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.redirectToLogin }
        >
          Jogar novamente
        </button>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ this.redirectToRanking }
        >
          Ver Ranking
        </button>
      </div>
    );
  }
}

export default Feedback;

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
