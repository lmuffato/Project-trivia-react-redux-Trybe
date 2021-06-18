import React from 'react';
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
    const { history } = this.props;
    const getPlayerStorage = localStorage.getItem('state');
    const convertPlayer = JSON.parse(getPlayerStorage);
    const player = Object.values(convertPlayer);
    const { assertions, score } = player[0];

    const result = assertions;
    const placar = score;
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
            { result === 0 ? 'Não acertou nenhuma pergunta'
              : `Acertou ${result} perguntas ` }
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

Feedback.propTypes = {
  history: propTypes.shape(),
}.isRequired;

export default Feedback;
