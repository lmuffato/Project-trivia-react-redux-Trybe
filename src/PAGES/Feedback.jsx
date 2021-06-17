import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const LocalStorage = JSON.parse(localStorage.getItem('state'));
    const { score, assertions } = LocalStorage.player;
    let message = '';
    const number3 = 3;
    if (assertions < number3) {
      message = 'Podia ser melhor...';
    } else {
      message = 'Mandou bem!';
    }

    return (
      <div>
        <Header score={ score } />
        <p data-testid="feedback-text">{ message }</p>
        <div>
          <p>Placar final</p>
          <p>Total de pontos: $</p>
          <p data-testid="feedback-total-score">{score}</p>
          <p>Total de acertos:</p>
          <p data-testid="feedback-total-question">{assertions}</p>
        </div>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
        <Link to="/Ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

export default Feedback;
