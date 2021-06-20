import React, { Component } from 'react';
import { object } from 'prop-types';

class ShowRank extends Component {
  render() {
    const { history } = this.props;
    return (
      <button
        type="button"
        data-testid="btn-ranking"
        className="show-ranking-button"
        name="ranking"
        onClick={ () => history.push('/ranking') }
      >
        <strong>
          Ver Ranking
        </strong>
      </button>
    );
  }
}

ShowRank.propTypes = {
  history: object,
}.isRequired;

export default ShowRank;
