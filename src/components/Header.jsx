import React, { Component } from 'react';

class Header extends Component {
  render() {
    const rankingInfo = localStorage.getItem('ranking');
    const rankingJson = JSON.parse(rankingInfo);
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ rankingJson.picture }
            alt="Foto do Usuario"
          />
          <h3 data-testid="header-player-name">{ rankingJson.name }</h3>
          <p data-testid="header-score">0</p>
        </header>
      </div>
    );
  }
}

export default Header;
