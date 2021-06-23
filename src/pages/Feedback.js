import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    let result;
    const minimum = 3;
    if (assertions >= minimum) {
      result = 'Mandou bem!';
    } else {
      result = 'Podia ser melhor...';
    }
    return (
      <div>
        <h2 data-testid="feedback-text">{ result }</h2>
        <Header />
        <h2>
          Você fez
          {' '}
          <span
            data-testid="feedback-total-score"
          >
            { score }
          </span>
          {' '}
          pontos
        </h2>
        <h2>
          Você acertou
          {' '}
          <span
            data-testid="feedback-total-question"
          >
            { assertions }
          </span>
          {' '}
          questões
        </h2>
        <Link to="/" data-testid="btn-play-again">
          Jogar novamente
        </Link>
        <Link to="/ranking" data-testid="btn-ranking">
          Ver Ranking
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.questions.assertions,
  score: state.questions.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
