import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  render() {
    const { timer } = this.props;
    return (
      <h2>{timer}</h2>
    );
  }
}

Timer.propTypes = {
  timer: PropTypes.number,
}.isRequired;

export default Timer;
