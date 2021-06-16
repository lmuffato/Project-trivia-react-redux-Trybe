import React, { Component } from 'react';
import { bool } from 'prop-types';
import { connect } from 'react-redux';
import { disableAnswer as disableAnswerAction } from '../actions';

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
      this.getTimeOut();
    }, UM_SEGUNDO);
  }

  getTimeOut() {
    const { timeLeft } = this.state;
    if (timeLeft > 0) {
      this.setState((oldTime) => ({
        timeLeft: oldTime.timeLeft - 1,
      }));
    } else {
      const { disableAnswer } = this.props;
      disableAnswer(true); // Altera o estado global para desabilitar o botão;
      // this.setState({ timeLeft: 10 });
    }
  }

  render() {
    const { timeLeft } = this.state;
    return (
      <div>
        <p>{ timeLeft }</p>
      </div>
    );
  }
}

Timer.propTypes = {
  disableAnswer: bool,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  disableAnswer: (disable) => dispatch(disableAnswerAction(disable)),
});

export default connect(null, mapDispatchToProps)(Timer);
