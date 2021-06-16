import React from 'react';
import PropTypes from 'prop-types';

function Answer(props) {
  const { answers, onClick } = props;
  return (
    <div>
      {answers.map((answer, index) => (
        <button
          key={ index }
          type="button"
          onClick={ onClick }
          data-testid={ answer.dataTestId }
        >
          {answer.answer}
        </button>
      ))}
    </div>
  );
}

Answer.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Answer;
