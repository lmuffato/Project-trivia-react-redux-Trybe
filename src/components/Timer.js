import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { disable, hidden } from '../actions';

class Timer extends Component {
  constructor() {
    super();

    this.state = { currentTime: 30 };
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.tick();
  }

  tick() {
    const oneSecond = 1000;
    const { editDisable, editHidden } = this.props;
    const set = setInterval(() => {
      this.setState((prevState) => ({
        currentTime: prevState.currentTime - 1,
      }));
      const { currentTime } = this.state;
      if (currentTime === 0) {
        clearInterval(set);
        editDisable(true);
        editHidden(false);
      }
    }, oneSecond);
  }

  render() {
    const { currentTime } = this.state;
    return (
      <div>
        <h2>{currentTime}</h2>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  editDisable: (payload) => dispatch(disable(payload)),
  editHidden: (payload) => dispatch(hidden(payload)),
});

Timer.propTypes = {
  editDisable: func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Timer);
