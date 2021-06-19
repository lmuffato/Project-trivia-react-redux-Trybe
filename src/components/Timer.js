import React, { Component } from 'react';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };
    this.timer = 0;

    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  startTimer() {
    const ONE_SECOND = 1000;
    const { seconds } = this.state;
    if (this.timer === 0 && seconds > 0) {
      this.timer = setInterval(this.countDown, ONE_SECOND);
    }
  }

  countDown() {
    const { seconds } = this.state;
    const secondsLocal = seconds - 1;
    if (seconds === 0) {
      clearInterval(this.timer);
      return;
    }
    this.setState({
      seconds: secondsLocal,
    });
  }

  render() {
    const { seconds } = this.state;
    return (
      <>
        <h3>Contador</h3>
        {/* <button type="button" onClick={ this.startTimer }>Iniciar!</button> */}
        <span>{ seconds }</span>
      </>
    );
  }
}

export default Timer;
