import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { currentTime, disable, resetTimer, hidden } from '../actions';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.tick();
  }

  componentDidUpdate() {
    const { resetCurrentTimer, editResetTimer } = this.props;
    if (resetCurrentTimer) {
      this.tick();
      editResetTimer(false);
    }
    const {
      editDisable,
      editHidden,
      clockStoper,
      currentTimeValue,
    } = this.props;
    if (currentTimeValue === 0 || clockStoper) {
      clearInterval(this.set);
      editDisable(true);
      editHidden(false);
    }
  }

  tick() {
    const oneSecond = 1000;
    const {
      editCurrentTime,
    } = this.props;
    this.set = setInterval(() => {
      editCurrentTime(1);
    }, oneSecond);
  }

  render() {
    const { currentTimeValue } = this.props;
    // console.log(currentTimeValue);
    return (
      <div>
        <h2>{currentTimeValue}</h2>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  editDisable: (payload) => dispatch(disable(payload)),
  editHidden: (payload) => dispatch(hidden(payload)),
  editCurrentTime: (payload) => dispatch(currentTime(payload)),
  editResetTimer: (payload) => dispatch(resetTimer(payload)),
});

const mapStateToProps = ({ gameReducer }) => ({
  currentTimeValue: gameReducer.currentTime,
  clockStoper: gameReducer.clockStoper,
  resetCurrentTimer: gameReducer.resetTimer,
});

Timer.propTypes = {
  editDisable: func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
