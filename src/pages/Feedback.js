import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { number } from 'prop-types';
import Header from '../components/Header';

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
    const { score, assertions } = this.props;
    return (
      <section>
        <Header />
        <h1 data-testid="feedback-text">
          {this.assertionsMenssage()}
        </h1>
        <h2 data-testid="feedback-total-question">
          {`Você acertou ${assertions} questões!`}
        </h2>
        <h2 data-testid="feedback-total-score">
          {`Um total de ${score} pontos`}
        </h2>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">
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

Feedback.propTypes = {
  assertions: number,
  score: number,
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
