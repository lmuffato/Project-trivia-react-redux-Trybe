import React from 'react';
import PropTypes from 'prop-types';

function Answer(props) {
  const { answers } = props;

  const changeBorder = (ev) => {
    // const btnAnswers = document.getElementsByName('answer');
    if (ev.target.getAttribute('data-testid') === 'correct-answer') {
      ev.target.style = 'border: 3px solid rgb(6, 240, 15)';
    } else {
      ev.target.style = 'border: 3px solid rgb(255, 0, 0)';
    }
  };

  return (
    <div>
      {answers.map((answer, index) => (
        <button
          key={ index }
          type="button"
          onClick={ changeBorder }
          data-testid={ answer.dataTestId }
          name="answer"
        >
          {answer.answer}
        </button>
      ))}
    </div>
  );
}

Answer.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Answer;
