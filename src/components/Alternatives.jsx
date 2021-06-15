import React, { Component } from 'react';
import PropTypes from 'prop-types';

const CORRECT = 'correct-answer';
const INCORRECT = 'wrong-answer';

class Alternatives extends Component {
  render() {
    const { question, aleatoryAnswers, correctAnswer } = this.props;

    return (
      <div>
        <p data-testid="question-category">{question.category}</p>
        <p data-testid="question-text">{question.question}</p>
        <div>
          <button
            type="button"
            data-testid={ aleatoryAnswers[0] === correctAnswer ? CORRECT : INCORRECT }
          >
            {aleatoryAnswers[0]}

          </button>
          <button
            type="button"
            data-testid={ aleatoryAnswers[1] === correctAnswer ? CORRECT : INCORRECT }
          >
            {aleatoryAnswers[1]}

          </button>
          <button
            type="button"
            data-testid={ aleatoryAnswers[2] === correctAnswer ? CORRECT : INCORRECT }
          >
            {aleatoryAnswers[2]}

          </button>
          <button
            type="button"
            data-testid={ aleatoryAnswers[3] === correctAnswer ? CORRECT : INCORRECT }
          >
            {aleatoryAnswers[3]}

          </button>
        </div>
      </div>
    );
  }
}

Alternatives.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
  aleatoryAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
  correctAnswer: PropTypes.string.isRequired,
};

export default Alternatives;