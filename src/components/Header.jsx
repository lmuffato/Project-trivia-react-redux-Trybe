import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, number } from 'prop-types';

class Header extends Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    return (
      <header>
        <img
          src={ gravatarEmail }
          alt=""
          data-testid="header-profile-picture"
        />

        <h2 data-testid="header-player-name">{ name }</h2>

        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

const mapStateToProps = ({ jogoReducer, loginReducer }) => ({
  name: loginReducer.user.name,
  score: jogoReducer.player.score,
  gravatarEmail: loginReducer.user.email,
});

Header.propTypes = {
  name: string,
  score: number,
  gravatarEmail: string,
}.isRequired;

export default connect(mapStateToProps)(Header);
