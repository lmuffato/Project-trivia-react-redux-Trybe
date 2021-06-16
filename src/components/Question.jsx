import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Question extends Component {
  getQuestion(correctAnswer, incorrectAnswers) {
    return [correctAnswer, ...incorrectAnswers].sort();
  }

  render() {
    const { questionData } = this.props;
    const { category } = questionData;
    const currentQuestion = questionData.question;
    const correctAnswer = questionData.correct_answer;
    const incorrectAnswers = questionData.incorrect_answers;

    const dataAnswers = this.getQuestion(correctAnswer, incorrectAnswers);

    return (
      <div>
        <h2 data-testid="question-text">{currentQuestion}</h2>
        <p data-testid="question-category">{category}</p>
        { dataAnswers.map((answer, index) => {
          if (answer === correctAnswer) {
            return (
              <button
                key={ index }
                data-testid="correct-answer"
                type="button"
              >
                {answer}
              </button>
            );
          }
          return (
            <button
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${index}` }
            >
              {answer}
            </button>
          );
        })}
      </div>
    );
  }
}

Question.propTypes = {
  questionData: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default Question;
