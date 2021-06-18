import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    return (
      <>
        <h1>Rankling</h1>
        <Link to="/">
          <button type="button">Retornar ao início</button>
        </Link>
      </>
    );
  }
}

export default Ranking;
