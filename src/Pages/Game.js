import React from 'react';
import Header from '../Componentes/Header';
import './game.css';
import PlayGame from '../Componentes/PlayGame';

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <Header />
        <PlayGame />
      </div>
    );
  }
}

export default Game;
