import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { props: { numberOfCorrectAnswers: nCorrectAns } } = this;
    const numberOfGoodScore = 3;
    const goodScore = nCorrectAns >= numberOfGoodScore;
    const store = JSON.parse(localStorage.state);
    const { player: { score } } = store;
    return (
      <>
        <div data-testid="feedback-text">feedback</div>
        <Header />
        <span data-testid="feedback-total-score">{Number(score)}</span>
        <p data-testid="feedback-total-question">{/* nCorrectAns */ 0}</p>
        <p data-testid="feedback-text">
          {goodScore ? 'Mandou bem!' : 'Podia ser melhor...'}
        </p>
        <Link data-testid="btn-ranking" to="/ranking">
          Ver Ranking
        </Link>
        <br />
        <Link data-testid="btn-play-again" to="/">
          Jogar novamente
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
