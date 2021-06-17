import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import timeLeftAction from '../redux/actions/timer.action';

class Countdown extends Component {
  constructor() {
    super();
    this.state = {
      intervalControlSate: '',
    };
  }

  componentDidMount() {
    this.timerFuntion();
  }

  timerFuntion() {
    const intervalMiliSeconds = 1000;
    const { timer } = this.props;
    const idInterval = setInterval(() => { timer(); }, intervalMiliSeconds);
    this.setState({
      intervalControlSate: idInterval,
    });
  }

  render() {
    const { time } = this.props;
    const { intervalControlSate: intervalTimer } = this.state;
    // console.log(time);
    if (time <= 0) { clearInterval(intervalTimer); }
    return (
      <div>
        <h1>{time}</h1>
        <div>
          {}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  time: state.timerReducer.time,
});

const mapDispatchToProps = (dispatch) => ({
  timer: (timeLeft) => dispatch(timeLeftAction(timeLeft)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Countdown);

Countdown.propTypes = {
  time: propTypes.number.isRequired,
  timer: propTypes.func.isRequired,
};
