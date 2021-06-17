import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 30,
      timerOk: true,
      stopTimer: false,
    };

    this.runTimer = this.runTimer.bind(this);
    this.handlestopTimer = this.handlestopTimer.bind(this);
  }

  componentDidMount() {
    this.runTimer();
  }

  // CONTADOR PARAR EM ZERO
  // CONTADOR QND CLICAR EM QUALQUER BOTÃO DE RESPOSTA
  // INICIAR QUANDO COMEÇA O JOGO
  // INICIAR AO IR PRA PRÓX PERGUNTA - ALTERAR O ESTADO DO TIMERACTIVE (GETNEXTQUESTION)
  // estado booleano p controlar o time
  runTimer() {
    // const limitTime = 0;
    const oneSecond = 1000;
    const { time, timerOk } = this.state;
    // const { timerActive } = this.props;
    switch (time) {
    case timerOk && time !== 0:
      setInterval(() => {
        this.setState((state) => ({
          time: state.time - 1,
        }));
      }, oneSecond);
      break;
    case time === 0:
      this.setState({
        timerOk: false,
      });
      this.handlestopTimer();
      break;
    default:
      return time;
    }
  }

  handlestopTimer() {
    this.setState({
      stopTimer: true,
    });

    clearInterval(this.runTimer);
  }

  render() {
    const { time } = this.state;
    return (
      <div>
        Tempo:
        { time }
      </div>
    );
  }
}

export default Timer;
