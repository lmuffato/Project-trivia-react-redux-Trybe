import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ranking: [] };
  }

  componentDidMount() {
    this.players();
    this.updateRanking();
  }

  updateRanking() {
    const players = JSON.parse(localStorage.getItem('ranking'));
    this.setState({ ranking: players });
  }

  players() {
    const player = JSON.parse(localStorage.getItem('state'));
    const { player: { name, score, img } } = player;
    const ranking = { name, score, picture: img };

    if (localStorage.ranking) {
      const players = JSON.parse(localStorage.getItem('ranking'));
      localStorage.setItem('ranking', JSON.stringify([...players, ranking]
        .sort((a, b) => b.score - a.score)));
    } else localStorage.setItem('ranking', JSON.stringify([ranking]));
  }

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1
          data-testid="ranking-title"
        >
          Ranking
        </h1>
        { ranking.map((player, index) => (
          <ul key={ index }>
            <li data-testid={ `player-name-${index}` }>{player.name}</li>
            <li data-testid={ `player-score-${index}` }>{player.score}</li>
          </ul>
        ))}

        <Link
          to="/"
          data-testid="btn-go-home"
        >
          Login
        </Link>
      </div>
    );
  }
}

export default Ranking;
