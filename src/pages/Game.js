import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Game extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Link to="/">
          <button type="button">voltar</button>
        </Link>
      </div>
    );
  }
}

export default Game;
