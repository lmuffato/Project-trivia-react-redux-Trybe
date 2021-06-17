import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  renderLessThenThree() {
    return (
      <>
        Podia ser melhor...
      </>
    );
  }

  renderThreeOrMore() {
    return (
      <>
        Mandou bem!
      </>
    );
  }

  render() {
    const { history } = this.props;
    const result = 3;
    const three = 3;
    return (
      <div>
        <Header />
        <main>
          <h2 data-testid="feedback-text">
            { result < three ? this.renderLessThenThree() : this.renderThreeOrMore() }
          </h2>
        </main>
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
