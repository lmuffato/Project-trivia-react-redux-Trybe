import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  renderRanking() {
    const rankingPlayers = JSON.parse(localStorage.getItem('ranking'));
    // const sortRank = rankingPlayers.sort((a, b) => b.score - a.score);
    // const sortRank = rankingPlayers.sort((a, b) => {
    //   const minusOne = -1;
    //   return ((a.score < b.score) ? 1 : (a.score === b.score) ? ((a.name > b.name) ? 1 : minusOne) : minusOne)
    // });
    // const sortRank = rankingPlayers.sort((a, b) => {
    //   const minusOne = -1;
    //   if (a.score < b.score) {
    //     return 1;
    //   } if (a.score === b.score) {
    //     return a.name > b.name;
    //   }
    //   return minusOne;
    // });
    return (
      <ul>
        { rankingPlayers.map((ranking, index) => {
          const hashEmail = md5(ranking.gravatarEmail).toString();
          return (
            <li key={ index }>
              <div>
                <img src={ `https://www.gravatar.com/avatar/${hashEmail}` } alt="Avatar" />
                <p data-testid={ `player-name-${index}` }>{ ranking.name }</p>
                <p data-testid={ `player-score-${index}` }>{ ranking.score }</p>
              </div>
            </li>
          );
        }) }
      </ul>
    );
  }

  render() {
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Play again
          </button>
        </Link>
        { this.renderRanking() }
      </>
    );
  }
}

export default Ranking;
