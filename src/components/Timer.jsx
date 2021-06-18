import React, { Component } from 'react';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      time: {},
      seconds: 30,
    };

    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.upDate = this.upDate.bind(this);
  }

  componentDidMount() {
    this.upDate();
  }

  upDate() {
    const { seconds } = this.state;
    const timeLeftVar = this.secondsToTime(seconds);
    this.setState({
      time: timeLeftVar,
    });
  }

  secondsToTime(secs) {
    const n = 60;
    const hours = Math.floor(secs / (n * n));
    const divisorForMinutes = secs % (n * n);
    const minutes = Math.floor(divisorForMinutes / n);
    const divisorForSeconds = divisorForMinutes % n;
    const seconds = Math.ceil(divisorForSeconds);
    const obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  }

  startTimer() {
    const { seconds } = this.state;
    const n = 1000;
    if (this.timer === 0 && seconds > 0) {
      this.timer = setInterval(this.countDown, n);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    const { seconds } = this.state;
    const second = seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: second,
    });
    // Check if we're at zero.
    if (seconds === 0) {
      clearInterval(this.timer);
    }
  }

  render() {
    const { time } = this.state;
    return (
      <div>
        { this.startTimer() }
        <p>
          { time.s }
        </p>
      </div>
    );
  }
}

export default Timer;
