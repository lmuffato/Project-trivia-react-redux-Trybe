import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startNewGame, updateScore } from '../actions/action';
import { getLocalStorage, permutate, setLocalStorage } from '../services';
import { BASE_SCORE, QUESTIONS_AMOUNT } from '../constants';
import './TriviaGame.css';
import Timer from './Timer';

class TriviaGame extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      permutatedAswers: [],
    };
    this.setPermutatedAnswers = this.setPermutatedAnswers.bind(this);
  }

  componentDidMount() {
    const { fetchQuestions } = this.props;
    fetchQuestions(localStorage.getItem('token'));
    setLocalStorage({ score: 0 });
  }

  componentDidUpdate() {
    const { timeExpired } = this.props;
    if (timeExpired) {
      this.colorButtonsBorder();
      const btnArr = document.getElementsByClassName('btn');
      [...btnArr].forEach((btn) => { btn.disabled = true; });
    }
    const { permutatedAswers } = this.state;
    if (!permutatedAswers.length) this.setPermutatedAnswers();
  }

  setPermutatedAnswers() {
    const { questions } = this.props;
    const answers = [questions[0].correct_answer, ...questions[0].incorrect_answers];
    this.setState({ permutatedAswers: permutate(...answers) });
  }

  getID(answer) {
    const { questions } = this.props;
    if (answer === questions[0].correct_answer) return 'correct-answer';
    return `wrong-answer-${questions[0].incorrect_answers.indexOf(answer)}`;
  }

  colorButtonsBorder() {
    const btnArr = document.getElementsByClassName('btn');
    [...btnArr].forEach((btn) => {
      if (btn.getAttribute('data-testid') === 'correct-answer') {
        btn.classList.add('correct');
      } else {
        btn.classList.add('wrong');
      }
    });
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

  handleClick(difficulty) {
    return ({ target }) => {
      this.colorButtonsBorder();
      this.updateScore(difficulty, target);
    };
  }

  render() {
    const { questions, isLoading } = this.props;
    if (isLoading) return <div>Loading</div>;
    const { permutatedAswers } = this.state;
    const { category, question, difficulty } = questions[0];
    return (
      <div>
        <h3 data-testid="question-category">{category}</h3>
        <h2 data-testid="question-text">{question}</h2>
        {permutatedAswers.map((answer, i) => (
          <button
            type="button"
            className="btn"
            onClick={ this.handleClick(difficulty) }
            data-testid={ this.getID(answer) }
            key={ i }
          >
            {answer}
          </button>
        ))}
        <Timer />
      </div>
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
