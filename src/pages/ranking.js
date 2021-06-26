import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Ranking extends Component {
  render() {
    return (
      <div>
        <Header />
        OLá mundo, aqui é a págiana de Ranking
        <Link exact to="/">
          <button type="button" data-testid="btn-go-home">Jogue Denovo</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;