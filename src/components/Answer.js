import React from 'react';
import PropTypes from 'prop-types';

function Answer(props) {
  const { answers, changeBorder } = props;
  console.log(props);

  const difficultyLevel = (key) => {
    const hardpoint = 3;
    const mediumPOint = 2;
    const easyPoint = 1;

    switch (key) {
    case 'hard':
      return hardpoint;
    case 'medium':
      return mediumPOint;
    case 'easy':
      return easyPoint;
    default:
      break;
    }
  };

  const scoreLocalStorage = (event, index) => {
    if (event.target.getAttribute('data-testid') === 'correct-answer') {
      const timer = 10;
      const state = JSON.parse(localStorage.getItem('state'));
      const hitPoints = 10;
      state.score += (hitPoints + timer * difficultyLevel(answers[index].difficulty));
      localStorage.setItem('state', JSON.stringify(state));
    }
  };

  return (
    <div>
      {answers.map((answer, index) => (
        <button
          key={ index }
          type="button"
          onClick={ (event) => {
            changeBorder();
            scoreLocalStorage(event, index);
          } }
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
