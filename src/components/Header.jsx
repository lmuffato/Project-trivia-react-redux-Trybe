import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, number } from 'prop-types';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    return (
      <header className="header">
        <Link to="/">
          <img
            src={ gravatarEmail }
            alt="avatar"
            data-testid="header-profile-picture"
            className="gravatar-email"
          />
        </Link>
        <h2 data-testid="header-player-name">{ `Name: ${name}` }</h2>
        <p data-testid="header-score" className="score">{ score }</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  score: state.game.player.score,
  gravatarEmail: state.game.player.gravatarEmail,
  email: state.user.email,
});

Header.propTypes = {
  name: string,
  score: number,
  gravatarEmail: string,
}.isRequired;

export default connect(mapStateToProps)(Header);
