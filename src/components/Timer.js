import React, { Component } from 'react';
import { bool } from 'prop-types';
import { connect } from 'react-redux';
import {
  disableAnswer as disableAnswerAction,
  updateTime as updateTimeAction,
} from '../actions';

class Timer extends Component {
  constructor() {
    super();

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

  getTimeOut() {
    const { updateTime } = this.props;
    const { timeLeft } = this.state;
    if (!timeLeft) {
      clearInterval(this.time);
      const { disableAnswer } = this.props;
      disableAnswer(true); // Altera o estado global para desabilitar o botão;
      // this.setState({ timeLeft: 10 });
    }
    updateTime(timeLeft);
  }

  render() {
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

const mapDispatchToProps = (dispatch) => ({
  disableAnswer: (disable) => dispatch(disableAnswerAction(disable)),
  updateTime: (timer) => dispatch(updateTimeAction(timer)),
});

export default connect(null, mapDispatchToProps)(Timer);
