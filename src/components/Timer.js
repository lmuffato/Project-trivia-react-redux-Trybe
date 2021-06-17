import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Timer extends Component {
  constructor() {
    super();

    this.initTimer = this.initTimer.bind(this);
    this.reset = this.reset.bind(this);
    this.stop = this.stop.bind(this);

    this.state = {
      timer: 30,
      working: true,
    };
  }

  componentDidMount() {
    this.initTimer();
  }

  componentDidUpdate() {
    const { stop, reset } = this.props;
    const { working } = this.state;
    if (stop === true && working === true) {
      this.stop();
    }
    if (reset && working === false) {
      this.reset();
    }
  }

  initTimer() {
    const oneSecond = 1;
    const oneThousandMilliseconds = 1000;

    this.interval = setInterval(() => {
      const { working, timer } = this.state;
      const { handleZero } = this.props;
      if (timer === 0) {
        this.setState({
          working: false,
        }, handleZero());

        return;
      }
      if (working) {
        const count = timer - oneSecond;
        this.setState({
          timer: count,
        });
      }
    }, oneThousandMilliseconds);
  }

  reset() {
    this.setState({
      timer: 30,
      working: true,
    }, this.initTimer);
  }

  stop() {
    const { stop } = this.props;
    if (stop) {
      this.setState({
        working: false,
      });
    }
    clearInterval(this.interval);
  }

  render() {
    const { timer } = this.state;
    return (
      <div>
        <p>{ timer }</p>
      </div>
    );
  }
}

Timer.propTypes = {
  reset: PropTypes.bool.isRequired,
  stop: PropTypes.bool.isRequired,
  handleZero: PropTypes.func.isRequired,
};
