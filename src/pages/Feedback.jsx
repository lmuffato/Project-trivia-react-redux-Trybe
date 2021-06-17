import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.FeedbackMessenger = this.FeedbackMessenger.bind(this);
  }

  FeedbackMessenger() {
    const minimum = 3;
    const { assertions } = this.props;
    if (assertions < minimum) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  render() {
    const { assertions, score } = this.props;

    return (
      <>
        <Header />
        <h3>Placar final</h3>
        <h3 data-testid="feedback-total-score">{score}</h3>
        <h3>Acertos</h3>
        <h3 data-testid="feedback-total-question">{assertions}</h3>
        <h1 data-testid="feedback-text">
          { this.FeedbackMessenger() }
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

const mapStateToProps = (state) => ({
  assertions: state.assertions.assertions,
  score: state.score.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
