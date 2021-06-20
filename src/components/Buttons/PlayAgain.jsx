import React, { Component } from 'react';
import { object } from 'prop-types';

class PlayAgain extends Component {
  render() {
    const { history } = this.props;
    return (
      <button
        type="button"
        data-testid="btn-play-again"
        className="play-again-button"
        name="login"
        onClick={ () => history.push('/') }
      >
        <strong>
          Jogar Novamente
        </strong>
      </button>
    );
  }
}

PlayAgain.propTypes = {
  history: object,
}.isRequired;

export default PlayAgain;
