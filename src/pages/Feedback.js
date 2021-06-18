import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  renderLessThenThree() {
    return (
      <>
        Podia ser melhor...
      </>
    );
  }

  renderThreeOrMore() {
    return (
      <>
        Mandou bem!
      </>
    );
  }

  render() {
    const { history, assertionsStore, scoreStore } = this.props;
    const result = assertionsStore;
    const placar = scoreStore;
    const three = 3;
    return (
      <div>
        <Header />
        <main>
          <h2 data-testid="feedback-text">
            { result < three ? this.renderLessThenThree() : this.renderThreeOrMore() }
          </h2>
          <h3 data-testid="feedback-total-score">
            { `Placar: ${placar}` }
          </h3>
          <h3 data-testid="feedback-total-question">
            { `Acertos: ${result}` }
          </h3>
        </main>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Jogar novamente
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ver Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertionsStore: state.player.assertions,
  scoreStore: state.player.score,
});

Feedback.propTypes = {
  history: propTypes.shape(),
}.isRequired;

export default connect(mapStateToProps)(Feedback);
