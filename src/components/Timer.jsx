import React, { Component } from 'react';
import { number } from 'prop-types';
import { connect } from 'react-redux';
import { saveTime } from '../redux/actions/actions';

const TIMER_TIME = 1000;

class Timer extends Component {
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
}.isRequired;

const mapStateToProps = ({ timer }) => ({
  time: timer.time,
});

const mapDispatchToProps = (dispatch) => ({
  saveTimeNumber: (payload) => dispatch(saveTime(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
