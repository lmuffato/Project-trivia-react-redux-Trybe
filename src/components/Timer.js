import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSeconds, shouldTimerRestartAction } from '../actions';

// referencia https://betterprogramming.pub/building-a-simple-countdown-timer-with-react-4ca32763dda7

class Timer extends Component {
  constructor() {
    super();
    this.INITIAL_TIME = 30;
    this.state = {
      seconds: this.INITIAL_TIME,
    };

    this.setTime = this.setTime.bind(this);
    this.disableBtn = this.disableBtn.bind(this);
    this.restartTime = this.restartTime.bind(this);
  }

  componentDidMount() {
    console.log('Timer Did Mount');
    this.setTime();
  }

  async componentDidUpdate() {
    const { timeCondition, timerWillRestart, makeTimerRestart } = this.props;
    console.log('Timer Updated', timerWillRestart);

    if (timerWillRestart) {
      timeCondition(false);
      makeTimerRestart(false);
      await this.restartTime();
      this.setTime();
    }
  }

  setTime() {
    const UM_SEGUNDO = 1000;

    this.timer = setInterval(() => {
      const { seconds } = this.state;
      const { timeCondition, stop, sendSeconds } = this.props;

      if (seconds === 0 || stop) {
        console.log('Segundos que vem do Timer', seconds);
        timeCondition(true); // true
        clearInterval(this.timer);
      } else if (seconds > 0) {
        this.setState((prevState) => ({
          seconds: prevState.seconds - 1,
        }));
      }
      sendSeconds(seconds);
    }, UM_SEGUNDO);
  }

  async restartTime() {
    await this.setState({
      seconds: this.INITIAL_TIME,
    });
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

const mapStateToProps = (state) => ({
  timerWillRestart: state.triviaReducer.shouldTimerRestart,
});

const mapDispatchToProps = (dispatch) => ({
  sendSeconds: (seconds) => dispatch(getSeconds(seconds)),
  makeTimerRestart: (bool) => dispatch(shouldTimerRestartAction(bool)),
});

Timer.propTypes = {
  timeCondition: PropTypes.func,
  getSeconds: PropTypes.func,
  timerWillRestart: PropTypes.bool,
  makeTimerRestart: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
