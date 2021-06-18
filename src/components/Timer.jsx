import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ONE_SECOND } from '../constants';
import { gameTimeout } from '../actions/action';

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      timer: null,
    };
    this.setInitialTime = this.setInitialTime.bind(this);
  }

  componentDidMount() {
    this.setInitialTime();
  }

  componentDidUpdate() {
    const { timer } = this.state;
    const { userAnswered, didTimeout, remainingTime, shouldResetTimer, timerReseted } = this.props;
    if (shouldResetTimer) {
      this.setInitialTime();
      timerReseted();
      return;
    }
    if (timer > 0 && !userAnswered) {
      console.log('hi');
      setTimeout(() => this.setState({ timer: timer - 1 }), ONE_SECOND);
      remainingTime(timer);
    } else if (timer <= 0 && !userAnswered) {
      didTimeout();
    }
  }

  setInitialTime() {
    this.setState({ timer: 30 });
  }

  render() {
    const { timer } = this.state;
    return (
      <div>
        <h1>Timer</h1>
        <p>{Math.round(timer * 100) / 100}</p>
      </div>
    );
  }
}
// TODO does the timer really needs to know about Redux?
function mapDispatchToProps(dispatch) {
  return {
    timeout: () => dispatch(gameTimeout()),
  };
}

Timer.propTypes = {
  timeout: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Timer);
