import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function Answer(props) {
  const { answers, onClick } = props;
  const timer = Number(useSelector((state) => state.timer.time));

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
    console.log('TIMER', timer);
    if (event.target.getAttribute('data-testid') === 'correct-answer') {
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
          onClick={ (ev) => {
            onClick();
            scoreLocalStorage(ev, index);
          } }
          data-testid={ answer.dataTestId }
          { ...{ id: answer.dataTestId } }
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
  onClick: PropTypes.func.isRequired,
};

export default Answer;
