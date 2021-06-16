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

    // Cria um array de objetos como exemplo do que futuramente vai ser iterado
    const arrayOfInformations = [
      {
        name: 'Samuel',
        score: 0,
        gravatar: `https://www.gravatar.com/avatar/${gravatarImg}`,
      },
      {
        name: 'Bruno',
        score: 10,
        gravatar: `https://www.gravatar.com/avatar/${gravatarImg}`,
      },
    ];
    // Ordena o Objeto de forma decrescente e salva no localStorage
    const orderedArray = arrayOfInformations.sort((a, b) => b.score - a.score);
    localStorage.setItem('ranking', JSON.stringify(orderedArray));

    // Iteração sobre o objeto
    return (
      <div>
        { orderedArray.map((player, index) => (
          <ul key="player-ranking">
            <img src={ player.gravatar } alt="ImagemDoUsuario" />
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
// Requisito 18 - Botão usado para retornar ao início;
}




export default Ranking;
