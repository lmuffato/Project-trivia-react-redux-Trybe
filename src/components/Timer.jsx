import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ONE_SECOND } from '../constants';
import { currentQuestionTime, gameTimeout } from '../actions/action';

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      timer: null,
    };
  }

  componentDidMount() {
    this.setInitialTime();
  }

  componentDidUpdate() {
    const { timer } = this.state;
    const { timeout, remainingTime } = this.props;
    if (timer > 0) {
      setTimeout(() => this.setState({ timer: timer - 1 }), ONE_SECOND);
      remainingTime(timer);
    } else {
      timeout();
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
        <p>{timer}</p>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    timeout: () => dispatch(gameTimeout()),
    remainingTime: (time) => dispatch(currentQuestionTime(time)),
  };
}

Timer.propTypes = {
  timeout: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Timer);
