import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class UserFeedback extends Component {
  constructor() {
    super();
    this.renderFeedback = this.renderFeedback.bind(this);
  }

  renderFeedback() {
    const { userAssert } = this.props;
    const magicNumber = 3;
    const condition = userAssert >= magicNumber;
    return condition ? <h2 data-testid="feedback-text">Mandou bem!</h2>
      : <h2 data-testid="feedback-text">Podia ser melhor...</h2>;
  }

  render() {
    const { userAssert, userScore } = this.props;
    return (
      <div>
        { this.renderFeedback() }
        <div>
          <h3>Score:</h3>
          <p data-testid="feedback-total-score">{ userScore }</p>
        </div>
        <div>
          <h3>Questions:</h3>
          <p data-testid="feedback-total-question">{ userAssert }</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userScore: state.score.score,
  userAssert: state.score.assertions,
});

UserFeedback.propTypes = {
  userAssert: PropTypes.number,
  userScore: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(UserFeedback);
