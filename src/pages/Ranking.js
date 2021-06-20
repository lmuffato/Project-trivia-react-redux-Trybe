import React from 'react';
import { Link } from 'react-router-dom';
import style from './ranking.module.css';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ranking: [] };
  }

  componentDidMount() {
    this.players();
    this.updateRanking();
    // localStorage.removeItem('token');
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
      <div className={ style.ranking_container }>
        <div className={ style.ranking_title_container }>
          <h1
            data-testid="ranking-title"
            className={ style.ranking_title }
          >
            Ranking
          </h1>
        </div>
        { ranking.map((player, index) => (
          <ul key={ index } className={ style.list }>
            <li
              className={ style.player }
              data-testid={ `player-name-${index}` }
            >
              {player.name}
            </li>
            <li
              className={ style.score }
              data-testid={ `player-score-${index}` }
            >
              {player.score}
            </li>
          </ul>
        ))}
        <Link
          to="/"
          data-testid="btn-go-home"
        >
          <button type="button" className={ style.ranking_button }>
            Login
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
