import React, { Component } from 'react';
import PropTypes from 'prop-types';

const TIMER_TIME = 1000;

class Timer extends Component {
  constructor(props) {
    super(props);

    this.inicializeTimer = this.inicializeTimer.bind(this);

    this.state = {
      timer: 0,
    };
  }

  componentDidMount() {
    this.inicializeTimer();
  }

  inicializeTimer() {
    const { setTimer } = this.props;

    const timer = setInterval(() => {
      const { time } = this.props;

      if (time === 1) {
        this.stopTimer();
      }

      setTimer({ time: time - 1 });
    }, TIMER_TIME);

    this.setState({ timer });
  }

  stopTimer() {
    const { timer } = this.state;

    clearInterval(timer);
  }

  render() {
    const { time } = this.props;
    return (
      <span>{time}</span>
    );
  }
}

Timer.propTypes = {
  setTimer: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
};

export default Timer;
