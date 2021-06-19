import React, { Component } from 'react';
import { object } from 'prop-types';
// import getGravatarImg from '../components/getGravatarImg';

class Ranking extends Component {
  constructor(props) {
    super(props);

    this.getCustomTestIdName = this.getCustomTestIdName.bind(this);
    this.getCustomTestIdScore = this.getCustomTestIdScore.bind(this);
  }

  getCustomTestIdName(index) {
    return `player-name-${index}`;
  }

  getCustomTestIdScore(index) {
    return `player-score-${index}`;
  }

  render() {
    const rankingList = JSON.parse(localStorage.getItem('ranking'));
    const { history } = this.props;

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          {!rankingList.length ? <span>Nenhum jogador rankeado!</span>
            : rankingList.map((player, index) => (
              <li key={ index }>
                <img src={ player.picture } alt="gravatar-profile" />
                <p data-testid={ this.getCustomTestIdName(index) }>{ player.name }</p>
                <p data-testid={ this.getCustomTestIdScore(index) }>{ player.score }</p>
              </li>
            ))}
        </ul>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Voltar ao início
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: object,
}.isRequired;

export default Ranking;
