import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { score } = state.player;
    // console.log(score);
    return (
      <div>
        <Header score={ score } />
        <h1 data-testid="feedback-text">FEEDBACK</h1>
        <h2 data-testid="feedback-total-score">{score}</h2>
        <h2 data-testid="feedback-total-question"> Questões corretas </h2>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Jogar novemente</button>
        </Link>
        <Link to="/ranking">
          <button type="button" data-testid="ranking-title">Ranking</button>
        </Link>
      </div>
    );
  }
}

export default Feedback;
