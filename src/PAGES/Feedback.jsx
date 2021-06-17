import React from 'react';
import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor() {
    super();
    this.HandleRanking = this.HandleRanking.bind(this);
  }

  HandleRanking() {
    const playerString = localStorage.getItem('state');
    const rankingStorage = localStorage.getItem('ranking');

    const player = JSON.parse(playerString);
    const { name, score, gravatarEmail } = player.player;
    const email = md5(gravatarEmail).toString();

    const ranking = {
      name,
      score,
      picture: `https://www.gravatar.com/avatar/${email}`,
    };
    console.log(ranking);

    if (rankingStorage === null) {
      const rankingArr = [ranking];
      localStorage.setItem('ranking', JSON.stringify(rankingArr));
    } else {
      const PreviusRanking = JSON.parse(rankingStorage);
      console.log(PreviusRanking);
      const NewRanking = [...PreviusRanking, ranking];
      console.log(NewRanking);
      localStorage.setItem('ranking', JSON.stringify(NewRanking));
    }
  }

  render() {
    const LocalStorage = JSON.parse(localStorage.getItem('state'));
    const { score, assertions } = LocalStorage.player;
    let message = '';
    const number3 = 3;
    if (assertions < number3) {
      message = 'Podia ser melhor...';
    } else {
      message = 'Mandou bem!';
    }

    return (
      <div>
        <Header score={ score } />
        <p data-testid="feedback-text">{ message }</p>
        <div>
          <p>Placar final</p>
          <p>Total de pontos: $</p>
          <p data-testid="feedback-total-score">{score}</p>
          <p>Total de acertos:</p>
          <p data-testid="feedback-total-question">{assertions}</p>
        </div>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
        <Link to="/Ranking">
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.HandleRanking }
          >
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

export default Feedback;
