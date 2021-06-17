import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FeedbackHeader from '../components/FeedbackHeader';
import FeedbackMsg from '../components/FeedbackMsg';
import feedbackResult from '../components/feedbackResult';

export class Feedback extends Component {
  render() {
    return (
      <div>
        <FeedbackHeader />
        <FeedbackMsg />
        <feedbackResult />
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
    )
  }
}

export default Feedback;
