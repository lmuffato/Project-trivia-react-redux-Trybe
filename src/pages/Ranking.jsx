import React from 'react';
// import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    // const { history } = this.props;
    return (
      <main>
        <h1>Ranking</h1>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
            // onClick={ history.push('/') }
          >
            Jogar!
          </button>
        </Link>
      </main>
    );
  }
}

// Ranking.propTypes = {
//   history: propTypes.shape(),
// }.isRequired;

export default Ranking;
