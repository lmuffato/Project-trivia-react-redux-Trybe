import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();

    this.handleFeedbackMessage = this.handleFeedbackMessage.bind(this);
  }

  handleFeedbackMessage() {
    const stateLS = JSON.parse(localStorage.getItem('state'));
    const { assertions } = stateLS.player;
    const tres = 3;
    let message = '';
    message = (assertions < tres) ? 'Podia ser melhor...' : 'Mandou bem!';

    return message;
  }

  render() {
    const message = this.handleFeedbackMessage();
    const stateLS = JSON.parse(localStorage.getItem('state'));
    const { assertions, score } = stateLS.player;
    return (
      <>
        <Header />
        <h3 data-testid="feedback-total-score">{score}</h3>
        <h3 data-testid="feedback-total-question">{assertions}</h3>
        <div data-testid="feedback-text">
          {message}
        </div>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => localStorage.clear() }
          >
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">
            Ver Ranking
          </button>
        </Link>
      </>
    );
  }
}

export default Feedback;
