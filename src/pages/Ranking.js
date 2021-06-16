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
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
          >
            Voltar para tela inicial
          </button>
        </Link>
        Ranking
      </div>
    );
  }
}

export default Ranking;
