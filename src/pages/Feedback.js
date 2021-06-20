import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/game/Header';
import style from './feedback.module.css';

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
    const state = localStorage.getItem('state');
    const a = JSON.parse(state);
    const { player: { score, assertions } } = a;
    return (
      <div data-testid="feedback-text">
        <Header />
        <section className={ style.feedback_container }>
          <p data-testid="feedback-text" className={ style.text }>{ this.mensage() }</p>
          <p className={ style.text }>
            Placar final:
            <span
              data-testid="feedback-total-score"
              className={ style.text }
            >
              { score }
            </span>
          </p>
          <p className={ style.text }>
            Acertos:
            <span
              data-testid="feedback-total-question"
              className={ style.text }
            >
              { assertions }
            </span>
          </p>
          <section className={ style.feedback_buttons_container }>
            <button
              className={ style.feedback_buttons }
              data-testid="btn-play-again"
              type="button"
              onClick={ this.redirectToLogin }
            >
              Jogar novamente
            </button>
            <button
              className={ style.feedback_buttons }
              data-testid="btn-ranking"
              type="button"
              onClick={ this.redirectToRanking }
            >
              Ver Ranking
            </button>
          </section>
        </section>
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
