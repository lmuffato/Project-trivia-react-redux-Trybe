import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { string, number } from 'prop-types';

class Header extends Component {
  render() {
    const { playerName, score } = this.props;
    const hashEmail = md5('teste@gmail.com').toString();
    const gravatarURL = `https://www.gravatar.com/avatar/${hashEmail}`; // Armazenar no state

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
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
