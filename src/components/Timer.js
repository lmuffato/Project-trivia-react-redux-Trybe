import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  constructor(props) {
    super(props);

    const { time } = props;

    this.state = {
      tempo: time,
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
      <h4 id="time">{ tempo }</h4>
    );
  }
}

Timer.propTypes = {
  time: PropTypes.number.isRequired,
};

export default Timer;
