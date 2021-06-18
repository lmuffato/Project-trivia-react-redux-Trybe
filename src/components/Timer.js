import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateTimer, timerResetAction, timerIntervalAction } from '../redux/action';

export const disableButtons = (bool) => {
  const btnAnswers = document.getElementsByName('answer');
  btnAnswers.forEach((btn) => {
    btn.disabled = bool;
  });
};

const changeBorder = () => {
  const btnAnswers = document.getElementsByName('answer');
  btnAnswers.forEach((btn) => {
    if (btn.getAttribute('data-testid') === 'correct-answer') {
      btn.style = 'border: 3px solid rgb(6, 240, 15)';
    } else {
      btn.style = 'border: 3px solid rgb(255, 0, 0)';
    }
  });
};

class Timer extends React.Component {
  componentDidMount() {
    const { decreaseTimer, setTimerInterval } = this.props;
    const oneSecond = 1000;
    setTimerInterval(setInterval(() => {
      decreaseTimer();
    }, oneSecond));
  }

  componentDidUpdate() {
    const { timer, timerInterval } = this.props;
    if (timer === 0) {
      console.log('clear timer 25');
      clearInterval(timerInterval);
    }
  }

  componentWillUnmount() {
    const { timerInterval } = this.props;
    clearInterval(timerInterval);
  }

  render() {
    const { timer } = this.props;
    if (timer <= 0) {
      disableButtons(true);
      changeBorder();
    }

    return (
      <div className="timer">
        <span>
          Timer:
          <span>{ timer }</span>
        </span>
      </div>
    );
  }
}

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
  decreaseTimer: PropTypes.func.isRequired,
  timerInterval: PropTypes.number.isRequired,
  setTimerInterval: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  timer: state.timer.time,
  timerInterval: state.timer.timerInterval,
});

const mapDispatchToProps = (dispatch) => ({
  decreaseTimer: () => dispatch(updateTimer()),
  timerReset: () => dispatch(timerResetAction()),
  setTimerInterval: (payload) => dispatch(timerIntervalAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
