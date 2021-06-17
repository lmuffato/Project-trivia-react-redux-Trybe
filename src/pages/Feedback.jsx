import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getItemFromLocalStorage } from '../services/storage';

class Feedback extends Component {
  render() {
    const { player } = getItemFromLocalStorage('state');
    const { assertions, score } = player;
    const minCorrect = 3;
    return (
      <div>
        <h2>Feedback</h2>
        <Header />
        <p
          data-testid="feedback-text"
        >
          {assertions >= minCorrect ? 'Mandou bem!' : 'Podia ser melhor...' }
        </p>
        <p>
          Você acertou
          <spam> </spam>
          <spam data-testid="feedback-total-question">{ assertions }</spam>
          <spam> </spam>
          perguntas.
        </p>
        <p>
          E somou
          <spam> </spam>
          <spam data-testid="feedback-total-score">{ score }</spam>
          <spam> </spam>
          pontos
        </p>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Jogar novamente</button>
        </Link>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">Ver ranking</button>
        </Link>
      </div>
    );
  }
}

export default Feedback;
