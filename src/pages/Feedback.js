import React from 'react';
// import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
    // const { history } = this.props;
    return (
      <div>
        <Header />
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
            // onClick={ () => history.push('/ranking') }
          >
            Ver Ranking
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
            // onClick={ () => history.push('/') }
          >
            Jogar novamente
          </button>
        </Link>
      </div>
    );
  }
}

// Feedback.propTypes = {
//   history: propTypes.shape(),
// }.isRequired;

export default Feedback;
