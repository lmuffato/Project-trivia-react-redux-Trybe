import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Raking extends Component {
  render() {
    return (
      <section>
        <h2 data-testid="ranking-title">Ranking</h2>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Voltar
          </button>
        </Link>
      </section>
    );
  }
}

export default Raking;
