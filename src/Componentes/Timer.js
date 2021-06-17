import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { time } from '../actions';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    const { seconds } = this.state;
    const oneSec = 1000;
    if (seconds !== 0) {
      this.timer = setInterval(
        () => this.tick(),
        oneSec,
      );
    }
  }

  tick() {
    const { getTime } = this.props;
    const { seconds } = this.state;
    if (seconds !== 0) {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }
    getTime(seconds);
  }

  render() {
    const { seconds } = this.state;
    return (
      <div>
        <p>{ seconds }</p>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getTime: (seconds) => dispatch(time(seconds)),
});

Timer.propTypes = {
  getTime: PropTypes.number.isRequired,
};

export default connect(null, mapDispatchToProps)(Timer);
