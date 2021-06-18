import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions, score } = this.props;
    const Rate = 3;
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">
          {assertions >= Rate ? 'Mandou bem!' : 'Podia ser melhor...'}
        </h1>
        <span>Você acertou:</span>
        <span data-testid="feedback-total-question">
          {assertions}
        </span>
        <span>Seus pontos totais são:</span>
        <span data-testid="feedback-total-score">
          {score}
        </span>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Jogar novamente</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
