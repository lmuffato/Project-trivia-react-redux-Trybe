import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { disableButton } from '../redux/actions';

const second = 1000;

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 30,
      breakSet: true,
    };
    this.setTime = this.setTime.bind(this);
  }

  componentDidMount() {
    setInterval(() => this.setTime(), second);
  }

  setTime() {
    const { currentTime, breakSet } = this.state;
    const { disable } = this.props;
    if (currentTime >= 1) {
      this.setState({ currentTime: currentTime - 1 });
    } if (currentTime === 0 && breakSet) {
      disable(true);
      this.setState({ breakSet: false });
    } else {
      return null;
    }
  }

  render() {
    const { currentTime } = this.state;
    return (
      <div>
        { currentTime }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  disable: (payload) => dispatch(disableButton(payload)),
});

Timer.propTypes = {
  disable: PropTypes.bool,
}.isRequired;

export default connect(null, mapDispatchToProps)(Timer);
