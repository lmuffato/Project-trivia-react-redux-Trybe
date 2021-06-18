import React from 'react';
import { Redirect } from 'react-router-dom';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      login: false,
    };
  }

  render() {
    const { login } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => this.setState({ login: true }) }
        >
          Voltar
        </button>
        { login && <Redirect to="/" /> }
      </div>
    );
  }
}

export default Ranking;
