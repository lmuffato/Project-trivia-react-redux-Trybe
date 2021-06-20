import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/game/Header';
import styles from './feedback.module.css';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.mensage = this.mensage.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);
    this.redirectToRanking = this.redirectToRanking.bind(this);
  }

  mensage() {
    const state = localStorage.getItem('state');
    const a = JSON.parse(state);
    const { player: { assertions } } = a;
    const ThreeCorrectAnswer = 3;
    let mensage;
    if (assertions < ThreeCorrectAnswer) {
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
    history.push('/ranking');
  }

  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { player: { score, assertions } } = state;
    return (
      <main>
        <Header />
        <div className={ styles.feedback_container }>
          <p
            data-testid="feedback-text"
            className={ styles.feedback__message }
          >
            { this.mensage() }
          </p>
          <p>
            Placar final:
            {' '}
            <span
              data-testid="feedback-total-score"
              className={ styles.feedback__score }
            >
              { score }
            </span>
          </p>
          <p>
            Acertos:
            {' '}
            <span data-testid="feedback-total-question">{ assertions }</span>
          </p>
        </div>
        <div className={ styles.feedback__buttons }>
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
      </main>
    );
  }
}

export default Feedback;

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
