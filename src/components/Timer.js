import React, { Component } from 'react';
import PropTypes from 'prop-types';

// referencia https://betterprogramming.pub/building-a-simple-countdown-timer-with-react-4ca32763dda7

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };

    this.setTime = this.setTime.bind(this);
    this.disableBtn = this.disableBtn.bind(this);
  }

  componentDidMount() {
    console.log('Did Mount');
    this.setTime();
  }

  // componentDidUpdate() {
  //   console.log('Chamando');
  // }

  setTime() {
    const UM_SEGUNDO = 1000;

    this.timer = setInterval(() => {
      const { seconds } = this.state;
      const { timeCondition, stop, getSeconds } = this.props;

      if (seconds === 0 || stop) {
        timeCondition();
        getSeconds(seconds);
        console.log(seconds);
        clearInterval(this.timer);
      } else if (seconds > 0) {
        this.setState((prevState) => ({
          seconds: prevState.seconds - 1,
        }));
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
  getSeconds: PropTypes.func,
}.isRequired;

export default Timer;
