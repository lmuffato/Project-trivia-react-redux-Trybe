import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    return (
      <>
        <Header />
        <h1 data-testid="feedback-text">
          Feedback
        </h1>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Tela Inicial
          </button>
        </Link>
      </>
    );
  }
}

export default Feedback;
