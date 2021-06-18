import React, { Component } from 'react';
// import { connect } from 'react-redux';

class Timer extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   timer: 0,
    // };
    this.handleTimer = this.handleTimer.bind(this);
  }

  handleTimer() {
    const { timer } = this.props;
    // this.setState({ timer });
    console.log(timer);
    const second = 1000;
    setTimeout(() => (timer
      ? this.setState({ timer: timer - 1 }) : console.log(timer)), second);
    return <h2>{timer}</h2>;
  }

  render() {
    return (
      <>
        { this.handleTimer() }
      </>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   sendState: (user) => dispatch(getUserInfo(user)),
// });

export default Timer;
