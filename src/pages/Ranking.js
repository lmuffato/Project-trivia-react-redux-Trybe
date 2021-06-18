import React from 'react';
import { Link } from 'react-router-dom';
// informações renderizadas a partir desempenho no game.
class Ranking extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title"> RANKING</h1>

        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
          >
            Início
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
