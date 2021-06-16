import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
//   constructor() {
//     super();
//     this.ranking = this.ranking.bind(this);
//   }

  // const gravatar = localStorage.getItem('token');

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
          >
            Voltar para tela inicial
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
