import React from 'react';

class Timer extends React.Component {
  render() {
    const { timer } = this.props;
    return (
      <h2>{timer}</h2>
    );
  }
}

export default Timer;
