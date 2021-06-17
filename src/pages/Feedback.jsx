import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  conditional() {
    const { assertions } = this.props;
    const average = 3;
    if (assertions >= average) return 'Mandou bem!';
    return 'Podia ser melhor...';
  }

  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">{ this.conditional() }</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.loginReducer.player.assertions,
});

Feedback.propTypes = {
  assertions: propTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
