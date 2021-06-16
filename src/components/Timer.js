import React, { Component } from 'react';
import PropTypes from 'prop-types';

// referencia https://betterprogramming.pub/building-a-simple-countdown-timer-with-react-4ca32763dda7

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 5,
    };

    this.setTime = this.setTime.bind(this);
    this.disableBtn = this.disableBtn.bind(this);
  }

  componentDidMount() {
    console.log('Did Mount');
    this.setTime();
  }

  setTime() {
    const UM_SEGUNDO = 1000;

    this.timer = setInterval(() => {
      const { seconds } = this.state;
      const { timeCondition } = this.props;
      if (seconds > 0) {
        this.setState((prevState) => ({
          seconds: prevState.seconds - 1,
        }));
      }

      if (seconds === 1) {
        timeCondition();
        clearInterval(this.timer);
      }
    }, UM_SEGUNDO);
  }

  disableBtn() {
    // const { timeCondition } = this.props;
    return (
      <h1>Fim</h1>
    );
  }

  render() {
    const { seconds } = this.state;

    return (
      <div>
        <div>
          {
            seconds <= 0
              ? this.disableBtn() : (
                <h1>
                  Tempo Restante:
                  { seconds }
                </h1>
              )
          }
        </div>
      </div>
    );
  }
}

Timer.propTypes = {
  timeCondition: PropTypes.func,
}.isRequired;

export default Timer;
