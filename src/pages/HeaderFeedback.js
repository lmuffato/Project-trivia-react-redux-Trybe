import React, { Component } from 'react';
// import md5 from 'crypto-js/md5';

class HeaderFeedback extends Component {
  constructor() {
    super();
    this.state = {
      score: '',
      userName: '',
    };
  }

  render() {
    const { userName, score } = this.state;
    return (
      <div>
        <img data-testid="header-profile-picture" alt="Imagem do usuario" />
        <spam data-testid="header-player-name">{ userName }</spam>
        <spam data-testid="header-score">{ score }</spam>
        <p>header</p>
      </div>
    );
  }
}

export default HeaderFeedback;
