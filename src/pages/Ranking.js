import React, { Component } from 'react';
import { object } from 'prop-types';
// import getGravatarImg from '../components/getGravatarImg';

class Ranking extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   rankingBuilt: false,
    // };

    this.getCustomTestIdName = this.getCustomTestIdName.bind(this);
    this.getCustomTestIdScore = this.getCustomTestIdScore.bind(this);
    // this.buildRanking = this.buildRanking.bind(this);
  }

  // componentDidMount() {
  //   this.buildRanking();
  // }

  getCustomTestIdName(index) {
    return `player-name-${index}`;
  }

  getCustomTestIdScore(index) {
    return `player-score-${index}`;
  }

  // buildRanking() {
  //   const playerInfo = JSON.parse(localStorage.getItem('state')).player;
  //   console.log(playerInfo);
  //   let ranking = JSON.parse(localStorage.getItem('ranking'));

  //   if (!Array.isArray(ranking)) {
  //     ranking = [];
  //   }

  //   ranking.push({
  //     name: playerInfo.name,
  //     score: playerInfo.score,
  //     picture: getGravatarImg(playerInfo.gravatarEmail),
  //   });

  //   const UM = 1;
  //   ranking.sort((a, b) => {
  //     if (a.score > b.score) return -UM;
  //     if (a.score < b.score) return UM;
  //     return 0;
  //   });

  //   localStorage.setItem('ranking', JSON.stringify(ranking));
  //   this.setState({ rankingBuilt: true });
  //   console.log(ranking);
  // }

  render() {
    const rankingList = JSON.parse(localStorage.getItem('ranking'));
    // const { rankingBuilt } = this.state;
    const { history } = this.props;
    console.log(rankingList);

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

/* const mapStateToProps() => ({
  name: state.player.name,
  assertions: 0,
  score: 0, // VEM DO LOCAL STORAGE TB!
  gravatarEmail: '',
}) */

export default Ranking;
