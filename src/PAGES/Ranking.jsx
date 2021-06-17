import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  render() {
    const rankingStorage = localStorage.getItem('ranking');
    const ranking = JSON.parse(rankingStorage);

    console.log(ranking);

    const list = ranking.sort((a, b) => b.score - a.score);
    return (
      <section>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          {list.map((item, index) => {
            const { name, score, picture } = item;
            return (
              <li key={ index }>
                <img
                  data-testid="header-profile-picture"
                  src={ picture }
                  alt="Avatar"
                />
                <span data-testid={ `player-name-${index}` }>{name}</span>
                <span data-testid={ `player-score-${index}` }>{score}</span>
              </li>
            );
          })}
        </ul>
        <Link to="/">
          <button data-testid="btn-go-home" type="button">Voltar inicio</button>
        </Link>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatar: state.PlayerReducer.gravatar,
});

Ranking.propTypes = {};

export default connect(mapStateToProps, null)(Ranking);
