import React from 'react';
import { shape, string, number } from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.redirectToInitialPage = this.redirectToInitialPage.bind(this);
    this.redirectToRanking = this.redirectToRanking.bind(this);
  }

  componentDidMount() {
    const { getName, getUrl, getScore } = this.props;
    const player = {
      player: {
        name: getName,
        assertions: 0,
        score: getScore,
        gravatarEmail: getUrl,
      },
    };
    localStorage.setItem('state', JSON.stringify(player));
  }
  // https://stackoverflow.com/questions/34735580/how-to-do-a-redirect-to-another-route-with-react-router referencia adaptada para 15 e 16.

  redirectToInitialPage() {
    const { history } = this.props;
    history.push('/');
  }

  redirectToRanking() {
    const { history } = this.props;
    history.push('/ranking');
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
            { getScore }
          </h3>
        </header>
        <h1 data-testid="feedback-text">
          Mensagem de Feedback
        </h1>

        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.redirectToInitialPage }
        >
          Jogar novamente
        </button>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ this.redirectToRanking }
        >
          Ver Ranking
        </button>
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
