import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor() {
    super();
    this.renderRanking = this.renderRanking.bind(this);
  }

  // Requisito 17 - a função renderiza o ranking dos player em forma decrescente
  renderRanking() {
    const players = JSON.parse(localStorage.getItem('state'));
    console.log(players);

    // Ordena o Objeto de forma decrescente e salva no localStorage
    const orderedArray = players.sort((a, b) => b.score - a.score);
    localStorage.setItem('ranking', JSON.stringify(orderedArray));

    // Iteração sobre o objeto
    return (
      <div>
        { orderedArray.map(({ player }, index) => (
          <ul key="player-ranking">
            { console.log(player) }
            <img src={ `https://www.gravatar.com/avatar/${player.gravatarEmail}` } alt="ImagemDoUsuario" />
            <li data-testid={ `player-name-${index}` }>
              { player.name }
            </li>
            <li data-testid={ `player-score-${index}` }>
              { player.score }
            </li>
          </ul>
        )) }
      </div>
    );
  }

  // Requisito 18 - Renderiza um botão com uma rota para o início
  render() {
    return (
      <div>
        { this.renderRanking() }
        <Link to="/">
          <button data-testid="btn-go-home" type="button">Voltar ao início</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
