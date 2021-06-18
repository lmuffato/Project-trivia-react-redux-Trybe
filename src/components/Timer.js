import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTimerID, saveSeconds } from '../actions';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
      timerID: '',
    };
    this.decrease1Second = this.decrease1Second.bind(this);
    this.startCountdown = this.startCountdown.bind(this);
  }

  componentDidMount() {
    this.startCountdown();
  }

  decrease1Second() {
    const { props: { stopCountdown, saveSecondsOnRedux } } = this;
    this.setState(
      (prevState) => ({ seconds: prevState.seconds - 1 }),
      () => {
        const { state: { seconds, timerID } } = this;
        // salvar seconds no redux
        saveSecondsOnRedux(seconds);

        if (seconds === 0) {
          stopCountdown(timerID);
        }
      },
    );
  }

  startCountdown() {
    const { props: { saveTimerID } } = this;
    const ONE_SECOND = 1000;
    const timerID = setInterval(() => this.decrease1Second(), ONE_SECOND);
    this.setState({ timerID }); // local state
    saveTimerID(timerID); // global redux state
  }

  render() {
    const { state: { seconds } } = this;
    return (
      <div>
        {seconds}
      </div>
    );
  }
}

const mapDispatchToProps = () => (dispatch) => ({
  saveTimerID: (timerID) => dispatch(setTimerID(timerID)),
  saveSecondsOnRedux: (seconds) => dispatch(saveSeconds(seconds)),
});

Timer.propTypes = {
  stopCountdown: PropTypes.func,
  saveTimerID: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Timer);
