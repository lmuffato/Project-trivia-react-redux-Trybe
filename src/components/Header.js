import React from 'react';
import CryptoJS from 'crypto-js';
import '../style/Header.css';

class Header extends React.Component {
  gravatar() {
    const jsonGetState = localStorage.getItem('state');
    const jsonConvState = JSON.parse(jsonGetState);
    const hash = CryptoJS.MD5(jsonConvState.player.email).toString();
    return hash;
  }

  globalState() {
    const jsonGetState = localStorage.getItem('state');
    const jsonConvState = JSON.parse(jsonGetState);
    return jsonConvState;
  }

  render() {
    const hash = this.gravatar();
    const global = this.globalState();
    return (
      <div className="header-container">
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hash}` } alt="imagem de perfil" />
        <p data-testid="header-player-name">{ global.player.name }</p>
        <p data-testid="header-score">{ global.player.score }</p>
      </div>
    );
  }
}

export default Header;
