import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import setLocalStorage from '../services/setLocalStorage';
import { addCorrectAction } from '../actions/actionQuestions';
import { pause, start, stop } from './Timer';

const CORRECT_ANSWER = 'correct-answer';
const init = 30;

const objDifficulty = {
  easy: 1,
  medium: 2,
  hard: 3,
};

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonnext: false,
    };
    this.setNextButton = this.setNextButton.bind(this);
    this.setBorderColor = this.setBorderColor.bind(this);
    this.nextOrFeedback = this.nextOrFeedback.bind(this);
  }

  componentDidMount() {
    const { token } = this.props;

    setLocalStorage(token.token);

    start(init);

    this.addPointsToStorage();
  }

  componentDidUpdate() {
    this.addPointsToStorage();
  }

  setBorderColor({ target }) {
    pause();
    const { addCorrect, questions, idQuestion } = this.props;
    const options = document.querySelectorAll('#options > button');
    options.forEach((op) => {
      if (op.attributes[1].value !== CORRECT_ANSWER) {
        op.style.border = '3px solid rgb(255, 0, 0)';
      } else {
        op.style.border = '3px solid rgb(6, 240, 15)';
      }
    });
    if (target.attributes[1].value === CORRECT_ANSWER) {
      const time = document.querySelector('#timer').innerText;
      const defaultValue = 10;
      const points = defaultValue
      + (parseInt(time, 10)
      * objDifficulty[questions[idQuestion].difficulty]);
      addCorrect(points);
    }
    this.setNextButton();
  }

  setNextButton() {
    // const { buttonnext } = this.state;
    this.setState((prevState) => ({
      buttonnext: !prevState.buttonnext,
    }));
  }

  addPointsToStorage() {
    const {
      assertions, email, name,
    } = this.props;
    const score = document.querySelector('#score').innerText;
    let newObj = {};
    newObj = {
      name,
      gravatarEmail: email,
      score: parseInt(score, 10),
      assertions,
    };
    localStorage.setItem('state', JSON.stringify({ player: { ...newObj } }));
  }

  resetBorderColor() {
    const options = document.querySelectorAll('#options > button');
    options.forEach((op) => {
      op.style.border = 'none';
      op.disabled = false;
    });
  }

  nextOrFeedback() {
    stop();
    const { idQuestion, questions, history, handleChange } = this.props;
    if (idQuestion !== questions.length - 1) {
      start(init);
      handleChange();
      this.resetBorderColor();
      this.setNextButton();
    } else {
      history.push('/feedback');
    }
  }

  render() {
    const { idQuestion, questions } = this.props;
    const { buttonnext } = this.state;

    let alternatives = [];
    alternatives = [
      ...questions[idQuestion].incorrect_answers,
      questions[idQuestion].correct_answer,
    ];
    return (
      <div>
        <div id="timer">30</div>
        <div data-testid="question-category">
          { `Categoria: ${questions[idQuestion].category}` }
        </div>
        <div data-testid="question-text">
          <p>
            { `Question ${idQuestion + 1}: ${questions[idQuestion].question}` }
          </p>
        </div>
        <div id="options">
          { alternatives
            .map((alt, i) => (
              <button
                type="button"
                key={ i }
                data-testid={
                  questions[idQuestion].incorrect_answers
                    .includes(alt) ? `wrong-answer-${i}` : CORRECT_ANSWER
                }
                onClick={ this.setBorderColor }
              >
                { alt }
              </button>
            )) }
        </div>
        <button
          type="button"
          id="buttonNext"
          data-testid="btn-next"
          style={ { visibility: buttonnext ? 'visible' : 'hidden' } }
          onClick={ this.nextOrFeedback }
        >
          Próxima Questão
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
  questions: state.questions.questions.results,
  token: state.user.token,
  assertions: state.questions.assertions,
  score: state.questions.score,
});

const mapDispatchToProps = (dispatch) => ({
  addCorrect: (points) => dispatch(addCorrectAction(points)),
});

Question.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  idQuestion: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleChange: PropTypes.func.isRequired,
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
  addCorrect: PropTypes.func.isRequired,
  assertions: PropTypes.number.isRequired,
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
