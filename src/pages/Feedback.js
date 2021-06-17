import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { clearUserData } from '../actions';

class FeedBack extends React.Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
  }

  mensageScore() {
    const { correct } = this.props;
    const SCORE_MIN = 3;

    if (correct >= SCORE_MIN) return 'Mandou bem!';
    return 'Podia ser melhor...';
  }

  save() {
    const { correct, clearUser } = this.props;
    const player = JSON.parse(localStorage.getItem('state'));
    const token = localStorage.getItem('token');
    let ranking = JSON.parse(localStorage.getItem('ranking'));
    if (ranking === null) ranking = [];
    const rankingNew = [...ranking, {
      assertions: correct,
      name: player.player.name,
      score: player.player.score,
      picture: token,
    }];
    rankingNew.sort((a, b) => {
      const one = 1;
      if (a.score < b.score) return one;
      if (a.score > b.score) return -one;
      return 0;
    });
    localStorage.setItem('ranking', JSON.stringify(rankingNew));
    clearUser();
  }

  render() {
    const { correct, score } = this.props;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">{this.mensageScore()}</p>
        <p data-testid="feedback-total-question">{correct}</p>
        <p data-testid="feedback-total-score">{score}</p>
        <Link to="/" onClick={ this.save }>
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
        <Link to="ranking" onClick={ this.save }>
          <button data-testid="btn-ranking" type="button">
            Ranking
          </button>
        </Link>
      </div>
    );
  }
}

FeedBack.propTypes = {
  correct: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  clearUser: PropTypes.number.isRequired,
};

const mapStateToProps = ({ login: { score, correct } }) => ({
  score,
  correct,
});

const mapDispatchToProps = (dispatch) => ({
  clearUser: () => dispatch(clearUserData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedBack);
