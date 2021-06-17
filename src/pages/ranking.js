import React, { Component } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    return (
      <div>
        <Header />
          OLá mundo, aqui é a págiana de Ranking
        <Link to="/game">
          <button type="button" data-testid="btn-go-home">Jogue Denovo</button>
          {/* provavelmente quando clicar no botão será necessario rodar a API novamente */}
        </Link>
      </div>
    );
  }
}

export default Ranking;