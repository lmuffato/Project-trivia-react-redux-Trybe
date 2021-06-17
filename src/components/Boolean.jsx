import React from 'react';
import PropTypes from 'prop-types';

class Boolean extends React.Component {
  render() {
    const { state, btnStyle } = this.props;
    const { questions, questionsPosition, disabledBtn, correctAnswer } = state;
    const dataTestIdIncorrect = 'incorrect-answer';

    const dataTestId = questions[questionsPosition].correct_answer === 'True'
      ? correctAnswer : `wrong-answer-${0}`;
    const dataTestId2 = dataTestId === correctAnswer
      ? `wrong-answer-${0}` : correctAnswer;

    return (
      <>
        <h2 data-testid="question-category">
          {questions[questionsPosition].category}
        </h2>
        <h3 data-testid="question-text">
          {questions[questionsPosition].question}
        </h3>
        <button
          disabled={ disabledBtn }
          type="button"
          data-testid={ dataTestId }
          className={
            dataTestId === correctAnswer ? correctAnswer : dataTestIdIncorrect
          }
          onClick={ btnStyle }
        >
          True
        </button>
        <button
          disabled={ disabledBtn }
          type="button"
          data-testid={ dataTestId2 }
          className={
            dataTestId2 === correctAnswer ? correctAnswer : dataTestIdIncorrect
          }
          onClick={ btnStyle }
        >
          False
        </button>
      </>
    );
  }
}

Boolean.propTypes = {
  state: PropTypes.object,
}.isRequired;

export default Boolean;
