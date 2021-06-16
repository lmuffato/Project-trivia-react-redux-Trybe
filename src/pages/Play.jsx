import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';

class Play extends Component {
  constructor() {
    super();

    this.countdown = this.countdown.bind(this);

    this.state = {
      time: 30,
      answered: false,
    };
  }

  countdown() {
    const second = 1000;
    const minTime = 0;
    const { time } = this.state;
    if (time > minTime) {
      setInterval(this.setState(
        (old) => ({
          time: old.time - 1,
        }),
      ), second);
    } else {
      this.setState({ answered: true });
    }
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

// Play.propTypes = {

// };

export default Play;
