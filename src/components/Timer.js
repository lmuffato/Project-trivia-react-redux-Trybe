import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setTimerAction } from '../actions/actionTimer';

class Timer extends React.Component {
  componentDidMount() {
    const { setTimer } = this.props;
    // const time = 1000;
    // for (let index = 30; index > 0; index -= 1) {
    //   setTimeout(() => {
    //     setTimer();
    //   }, time);
    // }
    let counter = 30;
const timerInterval = setInterval(function() {
if( counter === 0 ) {
clearInterval( timerInterval );
}

setTimer( counter-- );
}, 1000); 
  }

  componentDidUpdate() {
    const { timer } = this.props;
    if (timer === 0) {
      const selected = document.querySelectorAll('button');
      selected[0].click();
    }
  }

  render() {
    const { timer } = this.props;
    return (
      <h4>{ timer }</h4>
    );
  }
}
const mapStateToProps = (state) => ({
  timer: state.timer.timer,
});

const mapDispatchToProps = (dispatch) => ({
  setTimer: () => dispatch(setTimerAction()),
});

Timer.propTypes = {
  setTimer: PropTypes.func.isRequired,
  timer: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
