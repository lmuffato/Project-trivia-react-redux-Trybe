import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateTimer, timerResetAction, setIdInterval } from '../redux/action';

export const disableButtons = (bool) => {
  const btnAnswers = document.getElementsByName('answer');
  btnAnswers.forEach((btn) => {
    btn.disabled = bool;
  });
};

// export const enableBtnNext = (bool) => {
//   const btnNext = document.querySelector('#btn-next');
//   if (bool) {
//     console.log(btnNext);
//     btnNext.disabled = true;
//     // btnNext.removeAttribute('disable');
//     console.log(btnNext)
//   } else {
//     console.log(btnNext)
//     btnNext.disabled = false;
//     // btnNext.setAttribute('disable', true);
//     console.log(btnNext)
//   }
// };

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
    const { timer } = this.props;
    if (timer < 0) {
      console.log('didUpdate TIMER');
      // clearInterval(timerInterval);
    }
  }

  componentWillUnmount() {
    const { timerInterval } = this.props;
    clearInterval(timerInterval);
  }

  render() {
    const { timer, idInterval, enableBtnNext } = this.props;
    if (timer <= 0) {
      disableButtons(true);
      changeBorder();
      clearInterval(idInterval);
      enableBtnNext();
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
  idInterval: PropTypes.number.isRequired,
  setTimerInterval: PropTypes.func.isRequired,
  enableBtnNext: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  idInterval: state.idInterval.id,
  timer: state.timer.time,
  // timerInterval: state.timer.timerInterval,
});

const mapDispatchToProps = (dispatch) => ({
  decreaseTimer: () => dispatch(updateTimer()),
  timerReset: () => dispatch(timerResetAction()),
  setTimerInterval: (payload) => dispatch(setIdInterval(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
