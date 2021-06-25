import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const THREE = 3;

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      feedback: '',
      scoreTotal: 0,
      assertionsTotal: 0,
    };
    this.setTextFeedBack = this.setTextFeedBack.bind(this);
  }

  componentDidMount() {
    this.setTextFeedBack();
  }

  setTextFeedBack() {
    const state = JSON.parse(localStorage.getItem('state')).player;
    const { assertions, score } = state;
    if (assertions < THREE) {
      this.setState({ feedback: 'Podia ser melhor...' });
    } else if (assertions >= THREE) {
      this.setState({ feedback: 'Mandou bem!' });
    }
    this.setState({ scoreTotal: score, assertionsTotal: assertions });
  }

  renderLinkRanking() {
    return (
      <Link to="/ranking">
        <button
          type="button"
          data-testid="btn-ranking"
        >
          Ver Ranking
        </button>
      </Link>
    );
  }

  render() {
    const { feedback, scoreTotal, assertionsTotal } = this.state;
    return (
      <>
        <h1>Feedback</h1>
        <h3 data-testid="feedback-text">{ feedback }</h3>
        <h3 data-testid="feedback-total-score">{ scoreTotal }</h3>
        <h3 data-testid="feedback-total-question">
          { assertionsTotal === 0 ? 0 : assertionsTotal }
        </h3>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
        {this.renderLinkRanking()}
      </>
    );
  }
}

export default Feedback;
