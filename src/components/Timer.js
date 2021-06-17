import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  constructor(props) {
    super(props);
    const { time } = this.props;
    this.state = {
      time,
    };
    this.runTimer = this.runTimer.bind(this);
  }

  componentDidMount() {
    this.runTimer();
  }

  runTimer() {
    let { time } = this.state;
    const { stopTimer } = this.props;
    const oneSec = 1000;
    const interval = setInterval(() => {
      if (time > 0) {
        time -= 1;
      } else {
        clearInterval(interval);
        const buttons = document.querySelectorAll('button');
        buttons.forEach((button) => { button.disabled = true; });
      }
      this.setState({ time });
      stopTimer(interval, time);
    }, oneSec);
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
