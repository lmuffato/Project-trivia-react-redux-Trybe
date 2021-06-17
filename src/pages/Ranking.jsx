import React, { Component } from 'react';
import { sortRankingArray } from '../utils/functions';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.renderRankingList = this.renderRankingList.bind(this);
  }

  renderRankingList() {
    const ranking = JSON.parse(localStorage.getItem('state'));
    if (!ranking) return <h2>Nenhum jogo encontrado</h2>;

    sortRankingArray(ranking);

    return (
      <ol>
        { ranking.map(({ player }, index) => (
          <li key={ index }>
            <img
              src={ player.gravatarEmail }
              alt={ player.name }
            />
            <span data-testid={ `player-name-${index}` }>{ player.name }</span>
            <span data-testid={ `player-score-${index}` }>{ player.score }</span>
          </li>
        )) }
      </ol>
    );
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {this.renderRankingList()}
      </div>
    );
  }
}
export default Ranking;
