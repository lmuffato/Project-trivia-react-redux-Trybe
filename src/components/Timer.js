import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { timerOut as timerOutAction } from '../actions';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
      // disabledBtn: false,
    };
    this.timer = 0;

    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.blockButtons = this.blockButtons.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  startTimer() {
    const ONE_SECOND = 1000;
    const { seconds } = this.state;
    if (this.timer === 0 && seconds > 0) {
      this.timer = setInterval(this.countDown, ONE_SECOND);
    }
  }

  blockButtons() {
    const buttons = document.querySelectorAll('button');
    console.log(buttons);
  }

  countDown() {
    const { seconds } = this.state;
    const secondsLocal = seconds - 1;
    if (seconds === 0) {
      clearInterval(this.timer);
      const { timerOut } = this.props;
      timerOut(0);
      return;
    }
    this.setState({
      seconds: secondsLocal,
    });
  }

  render() {
    const { seconds } = this.state;
    return (
      <>
        <h3>Contador</h3>
        {/* <button type="button" onClick={ this.startTimer }>Iniciar!</button> */}
        <span>{ seconds }</span>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  // getTrivia: (trivia) => dispatch(getTriviaThunk(trivia)),
  timerOut: (seconds) => dispatch(timerOutAction(seconds)),
});

Timer.propTypes = {
  timerOut: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Timer);
