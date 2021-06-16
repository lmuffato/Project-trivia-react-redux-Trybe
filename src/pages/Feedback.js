import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: propTypes.shape(),
}.isRequired;

export default Feedback;
