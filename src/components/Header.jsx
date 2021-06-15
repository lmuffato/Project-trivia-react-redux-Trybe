import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, shape } from 'prop-types';

import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { user } = this.props;
    const { name, email } = user;
    const hash = md5(email).toString();
    console.log(hash);
    return (
      <header>
        <img src={ `https://www.gravatar.com/avatar/${hash}.png` } alt="Gravatar" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{`Jogador ${name}`}</p>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
});

Header.propTypes = {
  user: shape({
    name: string.isRequired,
    email: string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
