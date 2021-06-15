import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    return (
      <div>
        <Link to="/" data-testid="btn-go-home">
          Voltar ao início
        </Link>
      </div>
    );
  }
}

export default Ranking;
