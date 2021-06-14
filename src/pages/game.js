import React, { Component } from 'react';

class Game extends Component {
  render() {
    return(
     <div>
      OLá mundo, aqui é a página de Game
      Seu token é {localStorage.token}
     </div>
  )}
};

export default Game;
