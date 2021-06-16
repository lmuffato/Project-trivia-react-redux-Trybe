import React, { Component } from 'react';

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      timeLeft: 30,
    };
  }

  componentDidMount() {
    const UM_SEGUNDO = 1000;
    this.time = setInterval(() => {
      this.getTimeOut();
    }, UM_SEGUNDO);
  }

  componentWillUnmount() {
    clearInterval(this.time);
  }

  getTimeOut() {
    const { timeLeft } = this.state;
    if (timeLeft > 0) {
      this.setState((oldTime) => ({
        timeLeft: oldTime.timeLeft - 1,
      }));
    } else {
      // ALTERAR O ESTADO GLOBAL (TIMESUP)
    }
  }

  render() {
    const { timeLeft } = this.state;
    return (
      <div>
        <p>{ timeLeft }</p>
      </div>
    );
  }
}

export default Timer;
