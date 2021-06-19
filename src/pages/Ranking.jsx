import React, { Component } from 'react';

class Ranking extends Component {
  render() {
    return (
      <>
        <h1 data-testid="ranking-title"> Ranking </h1>
        <form action="/">
          <button type="submit" data-testid="btn-go-home">Jogar novamente</button>
        </form>
      </>
    );
  }
}

export default Ranking;
