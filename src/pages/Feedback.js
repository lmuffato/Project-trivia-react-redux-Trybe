import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CryptoJS from 'crypto-js';
import Header from '../components/Header';
import '../style/Feedback.css';

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
    const { props: { numberOfCorrectAnswers: nCorrectAns } } = this;
    const numberOfGoodScore = 3;
    const goodScore = nCorrectAns >= numberOfGoodScore;
    const store = JSON.parse(localStorage.state);
    const { player: { score } } = store;
    return (
      <div className="feedback-container">
        <h1 data-testid="feedback-text">feedback</h1>
        <Header />
        <div className="feedback-info">
          <p data-testid="feedback-total-score">{`Score: ${Number(score)}`}</p>
          <p data-testid="feedback-total-question">{`Correct Answers: ${nCorrectAns}`}</p>
          <p data-testid="feedback-text">
            {goodScore ? 'Mandou bem!' : 'Podia ser melhor...'}
          </p>
        </div>
        <div className="feedback-buttons">
          <Link data-testid="btn-ranking" to="/ranking">
            Ver Ranking
          </Link>
          <br />
          <Link data-testid="btn-play-again" to="/">
            Jogar novamente
          </Link>
        </div>
      </div>
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
