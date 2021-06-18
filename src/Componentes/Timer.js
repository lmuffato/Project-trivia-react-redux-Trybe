// Requisito 8 - implementação do cronometro
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { time } from '../actions';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // seconds: 30,
      seconds: 30,
      btnPlayPause: "Play",
      // isTimer: null,
    };
    this.counter = null;
    this.initTimer = this.initTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.tick = this.tick.bind(this);
    // this.setTimer = this.setTimer.bind(this);
    this.constraintConditionOfTime = this.constraintConditionOfTime.bind(this);
  }

  initTimer() {
    if (this.counter) {
      this.pauseTimer();
      this.setState({ btnPlayPause: "Play" });
    } else {
      this.counter = setInterval(() => {
        this.setState({ seconds: this.state.seconds - 1 });
      }, 1000);
      this.setState({ btnPlayPause: "Pause" });
    }
  }

  pauseTimer() {
    clearInterval(this.counter);
    this.counter = null;
  }


  // componentDidMount() {
  //      // this.setTimer();
  //   // const { timerState } = this.props;
  //   // if (timerState === true) this.constraintConditionOfTime();
  // }

  // setTimer() {
  //   const { isTimer } = this.state;
  //   const { timerState } = this.props;
  //   this.setState({
  //     isTimer: timerState,
  //   }, () => console.log(isTimer));
  // }

  constraintConditionOfTime() {
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
        <div className="btns">
          <input
            type="button"
            value={ this.state.btnPlayPause }
            onClick={ this.initTimer }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  timerState: state.triviaReducer.timer,
});

const mapDispatchToProps = (dispatch) => ({
  getTime: (seconds) => dispatch(time(seconds)),
});

Timer.propTypes = {
  getTime: PropTypes.number,
  timerState: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
