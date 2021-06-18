import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    this.handleSort();
  }

  handleSort() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    console.log(ranking);
    const sortedRanking = ranking.sort((a, b) => b.score - a.score);
    this.setState({
      ranking: [...sortedRanking],
    });
  }

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Page Ranking</h1>
        <ol>
          {ranking.map((player, index) => (
            <li key={ index }>
              <div>
                <img src={ player.gravatar } alt="player" />
                <h1 data-testid={ `player-name-${index}` }>{player.name}</h1>
                <p data-testid={ `player-score-${index}` }>{player.score}</p>
              </div>
            </li>
          ))}
        </ol>
        <Link to="/" data-testid="btn-go-home">Voltar</Link>
      </div>
    );
  }
}

export default Ranking;
