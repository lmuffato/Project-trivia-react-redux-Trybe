import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getApiQuestionsThunk, setScoreAction } from '../actions';
import Header from './Header';

class Game extends React.Component {
  constructor() {
    super();
    this.handlePosition = this.handlePosition.bind(this);
    this.getUserRanking = this.getUserRanking.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
    this.changeBorders = this.changeBorders.bind(this);
  }

  getUserRanking(difficulty) {
    const fixedPoint = 10;
    let finalPoint = 0;
    let difficultyPoint = 0;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    const timer = 30;
    if (difficulty === 'easy') {
      difficultyPoint = easy;
    } else if (difficulty === 'medium') {
      difficultyPoint = medium;
    } else if (difficulty === 'hard') {
      difficultyPoint = hard;
    }
    finalPoint += fixedPoint + (timer * difficultyPoint);
    this.changeBorders();
    this.updateLocalStorage(finalPoint);
  }

  changeBorders() {
    const correctAnswer = document.getElementsByClassName('correct-answer');
    correctAnswer[0].style.border = '3px solid rgb(6, 240, 15)';

    const incorrectAnswer = document.querySelectorAll('.wrong-answer');
    for (let index = 0; index < incorrectAnswer.length; index += 1) {
      incorrectAnswer[index].style.border = '3px solid rgb(255, 0, 0)';
    }
  }

  updateLocalStorage(score) {
    const { getName, getUrl, getScore } = this.props;
    const ranking = [
      { name: getName, score, picture: getUrl },
    ];
    localStorage.setItem('ranking', JSON.stringify(ranking));
    getScore(score);
  }

  handlePosition() {
    const { results } = this.props;
    if (!results) {
      return;
    }
    const categoryFilter = results.filter((category) => results.indexOf(category) === 0);
    return categoryFilter.map((category) => (
      <div key={ category }>
        <h3 data-testid="question-category">
          {category.category}
        </h3>
        <br />
        <h2 data-testid="question-text">
          {category.question}
        </h2>
        <br />
        {category.incorrect_answers.map((incorrect, index) => (
          <button
            data-testid={ `wrong-answer-${index}` }
            key={ index }
            type="button"
            onClick={ this.changeBorders }
            className="wrong-answer"
          >
            {incorrect}

          </button>
        ))}
        <button
          data-testid="correct-answer"
          type="button"
          onClick={ () => this.getUserRanking(category.difficulty) }
          className="correct-answer"
        >
          {category.correct_answer}

        </button>

      </div>));
  }

  render() {
    return (
      <>
        <Header />
        <div>
          {this.handlePosition()}
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getThunk: (state) => dispatch(getApiQuestionsThunk(state)),
  getScore: (state) => dispatch(setScoreAction(state)),
});

const mapStateToProps = (state) => ({
  results: state.game.questions,
  isLoading: state.game.isLoading,
  getName: state.player.name,
  getScore: state.player.score,
  getUrl: state.player.gravatar,

});

Game.propTypes = {
  results: PropTypes.string.isRequired,
  getName: PropTypes.string.isRequired,
  getScore: PropTypes.number.isRequired,
  getUrl: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
