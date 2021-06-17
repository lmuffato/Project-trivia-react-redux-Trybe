import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startNewGame, updateScore } from '../actions/action';
import { getLocalStorage, permutate, setLocalStorage } from '../services';
import { BASE_SCORE, QUESTIONS_AMOUNT } from '../constants';
import './TriviaGame.css';
import GameQuestion from './GameQuestion';
import Timer from './Timer';

class TriviaGame extends Component {
  constructor() {
    super();
    this.state = {
      currentQuestion: 0,
    };
    this.loadNextQuestion = this.loadNextQuestion.bind(this);
    this.updateScore = this.updateScore.bind(this);
  }

  componentDidMount() {
    const { fetchQuestions } = this.props;
    fetchQuestions(localStorage.getItem('token'));
    setLocalStorage({ score: 0 });
  }

  updateScore(difficulty, button) {
    const { time, newScore } = this.props;
    const levels = { easy: 1, medium: 2, hard: 3 };
    if (button.classList.contains('correct')) {
      const previousScore = getLocalStorage('score');
      const currentScore = Number(
        previousScore,
      ) + BASE_SCORE + (time * levels[difficulty]);
      setLocalStorage({
        score: currentScore,
      });
      newScore(currentScore);
    }
  }

  showNextButton() {
    const nextButton = document.getElementsByClassName('next-question')[0];
    nextButton.hidden = false;
  }

  loadNextQuestion() {
    const { currentQuestion } = this.state;
    this.setState({ currentQuestion: currentQuestion + 1 });
  }

  render() {
    const { isLoading } = this.props;
    const { currentQuestion } = this.state;
    if (isLoading) return <div>Loading</div>;
    return (
      <>
        <GameQuestion
          currentQuestionIndex={ currentQuestion }
          updateScore={ this.updateScore }
          showNextButton={ this.showNextButton }
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
        <Timer />
      </>
    );
  }
}

TriviaGame.propTypes = {
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
    timeExpired: state.trivia.timeExpired,
    time: state.trivia.currentQuestionTime,
    isLoading: state.trivia.isLoading,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TriviaGame);
