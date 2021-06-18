import React, { Component } from 'react';
import { object } from 'prop-types';

class Ranking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rankingBuilt: false,
      ranking: [],
    };

    this.getCustomTestIdName = this.getCustomTestIdName.bind(this);
    this.getCustomTestIdScore = this.getCustomTestIdScore.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  componentDidMount() {
    this.handleSort();
  }

  getCustomTestIdName(index) {
    return `player-name-${index}`;
  }

  getCustomTestIdScore(index) {
    return `player-score-${index}`;
  }

  handleSort() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const sortedRanking = ranking.sort((a, b) => b.score - a.score);
    this.setState({
      ranking: [...sortedRanking],
    });
  }

  render() {
    const rankingList = JSON.parse(localStorage.getItem('ranking'));
    console.log(rankingList);
    const { ranking } = this.state;
    console.log(ranking);
    const { history } = this.props;

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          {!ranking.length ? <span>Nenhum jogador rankeado!</span>
            : ranking.map((player, index) => (
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
