import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { sortRankingArray } from '../utils/functions';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.renderRankingList = this.renderRankingList.bind(this);
  }

  renderRankingList() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    if (!ranking) return <h2>Nenhum jogo encontrado</h2>;

    sortRankingArray(ranking);

    return (
      <ol>
        { ranking.map((player, index) => (
          <li key={ index }>
            <img
              src={ player.picture }
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
      <section>
        <h2 data-testid="ranking-title">Ranking</h2>
        {this.renderRankingList()}
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Voltar
          </button>
        </Link>
      </section>
    );
  }
}

export default Ranking;
