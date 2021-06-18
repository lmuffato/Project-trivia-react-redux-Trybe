import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import getUserImg from '../services/gravatarApi';
import { getItemFromLocalStorage } from '../services/storage';

class Ranking extends Component {
  constructor() {
    super();
    this.getInformations = this.getInformations.bind(this);
  }

  getInformations() {
    const allPlayers = getItemFromLocalStorage('ranking');
    return allPlayers;
  }

  render() {
    if (!this.getInformations()) return <h1>Ninguém no ranking ainda</h1>;
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        { this.getInformations().map((player, index) => (
          <div key={ index }>
            <figure display="inline">
              <img
                src={ getUserImg(player.gravatarEmail) }
                alt="userImg"
                className="gravatar"
              />
              <legend data-testid={ `player-name-${index}` }>{ player.name }</legend>
            </figure>
            <h3 data-testid={ `player-score-${index}` }>{ player.score }</h3>
          </div>
        )) }
        <Link to="/">
          <button data-testid="btn-go-home" type="button">Voltar ao início</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
