import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Game extends React.Component {
  render() {
    return (
      <section>
        <Link to="/feedback">Teste</Link>
        <Header />
      </section>
    );
  }
}

export default Game;
