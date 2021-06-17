import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setRanking();
  }

  setRanking() {
    const { picture } = this.props;
    const { score, name } = JSON.parse(localStorage.getItem('state')).player;
    console.log(localStorage.getItem('ranking'));
    if (localStorage.getItem('ranking') === null) {
      localStorage.setItem('ranking', JSON.stringify(
        [
          {
            index: 0,
            name,
            score,
            picture,
          },
        ],
      ));
    } else {
      const oldRanking = JSON.parse(localStorage.getItem('ranking'));
      const newIndex = Object.values(oldRanking).length;
      const newRanking = oldRanking.concat({ index: newIndex, name, score, picture });
      localStorage.setItem('ranking', JSON.stringify(newRanking));
    }
  }

  handleClick() {
    const { index } = JSON.parse(localStorage.getItem('state')).player;
    const { history } = this.props;
    history.push('/');
    localStorage.setItem('state', JSON.stringify(
      {
        player: {
          index,
        } },
    ));
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

const mapStateToProps = (state) => ({
  picture: state.tokenReducer.picture,
});

Feedback.propTypes = {
  history: PropTypes.objectOf(PropTypes.func),
  picture: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
