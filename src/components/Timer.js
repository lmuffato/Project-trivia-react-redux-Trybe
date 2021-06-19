import React, { Component } from 'react';
import { bool } from 'prop-types';
import { connect } from 'react-redux';
import {
  disableAnswer as disableAnswerAction,
  markAnswered as markAnsweredAction,
  updateTime as updateTimeAction,
} from '../actions';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeLeft: 30,
    };
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

  componentDidUpdate() {
    const { isAnswered } = this.props;
    if (isAnswered) {
      clearInterval(this.time);
    }
  }

  getTimeOut() {
    const { updateTime, markAnswered } = this.props;
    const { timeLeft } = this.state;
    if (!timeLeft) {
      clearInterval(this.time);
      const { disableAnswer } = this.props;
      markAnswered(true);
      disableAnswer(true);
    }
    updateTime(timeLeft);
  }

  render() {
    const { timer } = this.props;
    console.log(timer);
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
  // timer: state.gameMatch.timer,
});

const mapDispatchToProps = (dispatch) => ({
  disableAnswer: (disable) => dispatch(disableAnswerAction(disable)),
  updateTime: (timer) => dispatch(updateTimeAction(timer)),
  markAnswered: (answered) => dispatch(markAnsweredAction(answered)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
