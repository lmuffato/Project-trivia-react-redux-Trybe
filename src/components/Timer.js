import React, { Component } from 'react';
import PropTypes from 'prop-types';

// referencia https://betterprogramming.pub/building-a-simple-countdown-timer-with-react-4ca32763dda7

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 10,
    };

    this.setTime = this.setTime.bind(this);
    this.disableBtn = this.disableBtn.bind(this);
  }

  componentDidMount() {
    const { setTime } = this;

    setTime();
  }

  componentWillUnmount() {
    const { setTime } = this;
    clearInterval(setTime());
  }

  setTime() {
    const UM_SEGUNDO = 1000;
    const { seconds } = this.state;
    setInterval(() => {
      if (seconds > 0) {
        this.setState((prevState) => ({
          seconds: prevState.seconds - 1,
        }));
      }
    }, UM_SEGUNDO);
  }

  disableBtn() {
    const { timeCondition } = this.props;
    return (
      <>
        <h1>Fim</h1>
        {timeCondition()}
      </>
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
