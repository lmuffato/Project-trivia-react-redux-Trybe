import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  convertEmailToHash(email) {
    const hash = md5(email).toString();
    return `https://www.gravatar.com/avatar/${hash}`;
  }

  render() {
    const { player: { name, gravatarEmail, score } } = this.props;
    return (
      <header>
        <img
          src={ this.convertEmailToHash(gravatarEmail) }
          alt="Avatar do Player"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Header.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
