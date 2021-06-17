import React from 'react';
import propTypes from 'prop-types';

class Ranking extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <main>
        <h1>Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Jogar!
        </button>
      </main>
    );
  }
}

Ranking.propTypes = {
  history: propTypes.shape(),
}.isRequired;

export default Ranking;
