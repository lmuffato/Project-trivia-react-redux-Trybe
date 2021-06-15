import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Question extends Component {
  render() {
    const { currQuestion, stopTimer, timeLeft } = this.props;
    const isTimeUp = timeLeft === 0;
    const {
      category,
      question,
      incorrect_answers: incorrectAnswer,
      correct_answer: correctAnswer,
    } = currQuestion;
    return (
      <section className="question-card">
        <header>
          <h3 data-testid="question-category">
            { category }
          </h3>
          <p data-testid="question-text">
            { question }
          </p>
        </header>
        <button
          type="button"
          data-testid="correct-answer"
          onClick={ stopTimer }
          disabled={ isTimeUp }
        >
          { correctAnswer }
        </button>
        { incorrectAnswer.map((quest, index) => (
          <button
            key={ index }
            data-testid={ `wrong-answer-${index}` }
            type="button"
            disabled={ isTimeUp }
          >
            { quest }
          </button>
        )) }
      </section>
    );
  }
}

Question.propTypes = {
  currQuestion: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    correct_answer: PropTypes.string,
  }).isRequired,
  stopTimer: PropTypes.func.isRequired,
  timeLeft: PropTypes.number.isRequired,
};

export default Question;
