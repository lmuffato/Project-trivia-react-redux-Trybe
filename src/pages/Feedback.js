import React from 'react';
import Header from '../components/Header';
import TrueOrFalse from '../components/TrueOrFalse';

class Game extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <TrueOrFalse />
      </div>
    );
  }
}

export default Game;
