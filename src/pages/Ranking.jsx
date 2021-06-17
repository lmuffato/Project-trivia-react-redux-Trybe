import React, { Component } from 'react';
import getUserImg from '../services/gravatarApi';
import { getItemFromLocalStorage } from '../services/storage';

class Ranking extends Component {
  constructor() {
    super();
    this.getInformations = this.getInformations.bind(this);
    this.orderArrayExpense = this.orderArrayExpense.bind(this);
  }

  getInformations() {
    const allPlayers = getItemFromLocalStorage('ranking');
    const orderArray = allPlayers.sort(this.orderArrayExpense);
    return orderArray;
  }

  orderArrayExpense(a, b) {
    const positionInArray = -1;
    if (a.score < b.score) {
      return 1;
    } if (a.score > b.score) return positionInArray;
    return 0;
  }

  render() {
    console.log(localStorage.ranking.length);
    console.log(this.getInformations());
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        { this.getInformations().map((player, index) => (
          <div key={ index }>
            <figure>
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
      </div>
    );
  }
}

export default Ranking;
