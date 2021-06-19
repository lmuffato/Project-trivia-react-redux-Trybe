import React, { Component } from 'react';

class Ranking extends Component {
  constructor() {
    super();
    this.renderList = this.renderList.bind(this);
  }

  renderList() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <ul>
        { ranking
          .sort((a, b) => b.score - a.score)
          .map((user, index) => (
            <li key={ index }>
              imgUrl:
              {user.picture}
              <span data-testid={ `player-name-${index}` }>
                nome:
                {user.name}
              </span>
              <span data-testid={ `player-score-${index}` }>
                pontuação:
                {user.score}
              </span>
            </li>
          ))}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <section>{ this.renderList() }</section>
      </div>
    );
  }
}

export default Ranking;
