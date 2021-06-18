import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.renderBadScore = this.renderBadScore.bind(this);
    this.renderGoodScoore = this.renderGoodScoore.bind(this);
  }

  renderGoodScoore() { return (<h1 data-testid="feedback-text">Mandou bem!</h1>); }

  renderBadScore() { return (<h1 data-testid="feedback-text">Podia ser melhor...</h1>); }

  render() {
    const { score, assertions } = this.props;

    const minimalScore = 3;

    return (
      <>
        <Header />
        { assertions >= minimalScore ? this.renderGoodScoore() : this.renderBadScore() }
        <h3>
          Você acertou:
          {' '}
          <span data-testid="feedback-total-question">{assertions}</span>
          {' '}
          questões.
        </h3>
        <h3>
          Um total de:
          {' '}
          <span data-testid="feedback-total-score">{score}</span>
          {' '}
          pontos!
        </h3>
        <Link to="/ranking">
          <button type="submit" data-testid="btn-ranking">
            Ver Ranking
          </button>
        </Link>
        <Link to="/">
          <button type="submit" data-testid="btn-play-again">
            Jogar Novamente
          </button>
        </Link>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.userReducer.score,
  assertions: state.userReducer.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
