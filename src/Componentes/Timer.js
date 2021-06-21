// Requisito 8 - Implementa um cronometro
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { nextTimer, time } from '../actions';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };
    this.tick = this.tick.bind(this);
  }

  // inicia o decremenyto dos segundos quando o componente e renderizado

  componentDidMount() {
    const oneSec = 1000;
    setInterval(() => this.tick(), oneSec);
  }

  tick() {
    const { timerState, nextTimerState, getStateTimer, getTime } = this.props;
    // reinicia a decrementação do cronometro ápos trocar de pergunta
    getStateTimer(true);
    // define a condição de parrada do decremento do cronometro
    const { seconds } = this.state;
    if (seconds !== 0 && timerState === true) {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }
      ));
    } else {
      getTime(seconds);
    }
    // retorna o estado local para a condição inicial
    if (nextTimerState === false) {
      this.setState({
        seconds: 30,
      });
    }
  }

  render() {
    const { seconds } = this.state;
    return (
      <div>
        <p className="timer">{seconds}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  timerState: state.triviaReducer.timer,
  nextTimerState: state.triviaReducer.nextTimer,
});

const mapDispatchToProps = (dispatch) => ({
  getStateTimer: (bool) => dispatch(nextTimer(bool)),
  getTime: (seconds) => dispatch(time(seconds)),
});

Timer.propTypes = {
  getTime: PropTypes.number,
  timerState: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
