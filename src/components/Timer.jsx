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
  }

  componentDidMount() {
    const { second } = this.state;
    this.runTimer = setInterval(() => this.runCountdown(), second);
  }

  componentWillUnmount() {
    clearInterval(this.runTimer);
  }

  runCountdown() {
    const { time } = this.state;
    const { handleStyle } = this.props;
    if (time > 0) {
      this.setState((previousState) => ({
        time: previousState.time - 1,
      }), this.handleReset);
    } else {
      handleStyle();
      this.setState({ time: 30 });
    }
  }

  handleReset() {
    const { time } = this.state;
    const { resetTimer, restoreTimer, saveTimeLeft } = this.props;
    if (resetTimer) {
      saveTimeLeft(time);
      clearInterval(this.runCountdown);
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
  resetTimer: PropTypes.bool.isRequired,
  restoreTimer: PropTypes.func.isRequired,
  handleStyle: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveTimeLeft: (time) => dispatch(saveTimeLeftAction(time)),
});

export default connect(null, mapDispatchToProps)(Timer);

// Para configuração do timer e correção do log de erro após a última questão do Quiz, tomamos por base o PR do grupo 21 da turma 07 e o repositório abaixo:
// PR ---> https://github.com/tryber/sd-07-project-trivia-react-redux/pull/545/files
// Repositório de @tspeed90 --> https://github.com/tspeed90/quiz-game/blob/master/src/components/timer.js
// Referência do log de erro semelhante ao que estávamos encontrando: https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
