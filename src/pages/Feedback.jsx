import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import FeedbackMsg from '../components/FeedbackMsg';
import FeedbackResults from '../components/FeedbackResults';

class Feedback extends Component {
  render() {
    return (
      <div>
        <Header />
        <FeedbackMsg />
        <FeedbackResults />
        <Link
          to="/"
          data-testid="btn-play-again"
        >
          Jogar novamente
        </Link>
        <Link
          to="/ranking"
          data-testid="btn-ranking"
        >
          Ver Ranking
        </Link>
      </div>
    );
  }
}

export default Feedback;
