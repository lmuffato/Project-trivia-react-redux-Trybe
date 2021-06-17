import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveTime } from '../redux/actions/actions';

const TIMER_TIME = 1000;

class Timer extends Component {
  constructor(props) {
    super(props);

    this.initializeTimer = this.initializeTimer.bind(this);
  }

  componentDidMount() {
    this.initializeTimer();
  }

  initializeTimer() {
    const { setTimer, saveTimeNumber } = this.props;

    const timer = setInterval(() => {
      const { time } = this.props;

      setTimer({ time: time - 1 });
    }, TIMER_TIME);

    saveTimeNumber({ timer });
  }

  render() {
    const { time } = this.props;
    return (
      <span>{time}</span>
    );
  }
}

Timer.propTypes = {
  setTimer: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  saveTimeNumber: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  timer: state.jogoReducer.time,
});

const mapDispatchToProps = (dispatch) => ({
  saveTimeNumber: (payload) => dispatch(saveTime(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
