import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSeconds } from '../actions';

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
    this.setTime();
  }

  // componentDidUpdate() {
  //   console.log('Chamando');
  // }

  setTime() {
    const UM_SEGUNDO = 1000;

    this.timer = setInterval(() => {
      const { seconds } = this.state;
      const { timeCondition, stop, sendSeconds } = this.props;

      if (seconds === 0 || stop) {
        console.log('Segundos que vem do Timer', seconds);
        timeCondition();
        clearInterval(this.timer);
      } else if (seconds > 0) {
        this.setState((prevState) => ({
          seconds: prevState.seconds - 1,
        }));
      }
      sendSeconds(seconds);
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

const mapDispatchToProps = (dispatch) => ({
  sendSeconds: (seconds) => dispatch(getSeconds(seconds)),
});

Timer.propTypes = {
  timeCondition: PropTypes.func,
  getSeconds: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Timer);
