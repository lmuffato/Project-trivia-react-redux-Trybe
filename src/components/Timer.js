import React, { Component } from 'react';
// import { connect } from 'react-redux';

class Timer extends Component {
  constructor() {
    super();
    // const { timer } = this.props;
    this.state = {
      timer: 30,
    };
    this.handleTimer = this.handleTimer.bind(this);
  }

  componentDidMount() {
    const { timer } = this.state;
    console.log(timer);
    this.handleTimer();
    const second = 1000;
    setInterval(() => this.handleTimer(), second);
    // const second = 1000;
    // const time = setInterval(() => this.handleTimer(), second);
    // if (timer === 1) clearInterval(time);
  }

  handleTimer() {
    const { timer } = this.state;
    this.setState(({ timer: timer - 1 }));
    const { checkTimer } = this.props;
    checkTimer(timer);
    // // this.setState({ timer });
    // console.log(timer);
    // const second = 1000;
    // if (timer) {
    //   setTimeout(() => { timer -= 1; }, second);
    // } else {
    //   console.log(timer);
    // }
  }

  render() {
    const { timer } = this.state;
    console.log(timer);
    return (
      <h2>{timer}</h2>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   sendState: (user) => dispatch(getUserInfo(user)),
// });

export default Timer;
