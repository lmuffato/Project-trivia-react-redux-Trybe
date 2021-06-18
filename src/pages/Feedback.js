import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  componentDidMount() {
    this.sendRanking();
  }

  sendRanking() {
    const { nameStore, scoreStore, avatarStore } = this.props;

    const rankigStorage = localStorage.getItem('ranking');

    if (!rankigStorage) {
      const rankingStorage = [{
        name: nameStore,
        score: scoreStore,
        picture: avatarStore,
      }];

      localStorage.setItem('ranking', JSON.stringify(rankingStorage));
    } else {
      const getRankingStorage = JSON.parse(rankigStorage);
      getRankingStorage.push({
        name: nameStore,
        score: scoreStore,
        picture: avatarStore,
      });
      const rankingSorted = getRankingStorage.sort((a, b) => b.score - a.score);
      localStorage.setItem('ranking', JSON.stringify(rankingSorted));
    }
  }

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

  renderZeroMsg() {
    return (
      <>
        Não acertou nenhuma pergunta
        <span data-testid="feedback-total-question">{ 0 }</span>
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
          <h3>
            Placar:
            <span data-testid="feedback-total-score">{ placar }</span>
          </h3>
          <h3>
            { result === 0 ? this.renderZeroMsg()
              : (
                <span>
                  Acertou
                  <span data-testid="feedback-total-question">{ result }</span>
                  perguntas
                </span>) }
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
  nameStore: state.player.name,
  scoreStore: state.player.score,
  avatarStore: state.player.avatar,
});

Feedback.propTypes = {
  history: propTypes.shape(),
}.isRequired;

export default connect(mapStateToProps)(Feedback);
