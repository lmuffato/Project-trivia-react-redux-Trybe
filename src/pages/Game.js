import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getApiQuestionsThunk, setScoreAction } from '../actions';
import Header from './Header';

class Game extends React.Component {
  constructor() {
    super();
    this.handlePosition = this.handlePosition.bind(this);
    this.getUserRanking = this.getUserRanking.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
    this.changeBorders = this.changeBorders.bind(this);
    this.handleNextBtn = this.handleNextBtn.bind(this);

    const milliSeconds = 1000;

    this.state = {
      position: 0,
      seconds: 30,
      countDown: setInterval(() => {
        this.setState(
          (state) => ({
            seconds: state.seconds - 1,
          }),
        );
      }, milliSeconds),
    };
  }

  componentDidMount() {
    const player = {
      player: {
        name: 'nome da pessoa',
        assertions: 0,
        score: 0,
        gravatarEmail: 'email@dapessoa',
      },
    };
    localStorage.setItem('state', JSON.stringify(player));
  }

  componentDidUpdate() {
    const { seconds, countDown } = this.state;
    if (seconds === 0) {
      clearInterval(countDown);
      this.changeBorders();
    }
  }

  getUserRanking(difficulty) {
    const { seconds } = this.state;
    const fixedPoint = 10;
    let finalPoint = 0;
    let difficultyPoint = 0;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    const timer = seconds;
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

  setButtonDisplay() {
    const nextBtn = document.querySelector('.next-btn');
    nextBtn.style.display = 'block';
  }

  handleNextBtn() {
    const nextBtn = document.querySelector('.next-btn');
    nextBtn.style.display = 'none';
    const correctAnswer = document.getElementsByClassName('correct-answer');
    correctAnswer[0].style.border = '2px outset rgb(118, 118, 118)';
    correctAnswer[0].disabled = false;

    const incorrectAnswer = document.querySelectorAll('.wrong-answer');
    for (let index = 0; index < incorrectAnswer.length; index += 1) {
      incorrectAnswer[index].style.border = '2px outset rgb(118, 118, 118)';
      incorrectAnswer[index].disabled = false;
    }
    const { results } = this.props;
    this.setState((prevState) => ({
      position: prevState.position < results.length && prevState.position + 1,
    }));
  }

  changeBorders() {
    const { countDown } = this.state;
    const correctAnswer = document.getElementsByClassName('correct-answer');
    correctAnswer[0].style.border = '3px solid rgb(6, 240, 15)';
    correctAnswer[0].disabled = true;

    const incorrectAnswer = document.querySelectorAll('.wrong-answer');
    for (let index = 0; index < incorrectAnswer.length; index += 1) {
      incorrectAnswer[index].style.border = '3px solid rgb(255, 0, 0)';
      incorrectAnswer[index].disabled = true;
    }
    clearInterval(countDown);
    this.setButtonDisplay();
  }

  updateLocalStorage(score) {
    const { getName, getUrl, getScore } = this.props;
    const ranking = [
      { name: getName, score, picture: getUrl },
    ];
    const player = {
      player: {
        name: getName,
        assertions: 0,
        score,
        gravatarEmail: getUrl,
      },
    };

    localStorage.setItem('ranking', JSON.stringify(ranking));
    localStorage.setItem('state', JSON.stringify(player));
    getScore(score);
  }

  handlePosition() {
    const { results } = this.props;
    const { position } = this.state;
    if (!results) {
      return;
    }
    const categoryFilter = results.filter((category) => results.indexOf(category)
     === (position));
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
            className="wrong-answer responses"
            key={ index }
            type="button"
            onClick={ this.changeBorders }
          >
            {incorrect}
          </button>
        ))}
        <button
          className="correct-answer responses"
          data-testid="correct-answer"
          type="button"
          onClick={ () => this.getUserRanking(category.difficulty) }
        >
          {category.correct_answer}
        </button>
      </div>));
  }

  render() {
    const { seconds, position } = this.state;
    const limitQuestions = 4;
    return (
      <>
        <Header />
        <div>
          <span>Tempo Restante: </span>
          <strong>{seconds}</strong>
          {this.handlePosition()}
          {position !== limitQuestions ? (
            <div>
              <button
                type="button"
                className="next-btn"
                data-testid="btn-next"
                onClick={ this.handleNextBtn }
                style={ { display: 'none' } }
              >
                Próxima
              </button>
            </div>)

            : (
              <div>
                <Link to="/feedback">
                  <button
                    type="button"
                    className="next-btn"
                    data-testid="btn-next"
                    style={ { display: 'none' } }
                  >
                    Próxima
                  </button>
                </Link>
              </div>)}
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
  getUrl: state.player.email,

});

Game.propTypes = {
  results: PropTypes.string.isRequired,
  getName: PropTypes.string.isRequired,
  getScore: PropTypes.number.isRequired,
  getUrl: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
