import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  constructor(props) {
    super(props);
    const { time, answered } = this.props;
    this.state = {
      time,
      answered,
    };
    this.runTimer = this.runTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
  }

  componentDidMount() {
    this.runTimer();
  }

  runTimer() {
    let { time, answered } = this.state;
    const oneSec = 1000;
    const interval = setInterval(() => {
      if (answered) {
        this.pauseTimer(interval);
      } else if (time > 0) {
        time -= 1;
      } else {
        clearInterval(interval);
      }
      this.setState({ time, interval });
    }, oneSec);
  }

  pauseTimer(interval) {
    console.log('got it');
    clearInterval(interval);
  }

  render() {
    const { time } = this.state;
    return (
      <div>
        <h3>{ time }</h3>
      </div>
    );
  }
}

Timer.propTypes = {
  time: PropTypes.number,
}.isRequired;

export default Timer;
