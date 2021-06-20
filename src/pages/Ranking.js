import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ranking.module.css';

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
      <main className={ styles.ranking__container }>
        <h1
          data-testid="ranking-title"
          className={ styles.ranking__title }
        >
          Ranking
        </h1>
        { ranking.map((player, index) => (
          <ul
            key={ index }
            className={ styles.ranking__players }
          >
            <li
              data-testid={ `player-picture-${index}` }
              className={ styles.ranking__players__picture }
            >
              <img src={ player.picture } alt={ `player-${index}` } />
            </li>
            <li
              data-testid={ `player-name-${index}` }
              className={ styles.ranking__players__name }
            >
              {player.name}
            </li>
            <li
              data-testid={ `player-score-${index}` }
              className={ styles.ranking__players__score }
            >
              {player.score}
            </li>
          </ul>
        ))}

        <Link
          to="/"
          data-testid="btn-go-home"
          className={ styles.ranking__link }
        >
          Login
        </Link>
      </main>
    );
  }
}

export default Ranking;
