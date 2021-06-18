import React from 'react';
import { shape, string, number } from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends React.Component {

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
