import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/Ranking.css';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const sortedRanking = ranking.sort((a, b) => b.score - a.score);

    return (
      <div className="ranking-container">
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol>
          {sortedRanking.map((player, index) => (
            <li key={ index } className="ranking-player-container">
              <p data-testid={ `player-name-${index}` }>{player.name}</p>
              <p data-testid={ `player-score-${index}` }>{player.score}</p>
              <img src={ player.picture } alt="player-avatar" />
            </li>
          ))}
        </ol>
        <Link data-testid="btn-go-home" to="/">Jogar Novamente</Link>
      </div>
    );
  }
}

export default Ranking;
