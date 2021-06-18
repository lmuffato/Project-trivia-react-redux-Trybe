import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(window.localStorage.getItem('ranking'));
    return (
      <section>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol>
          {ranking.map((item, index) => (
            <li key={ index }>
              <img src={ item.picture } alt={ `Foto do ${item.name}` } />
              <p data-testid={ `player-name-${index}` }>{item.name}</p>
              <p data-testid={ `player-score-${index}` }>{item.score}</p>
            </li>))}
        </ol>
        <Link to="/"><button data-testid="btn-go-home" type="button">Home</button></Link>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.login.name,
  userScore: state.score.score,
  userEmail: state.login.email,
});

export default connect(mapStateToProps, null)(Ranking);
