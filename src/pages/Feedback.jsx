import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.getAssertion = this.getAssertion.bind(this);
  }

  getAssertion() {
    const { player: { assertions } } = this.props;
    const n = 3;
    if (assertions >= n) {
      return 'Mandou bem!';
    }
    if (assertions < n) {
      return 'Podia ser melhor...';
    }
  }

  getAssertionsText(assertions) {
    switch (assertions) {
    case 0:
      return 'Não acertou nenhuma pergunta';
    default:
      return `Acertou ${assertions} perguntas`;
    }
  }

  render() {
    const { player: { score, assertions } } = this.props;
    return (
      <>
        <Header />
        <h1> Feedback </h1>
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">
          { assertions }
        </p>
        <p data-testid="feedback-text">{ this.getAssertion() }</p>
        <form action="/ranking">
          <button data-testid="btn-ranking" type="submit">Ranking</button>
        </form>
        <form action="/">
          <button
            type="submit"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Feedback.propTypes = {
  player: PropTypes.shape({
    score: PropTypes.number,
    assertions: PropTypes.number,
  }).isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
