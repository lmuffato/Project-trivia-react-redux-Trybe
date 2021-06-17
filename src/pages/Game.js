import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Game extends Component {
  render() {
    const { props: { questions } } = this;
    return (
      <div>
        <Header />
        <Questions questions={ questions } />
      </div>
    );
  }
}

const mapSatateToProps = (state) => ({
  questions: state.questions.results,
});

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
    difficulty: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  })),
}.isRequired;

export default connect(mapSatateToProps, null)(Game);
