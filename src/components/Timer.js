import React, { Component } from 'react';

// referencia https://betterprogramming.pub/building-a-simple-countdown-timer-with-react-4ca32763dda7

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };
  }

  componentDidMount() {
    const UM_SEGUNDO = 1000;
    setInterval(() => {
      const { seconds } = this.state;
      if (seconds > 0) {
        this.setState((second) => ({
          seconds: second - 1,
        }));
      }
    }, UM_SEGUNDO);
  }

  render() {
    const { seconds } = this.state;
    return (
      <div>
        <div>
          {
            seconds === 0
              ? <h1>Fim</h1> : (
                <h1>
                  Tempo Restante:
                  { seconds }
                </h1>
              )
          }
        </div>
      </div>
    );
  }
}

export default Timer;
