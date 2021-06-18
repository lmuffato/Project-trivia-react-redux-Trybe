import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Result extends Component {
  constructor() {
    super();
    this.feedbackMessage = this.feedbackMessage.bind(this);
  }

  feedbackMessage() {
    const TRES = 3;
    const { assertions } = this.props;
    const msg = (assertions < TRES) ? 'Podia ser melhor...' : 'Mandou bem!';
    return msg;
  }

  render() {
    return (
      <div>
        <Header />
        <h3 data-testid="feedback-text">{this.feedbackMessage()}</h3>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    assertions: state.trivia.correctAnswers,
  };
}

Result.propTypes = {
  assertions: PropTypes.number,
}.isRequired;
export default connect(mapStateToProps)(Result);
