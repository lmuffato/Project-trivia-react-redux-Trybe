import React from 'react';
import Header from '../Componentes/Header';
import PlayGame from '../Componentes/PlayGame';

class Game extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <PlayGame />
      </div>
    );
  }
}

export default Game;
