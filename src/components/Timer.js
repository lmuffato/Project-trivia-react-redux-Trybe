import React, { Component } from 'react';
import { bool } from 'prop-types';
import { connect } from 'react-redux';
import {
  disableAnswer as disableAnswerAction,
  updateTime as updateTimeAction,
} from '../actions';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeLeft: props.timeLeft,
    };
    this.resetTimer = this.resetTimer.bind(this);
  }

  componentDidMount() {
    const UM_SEGUNDO = 1000;
    this.time = setInterval(() => {
      this.setState(({ timeLeft: previousTime }) => ({
        timeLeft: previousTime ? previousTime - 1 : 0,
      }), () => {
        this.getTimeOut();
      });
    }, UM_SEGUNDO);
  }

  // static getDerivedStateFromProps(props, state) {
  //   console.log(props);
  //   if (props.timeLeft !== state.timeLeft) {
  //     return { timeLeft: props.timeLeft };
  //   }
  //   return null;
  // }

  getTimeOut() {
    const { updateTime } = this.props;
    const { timeLeft } = this.state;
    if (!timeLeft) {
      clearInterval(this.time);
      const { disableAnswer } = this.props;
      disableAnswer(true);
    }
    updateTime(timeLeft);
  }

  resetTimer() {
    this.setState({ timeLeft: 30 });
  }

  render() {
    console.log(this.state.timeLeft);
    // this.resetTimer();
    const { timeLeft } = this.state;
    return (
      <div>
        <p>{timeLeft}</p>
      </div>
    );
  }
}

Timer.propTypes = {
  disableAnswer: bool,
}.isRequired;

const mapStateToProps = (state) => ({
  isAnswered: state.gameMatch.isAnswered,
});

const mapDispatchToProps = (dispatch) => ({
  disableAnswer: (disable) => dispatch(disableAnswerAction(disable)),
  updateTime: (timer) => dispatch(updateTimeAction(timer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
