import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { props: { numberOfCorrectAnswers } } = this;
    const numberOfGoodScore = 3;
    const goodScore = numberOfCorrectAnswers >= numberOfGoodScore;
    return (
      <>
        <div data-testid="feedback-text">feedback</div>
        <Header />
        <span data-testid="feedback-text">
          {goodScore ? 'Mandou bem!' : 'Podia ser melhor...'}
        </span>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  numberOfCorrectAnswers: state.questions.nOfCorrectAnswers,
});

Feedback.propTypes = {
  numberOfCorrectAnswers: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
