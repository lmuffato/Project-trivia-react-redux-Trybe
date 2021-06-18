import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
    this.getHash = this.getHash.bind(this);
    this.setRanking = this.setRanking.bind(this);
  }

  componentDidMount() {
    this.setRanking();
  }

  getHash(email) {
    const hash = md5(email).toString();
    return `https://www.gravatar.com/avatar/${hash}`;
  }

  setRanking() {
    const { ranking } = this.props;
    const playerInfo = ranking.map((player) => ({
      name: player.name,
      score: player.score,
      picture: this.getHash(player.gravatarEmail),
    }));
    playerInfo.sort((a, b) => {
      const NEGATIVE_ONE = -1;
      if (a.score < b.score) return 1;
      if (a.score > b.score) return NEGATIVE_ONE;
      return 0;
    });
    localStorage.setItem('ranking', JSON.stringify(playerInfo));
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    const localRanking = JSON.parse(localStorage.getItem('ranking'));
    if (loading) return 'loading...';
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol>
          {
            localRanking.map((player, index) => (
              <li key={ index }>
                <img src={ player.picture } alt={ `foto de ${player.name}` } />
                <span data-testid={ `player-name-${index}` }>{player.name}</span>
                <span data-testid={ `player-score-${index}` }>{player.score}</span>
              </li>
            ))
          }
        </ol>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Home</button>
        </Link>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  ranking: state.game.ranking,
});

Ranking.propTypes = {
  ranking: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Ranking);
