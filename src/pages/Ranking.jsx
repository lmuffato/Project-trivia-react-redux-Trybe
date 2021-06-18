import React from 'react';
import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  constructor() {
    super();

    this.state = {
      // assertions: 0,
      score: 0,
      name: '',
      gravatarEmail: '',
      index: 0,
    };
  }

  componentDidMount() {
    this.getStorage();
  }

  getStorage() {
    const storage = localStorage.getItem('state');
    const obj = JSON.parse(storage);
    // console.log(obj.player);

    const json = JSON.stringify(obj.player);
    localStorage.setItem('ranking', json);

    const ranking = localStorage.getItem('ranking');
    const objRanking = JSON.parse(ranking);

    const { name, gravatarEmail, score } = objRanking;
    this.setState({ name, gravatarEmail, score });
  }

  renderGravatarImage() {
    const { gravatarEmail } = this.state;
    const hashMD5 = md5(gravatarEmail).toString();
    return (
      <img
        src={ `https://www.gravatar.com/avatar/${hashMD5}` }
        alt="avatar"
        data-testid="header-profile-picture"
      />);
  }

  render() {
    const { name, score, index } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Link to="/">
          <button data-testid="btn-go-home" type="button">
            VOLTAR
          </button>
        </Link>
        <div>
          <h2 data-testid={ `player-name-${index}` }>{ name }</h2>
          {this.renderGravatarImage()}
          <h3 data-testid={ `player-score-${index}` }>{score}</h3>
        </div>
      </div>
    );
  }
}

export default Ranking;
