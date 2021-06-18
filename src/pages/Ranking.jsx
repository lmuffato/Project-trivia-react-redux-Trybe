import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  handleStorage() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const mNumber = -1;
    const sortedRanking = ranking.sort((a, b) => {
      if (a.score > b.score) {
        return mNumber;
      }
      if (a.score < b.score) {
        return 1;
      }
      return 0;
    });
    console.log(sortedRanking);
    return (
      <ul>
        { sortedRanking.map((player, index) => (
          <li key={ player.name }>
            <p data-testid={ `player-name-${index}` }>{ player.name }</p>
            <p data-testid={ `player-score-${index}` }>{ player.score }</p>
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
