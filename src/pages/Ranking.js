import React, { Component } from 'react';

class Ranking extends Component {
  constructor() {
    super();

    this.state = {
      rankingBuilt: false,
    };

    this.getCustomTestIdName = this.getCustomTestIdName.bind(this);
    this.getCustomTestIdScore = this.getCustomTestIdScore.bind(this);
    this.buildRanking = this.buildRanking.bind(this);
  }

  componentDidMount() {
    this.buildRanking();
  }

  getCustomTestIdName(index) {
    return `player-name-${index}`;
  }

  getCustomTestIdScore(index) {
    return `player-score-${index}`;
  }

  buildRanking() {
    // const playerInfo = JSON.parse(localStorage.getItem('player'));
    // const oldRanking = localStorage.getItem('ranking');

    const playerInfo = { name: 'Rose', score: 90, gravatarEmail: 'URL3' }; // Info mockada
    const ranking = [{ name: 'Bia', score: 20, gravatarEmail: 'URL' },
      { name: 'Ruda', score: 30, gravatarEmail: 'URL2' }]; // Info mockada

    if (ranking.length !== 0) {
      ranking.push({
        name: playerInfo.name,
        score: playerInfo.score,
        picture: playerInfo.gravatarEmail,
      });

      const UM = 1;

      ranking.sort((a, b) => {
        if (a.score > b.score) return -UM;
        if (a.score < b.score) return UM;
        return 0;
      });

      localStorage.setItem('ranking', JSON.stringify(ranking));
    }
    this.setState({ rankingBuilt: true });
  }

  render() {
    const rankingList = JSON.parse(localStorage.getItem('ranking'));
    const { rankingBuilt } = this.state;

    // console.log(rankingList);

    return (
      <div>
        <ul>
          {!rankingBuilt ? <span>Nenhum jogador rankeado!</span>
            : rankingList.map((player, index) => (
              <li key={ index }>
                <img src={ player.picture } alt="gravatar-profile" />
                <p data-testid={ this.getCustomTestIdName(index) }>{ player.name }</p>
                <p data-testid={ this.getCustomTestIdScore(index) }>{ player.score }</p>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

/* const mapStateToProps() => ({
  name: state.player.playerName,
  assertions: 0,
  score: 0, // VEM DO LOCAL STORAGE TB!
  gravatarEmail: '',
}) */

export default Ranking;
