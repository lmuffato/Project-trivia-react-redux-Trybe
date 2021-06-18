import React, { Component } from 'react';

class Header extends Component {
  render() {
    const rankingInfo = localStorage.getItem('ranking');
    const rankingJson = JSON.parse(rankingInfo);
    const stateInfo = localStorage.getItem('state');
    const stateJson = JSON.parse(stateInfo);
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ rankingJson.picture }
            alt="Foto do Usuario"
          />
          <h3 data-testid="header-player-name">{ rankingJson.name }</h3>
          <p data-testid="header-score">{ console.log(stateJson.player.score) }</p>
        </header>
      </div>
    );
  }
}

export default Header;
