import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startNewGame } from '../actions/action';
import { permutate } from '../services';
import { QUESTIONS_AMOUNT } from '../constants';

class TriviaGame extends Component {
  constructor() {
    super();
    this.getID = this.getID.bind(this);
  }

  componentDidMount() {
    const { fetchQuestions } = this.props;
    fetchQuestions(localStorage.getItem('token'));
  }

  getID(answer) {
    const { questions } = this.props;
    if (answer === questions[0].correct_answer) return 'correct-answer';
    return `wrong-answer-${questions[0].incorrect_answers.indexOf(answer)}`;
  }

  render() {
    const { questions } = this.props;
    if (questions.length === 0) return <div>Loading</div>;
    const { category, question } = questions[0];
    const answers = [questions[0].correct_answer, ...questions[0].incorrect_answers];
    return (
      <div>
        <h1>Trivia Game</h1>
        <h3 data-testid="question-category">{category}</h3>
        <h2 data-testid="question-text">{question}</h2>
        {permutate(...answers).map((answer, i) => (
          <button
            type="button"
            data-testid={ this.getID(answer) }
            key={ i }
          >
            {answer}
          </button>
        ))}
      </div>
    );
  }
}

TriviaGame.propTypes = {
  fetchQuestions: PropTypes.func,
}.isRequired;

function mapDispatchToProps(dispatch) {
  return {
    fetchQuestions: (token) => dispatch(startNewGame(QUESTIONS_AMOUNT, token)),
  };
}

function mapStateToProps(state) {
  return {
    questions: state.trivia.questions,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TriviaGame);
