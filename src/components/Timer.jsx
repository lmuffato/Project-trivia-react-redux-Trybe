import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  constructor() {
    super();

    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.upDate = this.upDate.bind(this);
  }

  componentDidMount() {
    this.upDate();
  }

  componentDidUpdate() {
    const { selected } = this.props;
    if (selected === true) this.stopTimer();
  }

  upDate() {
    const { seconds, updateTimer } = this.props;
    updateTimer(seconds);
  }

  startTimer() {
    const { seconds } = this.props;
    const n = 1000;
    if (this.timer === 0 && seconds > 0) {
      this.timer = setInterval(this.countDown, n);
    }
  }

  stopTimer() {
    clearInterval(this.timer);
    this.timer = 0;
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    const { seconds, updateTimer } = this.props;
    const second = seconds - 1;
    updateTimer(second);
    // Check if we're at zero.
    if (second === 0) {
      clearInterval(this.timer);
    }
  }

  render() {
    const { seconds } = this.props;

    return (
      <div>
        { this.startTimer() }
        <p>
          { seconds }
        </p>
      </div>
    );
  }
}

Timer.propTypes = {
  selected: PropTypes.bool.isRequired,
  seconds: PropTypes.number.isRequired,
  updateTimer: PropTypes.func.isRequired,
};

export default Timer;
