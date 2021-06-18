import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  ResponseFeedback() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { assertions } = state.player;
    let feedback = '';
    const magicNumber = 3;
    if (assertions < magicNumber) {
      feedback = 'Podia ser melhor...';
      return feedback;
    }
    feedback = 'Mandou bem!...';
    return feedback;
  }

  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { score, assertions } = state.player;

    return (
      <div>
        <Header score={ score } />
        <h1>FEEDBACK</h1>
        <h2 data-testid="feedback-total-score">{score}</h2>
        <h2
          data-testid="feedback-total-question"
        >
          {/* Questões corretas: */}
          { assertions }
        </h2>
        <h2 data-testid="feedback-text">{this.ResponseFeedback()}</h2>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Jogar novemente</button>
        </Link>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">Ranking</button>
        </Link>
      </div>
    );
  }
}

export default Feedback;
