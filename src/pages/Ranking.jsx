import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { sortRankingArray } from '../utils/functions';

import '../styles/ranking.css';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.renderRankingList = this.renderRankingList.bind(this);
  }

  renderRankingList() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    if (!ranking) return <h2>Nenhum jogo encontrado</h2>;

    const orderedRank = sortRankingArray(ranking);

    return (
      <ol>
        { orderedRank.map((player, index) => (
          <li key={ index }>
            <img
              src={ player.picture }
              alt={ player.name }
            />
            <div className="ranking-texts">
              <span
                data-testid={ `player-name-${index}` }
                className="ranking-player-name"
              >
                { player.name }

              </span>
              <span
                data-testid={ `player-score-${index}` }
                className="ranking-player-score"
              >
                { player.score }
                {' '}
                Pontos
              </span>
            </div>
          </li>
        )) }
      </ol>
    );
  }

  render() {
    return (
      <section className="ranking-page">
        <div className="ranking-content">
          <Link to="/">
            <button
              type="button"
              data-testid="btn-go-home"
            >
              Voltar
            </button>
          </Link>
          <h2 data-testid="ranking-title">Ranking</h2>
          {this.renderRankingList()}
        </div>
      </section>
    );
  }
}

export default Ranking;
