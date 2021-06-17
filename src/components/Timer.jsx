import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contador: 30,
      timerOk: true,
      segundo: 30,
      // stopTimer: false,
    };

    // this.runTimer = this.runTimer.bind(this);
    // this.handlestopTimer = this.handlestopTimer.bind(this);
    this.runCountdown = this.runCountdown.bind(this);
  }

  componentDidMount() {
    this.runCountdown();
  }

  // componentWillUnmount() {
  //   this.handlestopTimer();
  // }
  // CONTADOR PARAR EM ZERO
  // CONTADOR QND CLICAR EM QUALQUER BOTÃO DE RESPOSTA
  // INICIAR QUANDO COMEÇA O JOGO
  // INICIAR AO IR PRA PRÓX PERGUNTA - ALTERAR O ESTADO DO TIMERACTIVE (GETNEXTQUESTION)
  // estado booleano p controlar o time
  // runTimer() {
  //   // const limitTime = 0;
  //   const oneSecond = 1000;
  //   const { time, timerOk } = this.state;
  //   // const { timerActive } = this.props;
  //   switch (time) {
  //   case timerOk && time !== 0:
  //     setInterval(() => {
  //       this.setState((state) => ({
  //         time: state.time - 1,
  //       }));
  //     }, oneSecond);
  //     break;
  //   case time === 0:
  //     this.setState({
  //       timerOk: false,
  //     });
  //     this.handlestopTimer();
  //     break;
  //   default:
  //     return time;
  //   }
  // }

  runCountdown() {
    let interval;
    const oneSecond = 1000;
    const thirty = 30;
    const { second, timerOk, contador } = this.state;
    const secondCounter = contador % thirty;
    if (timerOk && contador > -1) {
      interval = setTimeout(() => {
        this.setState((state) => ({
          contador: state.contador - 1,
        }));
        this.setState({ second: secondCounter });
        console.log(contador);
      }, oneSecond);
    }
    if (!timerOk || contador < 0) {
      return () => clearTimeout(interval);
    }
  }

  // handlestopTimer() {
  //   const { time } = this.state;
  //   this.setState({ timerOk: false });
  //   console.log(time);
  //   return () => clearTimeout(this.runCountdown);

  //   // clearInterval(this.runTimer);
  // }

  render() {
    const { second } = this.state;
    return (
      <div>
        Tempo:
        { second }
      </div>
    );
  }
}

export default Timer;
