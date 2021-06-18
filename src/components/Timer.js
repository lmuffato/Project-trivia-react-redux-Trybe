import React from 'react';

class Timer extends React.Component {
  constructor() {
    super();

    this.state = {
      tempo: 30,
    };

    this.setTimer = this.setTimer.bind(this);
  }

  componentDidMount() {
    const { tempo } = this.state;
    let t = tempo;
    const interval = 1000;
    const myTime = setInterval(() => {
      t -= 1;
      if (t === 0) {
        clearInterval(myTime);
      }
      this.setTimer();
    }, interval);
  }

  componentDidUpdate() {
    const { tempo } = this.state;
    if (tempo === 0) {
      const buttons = document.querySelectorAll('button');
      buttons.forEach((button) => { button.disabled = true; });
    }
  }

  setTimer() {
    this.setState((prevState) => ({
      tempo: prevState.tempo - 1,
    }));
  }

  render() {
    const { tempo } = this.state;
    return (
      <h4>{ tempo }</h4>
    );
  }
}

export default Timer;
