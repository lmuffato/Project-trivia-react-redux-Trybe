import React from 'react';
import PropTypes from 'prop-types';

const Timer = (props) => {
  const { timer } = props;
  return (
    <div className="timer">
      <span>
        Timer:
        <span>{ timer }</span>
      </span>
    </div>
  );
};

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
};

export default Timer;
