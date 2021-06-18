import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../../components/Header';

class Feedback extends React.Component {
  constructor() {
    super();
    this.feedbackMessage = this.feedbackMessage.bind(this);
    this.createRanking = this.createRanking.bind(this);
  }

  componentDidMount() {
    this.createRanking();
  }

  feedbackMessage() {
    const { assertions } = this.props;
    const three = 3;
    if (assertions < three) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  createRanking() {
    if (!localStorage.getItem('ranking')) {
      localStorage.setItem('ranking', []);
      const actualPlayer = [JSON.parse(localStorage.getItem('state')).player];
      localStorage.setItem('ranking', JSON.stringify(actualPlayer));
    } else {
      const oldRanking = JSON.parse(localStorage.getItem('ranking'));
      const actualPlayer = JSON.parse(localStorage.getItem('state')).player;
      const ranking = oldRanking.concat(actualPlayer);
      // const sortRank = rankingPlayers.sort((a, b) => b.score - a.score);
      const sortedRanking = ranking.sort((a, b) => b.score - a.score);
      localStorage.setItem('ranking', JSON.stringify(sortedRanking));
    }
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <>
        <Header />
        <p>
          Quantidade de acertos:
          <span data-testid="feedback-total-question">
            { assertions }
          </span>
        </p>
        <p>
          Sua pontuação:
          <span data-testid="feedback-total-score">
            { score }
          </span>
        </p>
        <p data-testid="feedback-text">
          { this.feedbackMessage() }
        </p>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Play again
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </Link>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.user.assertions,
  score: state.user.score,
});

export default connect(mapStateToProps)(Feedback);
