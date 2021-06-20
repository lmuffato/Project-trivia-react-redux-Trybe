import React from 'react';
import { shape, string, number } from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  constructor() {
    super();

    this.moreThanThreePoins = this.moreThanThreePoins.bind(this);
    this.lessThanThreePoints = this.lessThanThreePoints.bind(this);
    this.redirectToInitialPage = this.redirectToInitialPage.bind(this);
    this.redirectToRanking = this.redirectToRanking.bind(this);
  }
  // https://stackoverflow.com/questions/34735580/how-to-do-a-redirect-to-another-route-with-react-router
  // referencia para requisitos 15 e 16

  redirectToInitialPage() {
    const { history } = this.props;
    history.push('/');
  }

  redirectToRanking() {
    const { history } = this.props;
    history.push('/ranking');
  }

  moreThanThreePoins() {
    return (
      <p data-testid="feedback-text">Podia ser melhor...</p>
    );
  }

  lessThanThreePoints() {
    return (
      <p data-testid="feedback-text">Mandou bem!</p>
    );
  }

  render() {
    const { getName, getUrl, getScore } = this.props;
    return (
      <main>
        <header>
          <img
            data-testid="header-profile-picture"
            alt="gravatar"
            src={ getUrl }
          />
          <h3 data-testid="header-player-name">
            Nome do Jogador:
            { getName }
          </h3>
          <h3 data-testid="header-score">
            Pontuação:
            { getScore }
          </h3>
        </header>

        <div>
          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ this.redirectToInitialPage }
          >
            Jogar novamente
          </button>
        </div>
        <div>
          <button
            data-testid="btn-ranking"
            type="button"
            onClick={ this.redirectToRanking }
          >
            Ver Ranking
          </button>
        </div>
      </main>

    );
  }
}

const mapStateToProps = (state) => ({
  getName: state.player.name,
  getScore: state.player.score,
  getUrl: state.player.gravatar,
});

Feedback.propTypes = {
  player: shape({
    name: string,
    assertions: number,
    score: number,
    gravatarEmail: string,
  }),
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
