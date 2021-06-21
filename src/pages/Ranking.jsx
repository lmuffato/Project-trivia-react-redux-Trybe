import React from 'react';
import { Link } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';
import Audioslave from '../assets/Audioslave.ogg';
import { getRanking } from '../helpers/storage';
import './Ranking.css';

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
      <div className="ranking-container">
        <h1 data-testid="ranking-title">Ranking</h1>
        <button className="btn-go-home" data-testid="btn-go-home" type="button">
          <Link to="/">
            VOLTAR
          </Link>
        </button>
        <div>
          <ol className="title-ranking">
            <li>User</li>
            <li>Score</li>
          </ol>
        </div>
        <ol className="ranking">
          {ranking
        && ranking.map(({ name, score, gravatarEmail }, index) => (
          <li key={ index } className="ranking-list">
            <div className="user-data">
              <img src={ gravatarEmail } alt="player gravatar" />
              <h2 data-testid={ `player-name-${index}` }>{ name }</h2>
            </div>
            <h3 data-testid={ `player-score-${index}` }>{score}</h3>
          </li>
        ))}
        </ol>
        <ReactAudioPlayer src={ Audioslave } autoPlay controls className="music" />
      </div>
    );
  }
}

export default Ranking;
