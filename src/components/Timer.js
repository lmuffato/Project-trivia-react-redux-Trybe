import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTimerID, saveSeconds } from '../actions';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };
    this.decrease1Second = this.decrease1Second.bind(this);
    this.startCountdown = this.startCountdown.bind(this);
  }

  componentDidMount() {
    this.startCountdown();
  }

  decrease1Second() {
    const { props: {
      saveSecondsToGlobal,
      stopCountdown,
      addBorderOnClick,
      disableAlternativeButtons,
      setEnableNextButton } } = this;
    this.setState(
      (prevState) => ({ seconds: prevState.seconds - 1 }),
      () => {
        const { state: { seconds } } = this;
        // salvar seconds no redux
        saveSecondsToGlobal(seconds);
        if (seconds === 0) {
          stopCountdown();
          addBorderOnClick();
          disableAlternativeButtons();
          setEnableNextButton();
        }
      },
    );
  }

  startCountdown() {
    const { props: { saveTimerIDToGlobal } } = this;
    const ONE_SECOND = 1000;
    const timerID = setInterval(() => this.decrease1Second(), ONE_SECOND);
    saveTimerIDToGlobal(timerID); // global redux state
  }

  render() {
    const { state: { seconds },
      // props: { enableNextButton, stopCountdown },
      /* startCountdown */ } = this;
    return (
      <div>
        {seconds}
        {/* {enableNextButton ? stopCountdown() : startCountdown()} */}
      </div>
    );
  }
}

const mapDispatchToProps = () => (dispatch) => ({
  saveTimerIDToGlobal: (timerID) => dispatch(setTimerID(timerID)),
  saveSecondsToGlobal: (seconds) => dispatch(saveSeconds(seconds)),
});

Timer.propTypes = {
  stopCountdown: PropTypes.func,
  saveTimerIDToGlobal: PropTypes.func,
  saveSecondsToGlobal: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Timer);
