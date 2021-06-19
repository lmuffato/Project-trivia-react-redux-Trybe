import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { resetScore } from '../redux/actions/setScore';

class UserFeedback extends Component {
  constructor() {
    super();
    this.renderFeedback = this.renderFeedback.bind(this);
    this.renderPlayAgain = this.renderPlayAgain.bind(this);
    this.handleScore = this.handleScore.bind(this);
  }

  handleScore() {
    const { zeroScore } = this.props;
    zeroScore();
  }

  renderFeedback() {
    const { userAssert } = this.props;
    const magicNumber = 3;
    const condition = userAssert >= magicNumber;
    return (
      <h2 data-testid="feedback-text">
        { condition ? 'Mandou bem!' : 'Podia ser melhor...' }
      </h2>
    );
  }

  renderPlayAgain() {
    return (
      <Link to="/">
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleScore }
        >
          Jogar novamente
        </button>
      </Link>
    );
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
        { this.renderPlayAgain() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userScore: state.score.score,
  userAssert: state.score.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  zeroScore: () => dispatch(resetScore()),
});

UserFeedback.propTypes = {
  userAssert: PropTypes.number,
  userScore: PropTypes.number,
  zeroScore: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(UserFeedback);
