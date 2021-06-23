import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveTimeLeftAction } from '../actions';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 30,
      second: 1000,
    };
    this.runCountdown = this.runCountdown.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer() {
    const { second } = this.state;
    this.runTimer = setInterval(() => this.runCountdown(), second);
  }

  runCountdown() {
    const { time } = this.state;
    const timeLeft = time - 1;
    const timeLimit = 30;
    const { handleStyle, isTimerActive } = this.props;
    if (time > 0 && time <= timeLimit && isTimerActive) {
      this.setState(() => ({
        time: timeLeft,
      }), this.handleReset);
    } else {
      handleStyle();
      this.setState({ time: 30 });
    }
  }

  stopTimer() {
    clearInterval(this.runTimer);
  }

  handleReset() {
    const { time } = this.state;
    const { resetQuizTimer, restoreTimer, saveTimeLeft } = this.props;
    if (resetQuizTimer) {
      saveTimeLeft(time);
      this.setState({
        time: 30,
      }, restoreTimer());
    }
  }

  render() {
    const { time } = this.state;
    return (
      <div>
        Tempo restante:
        { time }
      </div>
    );
  }
}

Timer.propTypes = {
  saveTimeLeft: PropTypes.func.isRequired,
  resetQuizTimer: PropTypes.bool.isRequired,
  restoreTimer: PropTypes.func.isRequired,
  handleStyle: PropTypes.func.isRequired,
  isTimerActive: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isTimerActive: state.userReducer.isTimerActive,
  resetQuizTimer: state.timerReducer.isTimerReseted,
});

const mapDispatchToProps = (dispatch) => ({
  saveTimeLeft: (time) => dispatch(saveTimeLeftAction(time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

// Para configuração do timer e correção do log de erro após a última questão do Quiz, tomamos por base o PR do grupo 21 da turma 07 e o repositório abaixo:
// PR ---> https://github.com/tryber/sd-07-project-trivia-react-redux/pull/545/files
// Repositório de @tspeed90 --> https://github.com/tspeed90/quiz-game/blob/master/src/components/timer.js
// Referência do log de erro semelhante ao que estávamos encontrando: https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
// Agradecimento especial ao Coruja que deu a ideia de conectar o componente Timer ao estado global do redux!!
