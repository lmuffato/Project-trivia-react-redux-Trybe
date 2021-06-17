import React from 'react';
import { Link } from 'react-router-dom';

class Feedback extends React.Component {
  render() {
    return (
      <>
        <h1 data-testid="feedback-text">
          Feedback
        </h1>
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
