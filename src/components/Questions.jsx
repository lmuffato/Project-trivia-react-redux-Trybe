import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getQuestionsSuccess, getTokenThunk,
  getScore, getAssertions } from '../redux/actions';
import Timer from './Timer';
import Boolean from './Boolean';

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      correctAnswer: 'correct-answer',
      loading: true,
      questionsPosition: 0,
      questions: [],
      showBtn: false,
      canUpdate: true,
      randomNumber: '',
      timer: 30,
      working: false,
      disabledBtn: false,
      score: 0,
      redirect: false,
      assertions: 0,
    };
    this.onClick = this.onClick.bind(this);
    this.requisitions = this.requisitions.bind(this);
    this.multiple = this.multiple.bind(this);
    this.btnStyle = this.btnStyle.bind(this);
    this.getRandom = this.getRandom.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    this.updateStorage = this.updateStorage.bind(this);
  }

  componentDidMount() {
    this.requisitions();
    this.updateStorage();
  }

  componentDidUpdate() {
    this.stopTimer();
    this.startTimer();
  }

  onClick() {
    const correctBtn = document.querySelector('.correct-answer');
    const incorrectBtns = document.querySelectorAll('.incorrect-answer');
    const { questions, questionsPosition, score, assertions } = this.state;
    const { setScore, setAssertions } = this.props;
    if (questionsPosition === questions.length - 1) this.setState({ redirect: true });
    this.setState((previous) => ({
      questionsPosition: previous.questionsPosition + 1,
      showBtn: false,
      canUpdate: true,
      working: false,
      timer: 30,
      disabledBtn: false,
    }));
    correctBtn.style.border = '';
    incorrectBtns.forEach((btn) => { btn.style.border = ''; });
    setScore(score);
    setAssertions(assertions);
  }

  getRandom() {
    const { canUpdate } = this.state;
    if (canUpdate) {
      const QUESTIONS_LENGTH = 4;
      const random = Math.floor(Math.random() * (QUESTIONS_LENGTH));
      this.setState({ canUpdate: false, randomNumber: random });
      return random;
    }
  }

  updateStorage() {
    const { assertions, score } = this.state;
    const { userName, userEmail } = this.props;
    localStorage.setItem('state', JSON.stringify({
      player: { name: userName, assertions, score, gravatarEmail: userEmail },
    }));
  }

  async requisitions() {
    const { token, getQuestions } = this.props;
    getQuestions(token);
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    this.setState({ loading: false, questions: data.results });
    getQuestions(data.results);
  }

  calculateScore(btn) {
    const points = { hard: 3, medium: 2, easy: 1, all: 10 };
    const { questionsPosition, questions, timer, correctAnswer } = this.state;
    const { difficulty } = questions[questionsPosition];
    if (btn.className === correctAnswer && difficulty === 'hard') {
      this.setState((previous) => ({
        score: previous.score + Number(points.all + (timer * points.hard)),
        assertions: previous.assertions + 1,
      }));
    } else if (btn.className === correctAnswer && difficulty === 'medium') {
      this.setState((previous) => ({
        score: previous.score + Number(points.all + (timer * points.medium)),
        assertions: previous.assertions + 1,
      }));
    } else if (btn.className === correctAnswer && difficulty === 'easy') {
      this.setState((previous) => ({
        score: previous.score + Number(points.all + (timer * points.easy)),
        assertions: previous.assertions + 1,
      }));
    }
  }

  btnStyle(event) {
    const correctBtn = document.querySelector('.correct-answer');
    const incorrectBtns = document.querySelectorAll('.incorrect-answer');
    this.setState({ showBtn: true, disabledBtn: true }, () => {
      this.updateStorage();
    });
    correctBtn.style.border = '3px solid rgb(6, 240, 15)';
    incorrectBtns.forEach((btn) => {
      btn.style.border = '3px solid rgb(255, 0, 0)';
    });
    clearInterval(this.myInterval);
    if (event !== null) this.calculateScore(event.target);
  }

  multiple() {
    const { questions, questionsPosition, randomNumber, disabledBtn } = this.state;
    const dataTestIdCorrect = 'correct-answer';
    const dataTestIdIncorrect = 'incorrect-answer';
    const incorrectAnswers = [
      ...questions[questionsPosition].incorrect_answers,
    ];
    this.getRandom();
    incorrectAnswers.splice(
      randomNumber,
      0,
      questions[questionsPosition].correct_answer,
    );

    return (
      <>
        <h2 data-testid="question-category">
          {questions[questionsPosition].category}
        </h2>
        <h3 data-testid="question-text">
          {questions[questionsPosition].question}
        </h3>
        {incorrectAnswers.map((question, index) => {
          const dataTestId3 = index === randomNumber
            ? dataTestIdCorrect : `wrong-answer-${index}`;
          return (
            <button
              disabled={ disabledBtn }
              data-testid={ dataTestId3 }
              key={ index }
              type="button"
              className={
                dataTestId3 === dataTestIdCorrect
                  ? dataTestIdCorrect : dataTestIdIncorrect
              }
              onClick={ this.btnStyle }
            >
              {question}
            </button>
          );
        })}
      </>
    );
  }

  startTimer() {
    const ONE_SECOND = 1000;
    const { working, loading } = this.state;
    if (working === false && loading === false) {
      this.setState({ working: true });
      this.myInterval = setInterval(() => this.setState((previous) => (
        { timer: previous.timer - 1 })), ONE_SECOND);
    }
  }

  stopTimer() {
    const { timer } = this.state;
    if (timer === 0) {
      clearInterval(this.myInterval);
      this.setState({ timer: 'Acabou o tempo', showBtn: true, disabledBtn: true });
      this.btnStyle(null);
    }
  }

  render() {
    const { questions, loading, questionsPosition,
      showBtn, timer, redirect } = this.state;
    if (loading) return 'Carregando...';
    if (redirect === true) {
      return (<Redirect to="/feedback" />);
    }
    return (
      <div>
        <Timer timer={ timer } />
        {questions[questionsPosition].type === 'multiple'
          ? this.multiple()
          : (
            <Boolean state={ this.state } btnStyle={ this.btnStyle } />
          )}
        {showBtn
          ? (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.onClick }
            >
              Próxima pergunta
            </button>
          ) : null}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (questions) => dispatch(getQuestionsSuccess(questions)),
  getToken: () => dispatch(getTokenThunk()),
  setScore: (score) => dispatch(getScore(score)),
  setAssertions: (assertions) => dispatch(getAssertions(assertions)),
});

const mapStateToProps = (state) => ({
  token: state.game.token,
  questions: state.game.questions,
  loadingQuestions: state.game.loadingQuestions,
  loadingToken: state.game.loadingToken,
  userName: state.player.name,
  userEmail: state.player.gravatarEmail,
});

Questions.propTypes = {
  getQuestions: PropTypes.func,
  token: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
