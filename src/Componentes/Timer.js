import React from 'react';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    const { seconds } = this.state;
    const oneSec = 1000;
    if (seconds !== 0) {
      this.timer = setInterval(
        () => this.tick(),
        oneSec,
      );
    }
  }

  tick() {
    const { seconds } = this.state;
    if (seconds !== 0) {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }
  }

  render() {
    const { seconds } = this.state;
    return (
      <div>
        <p>{ seconds }</p>
      </div>
    );
  }
}

export default Timer;
