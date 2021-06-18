import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  orderMyArray(playerRank) {
    playerRank.sort((a, b) => b.score - a.score);
  }

  render() {
    const playerRank = JSON.parse(localStorage.getItem('ranking'));
    this.orderMyArray(playerRank);
    return (
      <div>
        <h1 data-testid="ranking-title">Meu Ranking</h1>
        { playerRank.map((player, index) => (
          <p key={ `player-name-${index}` }>
            <span data-testid={ `player-name-${index}` }>
              { player.name }
            </span>
            <span> - </span>
            <span data-testid={ `player-score-${index}` }>
              { player.score }
            </span>
          </p>
        ))}
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Voltar ao início </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
