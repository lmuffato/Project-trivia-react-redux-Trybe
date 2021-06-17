import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  handleStorage() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    console.log(ranking);
    return (
      <ul>
        { ranking.map((player) => (
          <li key={ player.name }>
            <p>{ player.name }</p>
            <p>{ player.score }</p>
            <img src={ player.gravatar } alt={ player.name } />
          </li>
        )) }
      </ul>
    );
  }

  render() {
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        { this.handleStorage() }
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Tela Inicial
          </button>
        </Link>
      </>
    );
  }
}

export default Ranking;
