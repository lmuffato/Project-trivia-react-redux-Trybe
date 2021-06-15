import React, { Component } from 'react'

// referencia https://betterprogramming.pub/building-a-simple-countdown-timer-with-react-4ca32763dda7

export default class Timer extends Component {
  constructor() {
    super()
      this.state = {
        seconds: 30,
      };
    //   this.componentClearTimer = this.componentClearTimer.bind(this);
  }

//   componentDidMount() {
//     this.myInterval = setInterval(() => {
//       const { seconds } = this.state

//         if (seconds > 0) {
//           this.setState(({ seconds }) => ({
//             seconds: seconds - 1
//           }))
//         }
//         if (seconds === 0) {
//           clearInterval(this.myInterval)
//         }
//     }, 1000)
//   }

//   componentClearTimer() {
//     clearInterval(this.myInterval)
//   }

  componentDidMount() {
    setInterval(() => {
      const { seconds } = this.state

        if (seconds > 0) {
          this.setState(({ seconds }) => ({
            seconds: seconds - 1
          }))
        }
    }, 1000)
  }

  render() {
    const { seconds } = this.state
      return (
        <div>
          { seconds === 0
            ? <h1>Fim</h1>
            : <h1>Tempo Restante: { seconds }</h1>
          }
        </div>
      )
  }
}