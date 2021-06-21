import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header';
import { resetScore } from '../actions';
import styles from './styles.module.css';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.renderBadScore = this.renderBadScore.bind(this);
    this.renderGoodScoore = this.renderGoodScoore.bind(this);
    this.rankingLocalStorage = this.rankingLocalStorage.bind(this);
    this.handleResetScore = this.handleResetScore.bind(this);
  }

  componentDidMount() {
    this.rankingLocalStorage();
  }

  rankingLocalStorage() {
    const rankingOne = [];
    const oldRanking = JSON.parse(localStorage.getItem('ranking'));
    const { user, score, image } = this.props;
    const rankingObject = {
      name: user,
      score,
      picture: image,
    };
    if (oldRanking) {
      const rankingArray = [...oldRanking, rankingObject];
      const sortedRanking = rankingArray.sort((a, b) => b.score - a.score);
      localStorage.setItem('ranking', JSON.stringify(sortedRanking));
    } else {
      const newRanking = [...rankingOne, rankingObject];
      localStorage.setItem('ranking', JSON.stringify(newRanking));
    }
  }

  handleResetScore() {
    const { resetPlayerScore } = this.props;
    resetPlayerScore();
  }

  renderGoodScoore() { return (<h1 data-testid="feedback-text">Mandou bem!</h1>); }

  renderBadScore() { return (<h1 data-testid="feedback-text">Podia ser melhor...</h1>); }

  render() {
    const { score, assertions } = this.props;
    const minimalScore = 3;

    return (
      <div className={ styles.gamePageContent }>
        <Header />
        { assertions >= minimalScore ? this.renderGoodScoore() : this.renderBadScore() }
        <h3>
          Você acertou:
          {' '}
          <span data-testid="feedback-total-question">{assertions}</span>
          {' '}
          questões.
        </h3>
        <h3>
          Um total de:
          {' '}
          <span data-testid="feedback-total-score">{score}</span>
          {' '}
          pontos!
        </h3>
        <Link to="/ranking">
          <button type="submit" data-testid="btn-ranking">
            Ver Ranking
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.handleResetScore }
          >
            Jogar Novamente
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.userReducer.playerScore,
  assertions: state.userReducer.assertions,
  image: state.userReducer.image,
  user: state.userReducer.user,
});

const mapDispatchToProps = (dispatch) => ({
  resetPlayerScore: () => dispatch(resetScore()),
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  resetPlayerScore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

// https://pt.stackoverflow.com/questions/46600/como-ordenar-uma-array-de-objetos-com-array-sort
