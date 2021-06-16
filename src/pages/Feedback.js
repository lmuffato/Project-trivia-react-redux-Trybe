import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { assertions } = JSON.parse(localStorage.getItem('player'));
    const goodAssertions = 3;
    return (
      <div>
        <Header />
        {
          parseFloat(assertions) < goodAssertions
            ? <p data-testid="feedback-text">Podia ser melhor...</p>
            : <p data-testid="feedback-text">Mandou bem!</p>
        }
        <button
          onClick={ this.handleClick }
          data-testid="btn-play-again"
          type="button"
        >
          Jogar novamente
        </button>
        <button
          data-testid="btn-ranking"
          type="button"
        >
          <Link to="/ranking">Ver Ranking</Link>
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default Feedback;
