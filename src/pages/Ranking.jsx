import React from 'react';
import { Link } from 'react-router-dom';
import { getRanking } from '../helpers/storage';

class Ranking extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ranking: [],
    };

    this.loadRanking = this.loadRanking.bind(this);
  }

  componentDidMount() {
    this.loadRanking();
  }

  loadRanking() {
    const ranking = this.sortRanking(getRanking());
    this.setState({ ranking });
  }

  sortRanking(ranking) {
    const sortedRank = ranking
      .map(({ score }) => score)
      .sort((a, b) => b - a)
      .reduce((rank, score) => {
        const objPlayer = ranking.find((player) => player.score === score);
        return [...rank, objPlayer];
      }, []);

    return sortedRank;
  }

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Link to="/">
          <button data-testid="btn-go-home" type="button">
            VOLTAR
          </button>
        </Link>

        <ol>
          {ranking
        && ranking.map(({ name, score, gravatarEmail }, index) => (
          <li key={ index }>
            <img src={ gravatarEmail } alt="player gravatar" />
            <h2 data-testid={ `player-name-${index}` }>{ name }</h2>
            <h3 data-testid={ `player-score-${index}` }>{score}</h3>
          </li>
        ))}
        </ol>

      </div>
    );
  }
}

export default Ranking;
