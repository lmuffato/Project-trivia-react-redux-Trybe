import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';

class Ranking extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <Header />
        <main>
          <h1 data-testid="ranking-title">Ranking</h1>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ () => history.push('/') }
          >
            Jogar!
          </button>
        </main>
      </>
    );
  }
}

Ranking.propTypes = {
  history: propTypes.shape(),
}.isRequired;

export default Ranking;
