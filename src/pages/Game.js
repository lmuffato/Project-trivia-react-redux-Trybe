import React from 'react';
import { Link } from 'react-router-dom';

class Game extends React.Component {
  render() {
    return (
      <section>
        <Link to="/feedback">Teste</Link>
      </section>
    );
  }
}

export default Game;
