import React, { Component } from 'react';
import { string } from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, email } = this.props;

    return (
      <div className="header">
        <img
          src={ `https://www.gravatar.com/avatar/${md5(email)}` }
          alt="Sua Foto do Gravatar"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">0</p>
      </div>
    );
  }
}

Header.propTypes = {
  name: string,
  email: string,
}.isRequired;

export default Header;
