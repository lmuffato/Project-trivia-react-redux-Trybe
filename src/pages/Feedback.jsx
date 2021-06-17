import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  conditional() {
    const { assertions } = this.props;
    const average = 3;
    if (assertions >= average) return 'Mandou bem!';
    return 'Podia ser melhor...';
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
