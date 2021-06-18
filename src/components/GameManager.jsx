import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startNewGame, updateScore } from '../actions/action';
import { getLocalStorage, setLocalStorage } from '../services';
import { BASE_SCORE, QUESTIONS_AMOUNT } from '../constants';
import './GameManager.css';
import GameQuestion from './GameQuestion';
import Timer from './Timer';

class GameManager extends Component {
  constructor() {
    super();
    this.state = {
      currentQuestionIndex: 0,
      remainingTime: null,
      userAnswered: false,
      timeExpired: false,
      shouldClear: false,
      shouldResetTimer: false,
      shouldShuffle: true,
    };
    this.loadNextQuestion = this.loadNextQuestion.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.remainingTime = this.remainingTime.bind(this);
    this.userClick = this.userClick.bind(this);
    this.buttonGotCleared = this.buttonGotCleared.bind(this);
    this.timeout = this.timeout.bind(this);
    this.timerGotReseted = this.timerGotReseted.bind(this);
    this.questionsGotShuffled = this.questionsGotShuffled.bind(this);
  }

  componentDidMount() {
    const { fetchQuestions } = this.props;
    fetchQuestions(localStorage.getItem('token'));
    setLocalStorage({ score: 0 });
  }

  componentDidUpdate() {
    const { timeExpired } = this.state;
    if (timeExpired) {
      this.showNextButton();
    }
  }

  updateScore(difficulty, button) {
    const { newScore } = this.props;
    const { remainingTime } = this.state;
    this.setState({ userAnswered: true });
    const levels = { easy: 1, medium: 2, hard: 3 };
    if (button.getAttribute('data-testid') === 'correct-answer') {
      const previousScore = getLocalStorage('score');
      const currentScore = Number(
        previousScore,
      ) + BASE_SCORE + (remainingTime * levels[difficulty]);
      setLocalStorage({
        score: currentScore,
      });
      newScore(currentScore);
    }
  }

  hideNextButton() {
    const nextButton = document.getElementsByClassName('next-question')[0];
    nextButton.hidden = true;
  }

  showNextButton() {
    const nextButton = document.getElementsByClassName('next-question')[0];
    nextButton.hidden = false;
  }

  loadNextQuestion() {
    // TODO quando for a ultima pergunta redirecionar para pagina de feedback
    const { currentQuestionIndex } = this.state;
    const { questions, redirect } = this.props;
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex === questions.length) {
      redirect('/results');
    }
    this.hideNextButton();
    this.setState({
      currentQuestionIndex: nextQuestionIndex,
      userAnswered: false,
      timeExpired: false,
      shouldClear: true,
      shouldResetTimer: true,
      shouldShuffle: true,
    });
  }

  remainingTime(time) {
    this.setState({ remainingTime: time });
  }

  userClick({ target: button }) {
    const { questions } = this.props;
    this.updateScore(questions[0].difficulty, button);
    this.showNextButton();
  }

  timeout() {
    this.setState({ timeExpired: true });
  }

  buttonGotCleared() {
    this.setState({ shouldClear: false });
  }

  timerGotReseted() {
    this.setState({ shouldResetTimer: false });
  }

  questionsGotShuffled() {
    this.setState({ shouldShuffle: false });
  }

  render() {
    const { isLoading, questions } = this.props;
    const { currentQuestionIndex, userAnswered,
      timeExpired, shouldClear, shouldResetTimer, shouldShuffle } = this.state;
    if (isLoading) return <div>Loading</div>;
    return (
      <>
        <GameQuestion
          currentQuestion={ questions[currentQuestionIndex] }
          timeExpired={ timeExpired }
          userAnswered={ userAnswered }
          userClick={ this.userClick }
          clearButton={ shouldClear }
          buttonCleared={ this.buttonGotCleared }
          shuffle={ shouldShuffle }
          questionsShuffled={ this.questionsGotShuffled }
        />
        <button
          type="button"
          data-testid="btn-next"
          className="next-question"
          onClick={ this.loadNextQuestion }
          hidden
        >
          Próxima
        </button>
        <Timer
          remainingTime={ this.remainingTime }
          userAnswered={ userAnswered }
          didTimeout={ this.timeout }
          shouldResetTimer={ shouldResetTimer }
          timerReseted={ this.timerGotReseted }
        />
      </>
    );
  }
}

GameManager.propTypes = {
  fetchQuestions: PropTypes.func,
}.isRequired;

function mapDispatchToProps(dispatch) {
  return {
    fetchQuestions: (token) => dispatch(startNewGame(QUESTIONS_AMOUNT, token)),
    newScore: (newScore) => dispatch(updateScore(newScore)),
  };
}

function mapStateToProps(state) {
  return {
    questions: state.trivia.questions,
    isLoading: state.trivia.isLoading,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameManager);
