import React from 'react';
import { Link } from 'react-router-dom';

class Game extends React.Component {
  render() {
    return (
      <div>
        <p>game over</p>
        <Link to="/">
          <button type="button">voltar</button>
        </Link>
      </div>
    );
  }
}

export default Game;
