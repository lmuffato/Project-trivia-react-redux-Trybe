import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(window.localStorage.getItem('ranking'));
    return (
      <section>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol>
          {ranking.map((item, index) => (
            <li key={ index }>
              <p data-testid={ `player-name-${index}` }>{item.name}</p>
              <p data-testid={ `player-score-${index}` }>{item.score}</p>
            </li>)).sort((a, b) => a.score - b.score)}
        </ol>
        <Link to="/"><button data-testid="btn-go-home" type="button">Home</button></Link>
      </section>
    );
  }
}

export default Ranking;
