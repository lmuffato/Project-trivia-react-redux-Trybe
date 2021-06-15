import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  getRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const ONE = 1;
    const ONE_NEGATIVE = -1;
    const ZERO = 0;
    if (ranking !== null) {
      const rankingOrdered = ranking.sort((a, b) => {
        if (a.score > b.score) return ONE_NEGATIVE;
        if (a.score < b.score) return ONE;
        return ZERO;
      });
      this.setState({
        ranking: rankingOrdered,
      });
    }
  }

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol>
          { ranking.map((player, index) => (
            <li key={ `${player.name}-${index}` }>
              <img src={ player.picture } alt="imagem do jogador" />
              <p>
                Nome:
                <span data-testid={ `player-name-${index}` }>{ player.name }</span>
              </p>
              <p>
                Pontuação:
                <span data-testid={ `player-score${index}` }>{ player.score }</span>
              </p>
            </li>
          )) }
        </ol>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">
            Voltar ao Inicio
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
