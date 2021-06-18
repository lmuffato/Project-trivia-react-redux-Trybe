import React from 'react';
import propTypes from 'prop-types';

class Ranking extends React.Component {
  renderRanking() {
    const rankings = JSON.parse(localStorage.getItem('ranking'));

    return (
      <ul>
        { rankings.map((ranking, index) => (
          <li key={ index }>
            <img alt="user_player" src={ ranking.picture } />
            <p data-testid={ `player-name-${index}` }>{ ranking.name }</p>
            <p data-testid={ `player-score-${index}` }>{ ranking.score }</p>
          </li>
        )) }
      </ul>
    );
  }

  render() {
    const { history } = this.props;
    return (
      <main>
        <h1 data-testid="ranking-title">Ranking</h1>
        { this.renderRanking() }
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Jogar!
        </button>
      </main>
    );
  }
}

Ranking.propTypes = {
  history: propTypes.shape(),
}.isRequired;

export default Ranking;
