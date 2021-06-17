import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { userAssertions } = this.props;
    const minScore = 3;
    return (
      <>
        <Header />
        <section>
          {(userAssertions < minScore)
            ? <span data-testid="feedback-text">Podia ser melhor...</span>
            : <span data-testid="feedback-text">Mandou bem!</span> }
        </section>
        <Link to="/ranking">
          <button type="button" data-test-id="btn-ranking">Ranking</button>
        </Link>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userAssertions: state.score.assertions,
});

Feedback.propTypes = {
  userAssertions: Proptypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
