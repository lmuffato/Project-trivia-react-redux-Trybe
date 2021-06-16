import React from 'react';
import PropTypes from 'prop-types';

function Answer(props) {
  const { answers, changeBorder } = props;

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
  changeBorder: PropTypes.func.isRequired,
};

export default Answer;
