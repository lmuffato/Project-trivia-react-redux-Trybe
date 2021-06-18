import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  componentWillUnmount() {
    this.handleRaking();
  }

  conditional() {
    const { assertions } = this.props;
    const average = 3;
    if (assertions >= average) return 'Mandou bem!';
    return 'Podia ser melhor...';
  }

  handleRaking() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const { name, email, score } = player;
    const hash = md5(email);
    const gravatar = `https://www.gravatar.com/avatar/${hash}`;
    const rankingPlayer = { name, gravatar, score };
    const rankingInLocalStorage = JSON.parse(localStorage.getItem('ranking'));
    if (rankingInLocalStorage) {
      rankingInLocalStorage.push(rankingPlayer);
      localStorage.setItem('ranking', JSON.stringify(rankingInLocalStorage));
    } else {
      localStorage.setItem('ranking', JSON.stringify([rankingPlayer]));
    }
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">{ this.conditional() }</h1>
        <h2 data-testid="feedback-total-score">{score}</h2>
        <h2 data-testid="feedback-total-question">{ assertions }</h2>
        <Link to="/" data-testid="btn-play-again">Jogar novamente</Link>
        <Link to="/ranking" data-testid="btn-ranking">Ver Ranking</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.loginReducer.player.assertions,
  score: state.loginReducer.player.score,
});

Feedback.propTypes = {
  assertions: propTypes.number.isRequired,
  score: propTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
