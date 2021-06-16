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
    const { assertions, score } = JSON.parse(localStorage.getItem('state')).player;
    const goodAssertions = 3;
    return (
      <div>
        <Header score={ score } />
        {
          parseFloat(assertions) < goodAssertions
            ? <p data-testid="feedback-text">Podia ser melhor...</p>
            : <p data-testid="feedback-text">Mandou bem!</p>
        }
        <p>
          Acertos:
          {' '}
          <span data-testid="feedback-total-question">{assertions}</span>
        </p>
        <p>
          Pontuação:
          {' '}
          <span data-testid="feedback-total-score">{score}</span>
        </p>
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
