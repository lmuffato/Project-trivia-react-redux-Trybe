import React, { Component } from 'react';
import { number, func } from 'prop-types';
import { connect } from 'react-redux';
import { setAnswerVisibility, stopTimer, timerThunk } from '../redux/actions/actions';

class Timer extends Component {
  componentDidMount() {
    const { startTimer } = this.props;
    startTimer();
  }

  componentDidUpdate() {
    const { time, stopTimerDispatch, setAnswerVisibilityDispatch } = this.props;
    if (!time) {
      stopTimerDispatch();
      setAnswerVisibilityDispatch('show');
    }
  }

  render() {
    const { time } = this.props;
    return (
      <div className="timer">
        {time}
      </div>
    );
  }
}

Timer.propTypes = {
  time: number,
  stopTimerDispatch: func,
  setAnswerVisibilityDispatch: func,
}.isRequired;

const mapStateToProps = ({ timer }) => ({
  time: timer.time,
});

const mapDispatchToProps = (dispatch) => ({
  startTimer: () => dispatch(timerThunk()),
  stopTimerDispatch: () => dispatch(stopTimer()),
  setAnswerVisibilityDispatch: (visibility) => dispatch(setAnswerVisibility(visibility)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
