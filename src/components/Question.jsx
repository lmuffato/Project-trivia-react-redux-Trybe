import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timer from './Timer';
import { addAnswer } from '../actions/index';

const correctAnswerString = 'correct-answer';

class Question extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.stylesMultiple = this.stylesMultiple.bind(this);
    this.stylesTrueFalse = this.stylesTrueFalse.bind(this);
    this.handleQuestions = this.handleQuestions.bind(this);
    this.handleDifficulty = this.handleDifficulty.bind(this);
    this.saveTimer = this.saveTimer.bind(this);
    this.handleButtonVisibility = this.handleButtonVisibility.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);

    this.stateTimer = 0;
    this.state = {
      colorRed: { border: '3px solid rgb(255, 0, 0)' },
      colorGreen: { border: '3px solid rgb(6, 240, 15)' },
      styleCorrect: {},
      styleIncorrect: {},
      currentAnswers: [],
      correctId: '',
      trueBoolean: {},
      falseBoolean: {},
      buttonVisible: false,
      timerUpdate: false,
    };
  }

  componentDidMount() {
    const time = 900;
    setTimeout(() => this.handleQuestions(), time);
  }

  saveTimer(timer) {
    this.stateTimer = timer;
  }

  handleQuestions() {
    const { currentQuestion } = this.props;
    const { correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = currentQuestion;
    const answers = [correctAnswer, ...incorrectAnswers];
    const meio = 0.5;
    const currentAnswers = answers.sort(() => Math.random() - meio);
    const correctId = currentAnswers.indexOf(correctAnswer);
    this.setState({
      currentAnswers,
      correctId,
    });
  }

  stylesMultiple() {
    this.handleButtonVisibility();
    this.setState((previousState) => ({
      styleCorrect: previousState.colorGreen,
      styleIncorrect: previousState.colorRed,
    }));
  }

  stylesTrueFalse() {
    this.handleButtonVisibility();
    const answerArray = document.querySelectorAll('input');
    const getAnswer = answerArray[0].getAttribute('data-testid');
    if (getAnswer === correctAnswerString) {
      this.setState((previousState) => ({
        trueBoolean: previousState.colorGreen,
        falseBoolean: previousState.colorRed,
      }));
    } else {
      this.setState((previousState) => ({
        falseBoolean: previousState.colorRed,
        trueBoolean: previousState.colorGreen,
      }));
    }
  }

  trueOfFalse(parametro) {
    const { falseBoolean, trueBoolean } = this.state;
    let testId1 = `wrong-answer-${0}`;
    let testId2 = `wrong-answer-${0}`;
    if (parametro === 'True') {
      testId1 = correctAnswerString;
    } else testId2 = correctAnswerString;
    return (
      <>
        <input
          id="verdadeiro"
          type="button"
          name="question"
          value="True"
          onClick={ (event) => {
            this.stylesTrueFalse(); this.handleClick(undefined, event);
          } }
          data-testid={ testId1 }
          style={ trueBoolean }
        />
        <input
          id="falso"
          type="button"
          name="question"
          value="False"
          onClick={ (event) => {
            this.stylesTrueFalse();
            this.handleClick(undefined, event);
          } }
          data-testid={ testId2 }
          style={ falseBoolean }
        />
      </>
    );
  }

  multiple(answers, correctId) {
    let wrongID = 0;
    const { styleCorrect, styleIncorrect } = this.state;
    return (
      <>
        {answers.map((answer, index) => {
          if (index === correctId) {
            return (
              <input
                id={ `question${index}` }
                type="button"
                name="multiple"
                value={ answer }
                onClick={ (event) => {
                  this.stylesMultiple();
                  this.handleClick(undefined, event);
                } }
                style={ styleCorrect }
                key={ index }
                data-testid="correct-answer"
              />
            );
          }
          wrongID += 1;
          return (
            <input
              id={ `question${index}` }
              type="button"
              name="multiple"
              value={ answer }
              onClick={ (event) => {
                this.stylesMultiple(); this.handleClick(undefined, event);
              } }
              key={ index }
              style={ styleIncorrect }
              data-testid={ `wrong-answer-${wrongID - 1}` }
            />
          );
        })}
      </>

    );
  }

  handleDifficulty(difficulty) {
    let questionDif = 0;
    switch (difficulty) {
    case 'easy':
      questionDif = 1;
      break;
    case 'medium':
      questionDif = 2;
      break;
    case 'hard':
      questionDif = 2 + 1;
      break;
    default:
      return questionDif;
    }
    return questionDif;
  }

  handleButtonVisibility() {
    this.setState({
      buttonVisible: true,
    });
  }

  handleNextQuestion() {
    const { index } = this.props;
    this.setState({
      timerUpdate: true,
    });
    index();
    this.handleQuestions();
  }

  handleClick(flag, event) {
    const ten = 10;
    const { assertions, currentQuestion: { correct_answer: correctAnswer, difficulty },
    } = this.props;
    if (flag === undefined) {
      if (correctAnswer === event.target.value) {
        assertions(1);
        const score = ten + (this.stateTimer * this.handleDifficulty(difficulty));
        console.log(score);
        const localStorageState = JSON.parse(localStorage.getItem('state'));
        localStorageState.player.score += score;
        localStorage.setItem('state', JSON.stringify(localStorageState));
      }
    } else {
      console.log('errou');
      this.this.setState({
        timerUpdate: true,
      });
      const btns = document.querySelectorAll('input');
      btns.forEach((btn) => { btn.disabled = true; });
      setTimeout(() => this.handleButtonVisibility(), 100);
    }
  }

  render() {
    const { currentQuestion } = this.props;
    if (!currentQuestion) return <div>Carregando...</div>;
    const { category, question, type } = currentQuestion;
    const { currentAnswers, correctId, buttonVisible, timerUpdate } = this.state;

    return (
      <section style={ { display: 'flex', flexDirection: 'column' } }>
        <h3 data-testid="question-category">{category}</h3>
        <p data-testid="question-text">{question}</p>
        <div style={ { display: 'flex', flexDirection: 'column' } }>
          {type === 'boolean'
            ? this.trueOfFalse('True') : this.multiple(currentAnswers, correctId)}
        </div>
        {buttonVisible
          && (
            <button type="button" data-testid="btn-next" onClick={ this.handleNextQuestion }>
              Próxima
            </button>)}
        <Timer answerQuestion={ this.handleClick } saveTimer={ this.saveTimer } update={ timerUpdate } />
      </section>
    );
  }
}

Question.propTypes = {
  currentQuestion: PropTypes.objectOf(PropTypes.string, PropTypes.array),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  assertions: (answer) => dispatch(addAnswer(answer)),
});
export default connect(null, mapDispatchToProps)(Question);
