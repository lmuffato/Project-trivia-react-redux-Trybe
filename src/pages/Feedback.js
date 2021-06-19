import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { resetQuestionReducer } from '../actions/manageQuestions';
import { resetGameReducer, resetPlayerReducer } from '../actions';

class Feedback extends Component {
  constructor() {
    super();

    this.resetState = this.resetState.bind(this);
  }

  resetState() {
    const { resetQuestion, resetPlayer, resetGame } = this.props;
    resetGame();
    resetPlayer();
    resetQuestion();
  }

  render() {
    const { score, assertions } = this.props;
    const averageAssertions = 3;
    const disappointment = 'Podia ser melhor...';
    const congratulations = 'Mandou bem!';
    return (
      <div>
        <Header />
        <section>
          <h3 data-testid="feedback-text">
            {assertions < averageAssertions ? disappointment : congratulations}
          </h3>
          <h4 data-testid="feedback-total-score">
            {score}
          </h4>
          <h4 data-testid="feedback-total-question">
            {assertions}
          </h4>
        </section>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.resetState }
        >
          <Link to="/">
            Jogar novamente
          </Link>
        </button>
        <button type="button" data-testid="btn-ranking">
          <Link to="/ranking">
            Ver Ranking
          </Link>
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetQuestion: () => dispatch(resetQuestionReducer()),
  resetPlayer: () => dispatch(resetPlayerReducer()),
  resetGame: () => dispatch(resetGameReducer()),
});

const mapStateToProps = (
  { questionsReducer: { assertions }, player: { name, score } },
) => ({
  score,
  assertions,
  name,
});

Feedback.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
  resetQuestion: PropTypes.func,
  resetPlayer: PropTypes.func,
  resetGame: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
