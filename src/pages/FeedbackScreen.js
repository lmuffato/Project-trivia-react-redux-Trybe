import React from 'react';
import { Link } from 'react-router-dom';

class FeedbackScreen extends React.Component {
  render() {
    return (
      <div>
        <p>Feedback Screen</p>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
        <Link to="/rankingscreen">
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

export default FeedbackScreen;
