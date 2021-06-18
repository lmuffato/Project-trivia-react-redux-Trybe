import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      login: false,
    };
  }

  teste() {
    const ranking = localStorage.getItem('ranking');
    const arr = JSON.parse(ranking);
    const sortArr = arr.sort((a, b) => +b.score - +a.score);
    return sortArr;
  }

  render() {
    const { login } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">♔ Ranking ♔</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => this.setState({ login: true }) }
          className="btn btn-danger"
        >
          Voltar
        </button>
        { login && <Redirect to="/" /> }
        <ul className="rankingList">
          {this.teste().map((elem, index) => (
            <li key={ index }>
              <p data-testid={ `player-name-${index}` }>{elem.name}</p>
              <p data-testid={ `player-score-${index}` }>{elem.score}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.game.users,
});

Ranking.propTypes = {
  users: Proptypes.object,
}.isRequired;

export default connect(mapStateToProps, null)(Ranking);
