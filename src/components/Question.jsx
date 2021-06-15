import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Question extends Component {
  render() {
    const { currQuestion } = this.props;
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
        >
          { correctAnswer }
        </button>
        { incorrectAnswer.map((quest, index) => (
          <button
            key={ index }
            data-test-id={ `wrong-answer-${index}` }
            type="button"
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
};

export default Question;
