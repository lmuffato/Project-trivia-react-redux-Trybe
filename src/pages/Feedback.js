import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CryptoJS from 'crypto-js';
import Header from '../components/Header';

class Feedback extends Component {
  componentDidMount() {
    this.saveGameToRanking();
  }

  saveGameToRanking() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { player: { name, score, email } } = state;
    const hash = CryptoJS.MD5(email).toString();

    const LSranking = JSON.parse(localStorage.getItem('ranking'));
    const updatedRanking = [
      ...LSranking,
      { name, score, picture: `https://www.gravatar.com/avatar/${hash}` },
    ];
    localStorage.setItem('ranking', JSON.stringify(updatedRanking));
  }

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
        <Link data-testid="btn-ranking" to="/ranking">
          Ver Ranking
        </Link>
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
