import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { userAssertions, userScore, userName, userEmail } = this.props;
    const minScore = 3;
    const lsRanking = window.location.getItem('ranking');
    if (lsRanking) {
      const ranking = JSON.parse(lsRanking);
      ranking.push({
        nome: userName,
        score: userScore,
        picture: `https://www.gravatar.com/avatar/${md5(userEmail)}` });

      window.localStorage.setItem('ranking', JSON.stringify(ranking));
    } else {
      const ranking = [{
        nome: userName,
        score: userScore,
        picture: `https://www.gravatar.com/avatar/${md5(userEmail)}` }];

      window.localStorage.setItem('ranking', JSON.stringify(ranking));
    }
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
            <button type="button" data-test-id="btn-ranking">Ranking</button>
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
