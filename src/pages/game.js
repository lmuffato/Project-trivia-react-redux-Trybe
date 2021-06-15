import React, { Component } from 'react';

class Game extends Component {
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
          <p>
            sua sessão é
            { localStorage.token }
          </p>
        </header>
      </div>
    );
  }
}

export default Game;
