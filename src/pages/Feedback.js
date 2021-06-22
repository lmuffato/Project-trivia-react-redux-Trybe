import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    return (
      <div>
        <p data-testid="feedback-text">Feedback</p>
        <Header />
        <Link to="/" data-testid="btn-play-again">
          Jogar novamente
        </Link>
      </div>
    );
  }
}

export default Feedback;
