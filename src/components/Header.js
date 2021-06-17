import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, number } from 'prop-types';
import getGravatarImg from './getGravatarImg';

class Header extends Component {
  render() {
    const { playerName, gravatarEmail, score } = this.props;
    const gravatarURL = getGravatarImg(gravatarEmail);

    return (
      <div>
        <img
          alt="gravatar-profile"
          data-testid="header-profile-picture"
          src={ gravatarURL }
        />
        <p data-testid="header-player-name">{ playerName }</p>
        <p data-testid="header-score">{ score }</p>
      </div>
    );
  }
}

Header.propTypes = {
  playerName: string,
  score: number,
}.isRequired;

const mapStateToProps = (state) => ({
  playerName: state.player.playerName,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
