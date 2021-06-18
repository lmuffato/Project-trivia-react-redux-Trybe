import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { number } from 'prop-types';
import Header from '../components/Header';
import { clearPlayerState } from '../actions/index';

class Feedback extends React.Component {
  constructor() {
    super();

    this.assertionsMenssage = this.assertionsMenssage.bind(this);
  }

  assertionsMenssage() {
    const { assertions } = this.props;
    const minimumAssertions = 3;
    if (assertions < minimumAssertions) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  render() {
    const INITIAL_STATE = {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    };
    // const state = JSON.parse(localStorage.getItem('state'));
    const { score, assertions, resetPlayerState } = this.props;
    console.log(typeof score);
    console.log(typeof assertions);
    return (
      <section>
        <Header />
        <h1 data-testid="feedback-text">
          {this.assertionsMenssage()}
        </h1>
        <h2>
          Você acertou
          <span data-testid="feedback-total-question">{` ${assertions} `}</span>
          questões!
        </h2>
        <h2>
          Um total de
          <span data-testid="feedback-total-score">{` ${score} `}</span>
          pontos
        </h2>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => resetPlayerState(INITIAL_STATE) }
          >
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">
            Ver Ranking
          </button>
        </Link>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  resetPlayerState: (payload) => dispatch(clearPlayerState(payload)),
});

Feedback.propTypes = {
  assertions: number,
  score: number,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
