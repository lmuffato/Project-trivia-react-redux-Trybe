import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, number } from 'prop-types';
import getGravatarImg from './getGravatarImg';

class Header extends Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    const gravatarURL = getGravatarImg(gravatarEmail);

    return (
      <div>
        <img
          alt="gravatar-profile"
          data-testid="header-profile-picture"
          src={ gravatarURL }
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </div>
    );
  }
}

Header.propTypes = {
  name: string,
  score: number,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
