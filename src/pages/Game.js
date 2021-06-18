import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/Game.css';
import Timer from '../components/Timer';
import {
  clockStoper,
  disable,
  resetTimer,
  hidden,
  resetCurrentTime,
  changeScore,
} from '../actions';
import { requestQuestionsThunk } from '../actions/requestQuestions';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      shuffle: [],
    };

    this.wrongIndex = -1;

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.incrementIndex = this.incrementIndex.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.createButton = this.createAnswersButtons.bind(this);
    this.removeButtonBorder = this.removeButtonBorder.bind(this);
    this.editFuncManeger = this.editFuncManeger.bind(this);
    this.nextButtonFuncManeger = this.nextButtonFuncManeger.bind(this);
    this.answersButtonsFuncManeger = this.answersButtonsFuncManeger.bind(this);
  }

  async componentDidMount() {
    await this.fetchQuestions();
    this.shuffleArray();
  }

  fetchQuestions() {
    const { token, getQuestions } = this.props;
    return getQuestions(token);
  }

  removeButtonBorder() {
    const buttons = document.getElementsByClassName('button');
    const buttonsArray = Array.from(buttons);
    buttonsArray.map((button) => {
      button.className = '';
      button.className = 'button';
      return button.className;
    });
  }

  incrementIndex() {
    const { index } = this.state;
    this.setState({
      index: index + 1,
    });
    this.wrongIndex = -1;
  }

  shuffleArray() {
    const { index } = this.state;
    const { questions } = this.props;
    console.log(questions);
    const sortControl = 0.5;
    const answers = [questions[index].correct_answer,
      ...questions[index].incorrect_answers,
    ];
    // Função baseada em um dos exemplos da página a seguir: https://www.delftstack.com/pt/howto/javascript/shuffle-array-javascript/
    const shuffle = answers.sort(() => Math.random() - sortControl);
    this.setState({
      shuffle,
    });
  }

  saveScore() {
    let multiplier = 0;
    const factors = { null: 0, easy: 1, medium: 2, hard: 3, increment: 10 };
    const { state: { index }, props: { questions, currentTime, editScore } } = this;
    switch (questions[index].difficulty) {
    case 'easy':
      multiplier = factors.easy;
      break;
    case 'medium':
      multiplier = factors.medium;
      break;
    case 'hard':
      multiplier = factors.hard;
      break;
    default:
      multiplier = factors.null;
      break;
    }
    const currentScore = (multiplier * currentTime) + factors.increment;
    editScore(currentScore);
  }

  createAnswersButtons(answer, i) {
    const { state: { index }, props: { questions, disableAnswer } } = this;
    // console.log(questions);
    if (answer === questions[index].correct_answer) {
      console.log(questions[index].correct_answer);
      return (
        <button
          key={ i }
          type="button"
          disabled={ disableAnswer }
          name="correct-answer"
          className="button"
          data-testid="correct-answer"
          onClick={ () => {
            this.answersButtonsFuncManeger();
            this.saveScore();
          } }
        >
          {answer}
        </button>
      );
    }
    this.wrongIndex += 1;
    return (
      <button
        key={ i }
        type="button"
        disabled={ disableAnswer }
        name="wrong-answer"
        className="button"
        data-testid={ `wrong-answer-${this.wrongIndex}` }
        onClick={ this.answersButtonsFuncManeger }
      >
        {answer}
      </button>
    );
  }

  checkAnswer() {
    const { editHidden } = this.props;
    editHidden(false);
    const buttons = document.getElementsByClassName('button');
    const buttonsArray = Array.from(buttons);
    buttonsArray.map((button) => {
      if (button.name === 'correct-answer') {
        return button.classList.add('correctAnswer');
      }
      return button.classList.add('wrongAnswer');
    });
  }

  editFuncManeger() {
    const {
      editHidden,
      editDisable,
      editClockStoper,
      editCurrentTime,
      editResetTimer,
    } = this.props;
    editCurrentTime();
    editClockStoper(false);
    editResetTimer(true);
    editDisable(false);
    editHidden(true);
  }

  async nextButtonFuncManeger() {
    this.removeButtonBorder();
    await this.incrementIndex();
    this.editFuncManeger();
    this.shuffleArray();
  }

  answersButtonsFuncManeger() {
    const { editClockStoper } = this.props;
    this.checkAnswer();
    editClockStoper(true);
  }

  render() {
    const { state: { index, shuffle },
      props: { emailDoUsuario, nomeDoUsuario, hiddenBtnNext, score, questions } } = this;
    const hashGerada = md5(emailDoUsuario).toString();
    if (questions.length === 0) return <h2>loading...</h2>;
    return (
      <div>
        <header>
          <img src={ `https://gravatar.com/avatar/${hashGerada}` } alt="usuário" data-testid="header-profile-picture" />
          <p data-testid="header-player-name">{nomeDoUsuario}</p>
          <p data-testid="header-score">{score}</p>
        </header>
        <main>
          <Timer />
          <h2 data-testid="question-category">
            {questions[index].category}
          </h2>
          <p data-testid="question-text">
            {questions[index].question}
          </p>
          {shuffle.map((answer, i) => this.createAnswersButtons(answer, i))}
          <button
            type="button"
            className={ hiddenBtnNext ? 'hidden' : 'visible' }
            data-testid="btn-next"
            onClick={ this.nextButtonFuncManeger }
          >
            Próxima
          </button>
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({
  player: { email, name, token },
  gameReducer: { disableAnswer, hiddenBtnNext, currentTime, score },
  questionsReducer: { questions },
}) => ({
  emailDoUsuario: email,
  nomeDoUsuario: name,
  token,
  disableAnswer,
  hiddenBtnNext,
  currentTime,
  score,
  questions,
});

const mapDispatchToProps = (dispatch) => ({
  editDisable: (payload) => dispatch(disable(payload)),
  editHidden: (payload) => dispatch(hidden(payload)),
  editClockStoper: (payload) => dispatch(clockStoper(payload)),
  editCurrentTime: () => dispatch(resetCurrentTime()),
  editResetTimer: (payload) => dispatch(resetTimer(payload)),
  editScore: (payload) => dispatch(changeScore(payload)),
  getQuestions: (payload) => dispatch(requestQuestionsThunk(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  emailDoUsuario: PropTypes.string,
  nomeDoUsuario: PropTypes.string,
  token: PropTypes.string,
}.isRequired;
