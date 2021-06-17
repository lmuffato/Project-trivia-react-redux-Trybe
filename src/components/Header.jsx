import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ localStorage.userImg }
            alt="Foto do Usuario"
          />
          <h3 data-testid="header-player-name">{ localStorage.usuario }</h3>
          <p data-testid="header-score">0</p>
        </header>
      </div>
    );
  }
}

export default Header;
