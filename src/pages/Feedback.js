import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';

class Feedback extends Component {
  updateRanking() {
    const { userName, userScore, userEmail } = this.props;
    if (window.localStorage.getItem('ranking')) {
      const rankingToPush = JSON.parse(window.localStorage.getItem('ranking'));
      rankingToPush.push({ name: userName, score: userScore, picture: `https://www.gravatar.com/avatar/${md5(userEmail)}` });
      rankingToPush.sort((a, b) => b.score - a.score);
      window.localStorage.setItem('ranking', JSON.stringify(rankingToPush));
    } else {
      const firstRankingData = [{ name: userName, score: userScore, picture: `https://www.gravatar.com/avatar/${md5(userEmail)}` }];
      window.localStorage.setItem('ranking', JSON.stringify(firstRankingData));
    }
  }

  render() {
    const { userAssertions, userScore } = this.props;
    const minScore = 3;
    this.updateRanking();
    return (
      <>
        <Header />
        <section>
          {(userAssertions < minScore)
            ? <span data-testid="feedback-text">Podia ser melhor...</span>
            : <span data-testid="feedback-text">Mandou bem!</span> }
          <h3>A sua pontuação total foi: </h3>
          <span data-testid="feedback-total-score">
            {userScore}
          </span>
          <h3>Quantidades de respostas corretas: </h3>
          <span data-testid="feedback-total-question">{ userAssertions }</span>
          <Link to="/ranking">
            <button type="button" data-testid="btn-ranking">Ver Ranking</button>
          </Link>
          <Link to="/">
            <button type="button" data-testid="btn-play-again">Jogar novamente</button>
          </Link>
        </section>

      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userAssertions: state.score.assertions,
  userScore: state.score.score,
  userName: state.login.name,
  userEmail: state.login.email,
});

Feedback.propTypes = {
  userAssertions: Proptypes.number,
  userScore: Proptypes.number,
  userName: Proptypes.string,
  userEmail: Proptypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
