import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor() {
    super();
    this.renderRanking = this.renderRanking.bind(this);
  }

  // Requisito 17 - a função renderiza o ranking dos player em forma decrescente
  renderRanking() {
    // Pega o token do localStorage
    const gravatarImg = localStorage.getItem('token');
    const localRanking = JSON.parse(localStorage.getItem('state'));
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    // Cria um array de objetos como exemplo do que futuramente vai ser iterado
    const newObj = {
      name: localRanking.player.name,
      score: localRanking.player.score,
      gravatar: `https://www.gravatar.com/avatar/${gravatarImg}`,
    };
    let arrayOfInformations = [];
    if (ranking !== null) {
      arrayOfInformations = [...ranking];
    }
    arrayOfInformations.push(newObj);

    // Ordena o Objeto de forma decrescente e salva no localStorage
    const orderedArray = arrayOfInformations.sort((a, b) => b.score - a.score);
    localStorage.setItem('ranking', JSON.stringify(orderedArray));

    // Iteração sobre o objeto
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        { orderedArray.map((player, index) => (
          <ul key="player-ranking">
            <img src={ player.gravatar } alt="ImagemDoUsuario" />
            <li data-testid={ `player-name-${index}` }>
              {player.name}
            </li>
            <li data-testid={ `player-score-${index}` }>
              {player.score}
            </li>
          </ul>
        ))}
      </div>
    );
  }

  // Requisito 18 - Renderiza um botão com uma rota para o início
  render() {
    return (
      <div>
        { this.renderRanking()}
        <Link to="/">
          <button data-testid="btn-go-home" type="button">Voltar ao início</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
