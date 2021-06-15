import React, { Component } from 'react';

export default class Timer extends Component {
  constructor() {
    super();

    this.initTimer = this.initTimer.bind(this);

    this.state = {
      timer: 30,
      working: true,
    };
  }

  componentDidMount() {
    this.initTimer();
  }

  initTimer() {
    const oneSecond = 1;
    const oneThousandMilliseconds = 1000;
    setInterval(() => {
      const { working, timer } = this.state;
      if (timer === 0) {
        this.setState({
          working: false,
        });
        return;
      }
      if (working) {
        const count = timer - oneSecond;
        this.setState({
          timer: count,
        });
      }
    }, oneThousandMilliseconds);
  }

  render() {
    const { timer } = this.state;
    return (
      <div>
        <p>{ timer }</p>
      </div>
    );
  }
}
