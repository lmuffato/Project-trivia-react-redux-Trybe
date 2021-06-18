import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, number } from 'prop-types';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';

class Header extends Component {
  renderGravatarImage() {
    const { email } = this.props;
    const hashMD5 = md5(email).toString();
    return (
      <img
        src={ `https://www.gravatar.com/avatar/${hashMD5}` }
        alt="avatar"
        data-testid="header-profile-picture"
      />);
  }

  render() {
    const { name, score } = this.props;
    console.log(name, 'log do name');
    return (
      <header className="header">
        <Link to="/">
          {this.renderGravatarImage()}
        </Link>
        <h2 data-testid="header-player-name">{ name }</h2>
        <p data-testid="header-score" className="score">{ score }</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  score: state.game.player.score,
  email: state.user.email,
});

Header.propTypes = {
  name: string,
  score: number,
  gravatarEmail: string,
}.isRequired;

export default connect(mapStateToProps)(Header);
