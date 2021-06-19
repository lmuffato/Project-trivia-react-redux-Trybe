import React, { Component } from 'react';
// import TriviaLogoSvg from './TriviaGameLogoSvg.svg';
import TriviaLogoPng from './TriviaGameLogoPng.png';
import './ImgLogo.css';

class ImgLogo extends Component {
  render() {
    return (
      <div>
        <img alt="TriviaLogo" id="ImgLogin" src={ TriviaLogoPng } />
      </div>
    );
  }
}

export default ImgLogo;
