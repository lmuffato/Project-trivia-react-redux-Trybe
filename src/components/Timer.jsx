import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveTime } from '../redux/actions/actions';

const TIMER_TIME = 1000;

class Timer extends Component {
  constructor(props) {
    super(props);

    this.inicializeTimer = this.inicializeTimer.bind(this);
  }

  componentDidMount() {
    this.inicializeTimer();
  }

  inicializeTimer() {
    const { setTimer, saveTimer } = this.props;

    const timer = setInterval(() => {
      const { time } = this.props;

      // if (time === 1) {
      //   this.stopTimer();
      // }

      setTimer({ time: time - 1 });
    }, TIMER_TIME);

    saveTimer({ timer });
  }

  // stopTimer() {
  //   const { timer } = this.props;

  //   clearInterval(timer);
  // }

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
  saveTimer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  timer: state.jogoReducer.time,
});

const mapDispatchToProps = (dispatch) => ({
  saveTimer: (payload) => dispatch(saveTime(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
