import React, { Component } from 'react';
import { arrayOf, object } from 'prop-types';
import { connect } from 'react-redux';
import parse from 'html-react-parser';
import { rightAnswer } from '../actions';
import '../styles/question.css';
import NextQuestion from './NextQuestion/NextQuery';

class Questions extends Component {
  constructor(props) {
    super(props);

    const { questions } = this.props;
    this.selectAnswer = this.selectAnswer.bind(this);
    this.sortQuestions = this.sortQuestions.bind(this);
    this.runGame = this.runGame.bind(this);
    this.saveAtLocalStorage = this.saveAtLocalStorage.bind(this);
    this.timeCounter = this.timeCounter.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);

    this.state = {
      questions,
      question: '',
      category: '',
      difficulty: '',
      count: 0,
      gameOn: true,
      shuffleAnswers: [],
      correctAnswer: '',
      time: 30,
    };
  }

  componentDidMount() {
    this.sortQuestions();
    this.runGame();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  runGame() {
    const oneSecond = 1000;
    this.timer = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.time > 0 && prevState.gameOn) {
          return { time: prevState.time - 1 };
        }
        clearInterval(this.timer);
        this.saveAtLocalStorage();

        return { gameOn: false };
      });
    }, oneSecond);
  }

  saveAtLocalStorage() {
    const { player: redux } = this.props;
    const player = { ...redux };
    delete player.picture;
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  async selectAnswer({ target }) {
    this.setState({ gameOn: false });
    const { correctAnswer, time, difficulty } = this.state;
    const scoreMultiplicators = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    const { incrementScore } = this.props;
    const rightAnswerScore = 10;
    const score = rightAnswerScore + (time * scoreMultiplicators[difficulty]);
    if (correctAnswer === target.innerText) {
      await incrementScore(score);
    }
    this.saveAtLocalStorage(score);
  }

  sortQuestions() {
    const { questions, count } = this.state;
    const {
      difficulty,
      question,
      category,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswer } = questions[count];
    const sortValue = 0.5;
    const shuffleAnswers = [...incorrectAnswer, correctAnswer]
      .sort(() => Math.random() - sortValue);
    this.setState({ shuffleAnswers, correctAnswer, question, category, difficulty });
  }

  timeCounter() {
    const { gameOn } = this.state;
    const { time } = this.state;
    return (
      <p
        className={ (time === 0) || (gameOn === false)
          ? 'timerPaused'
          : 'timer' }
      >
        {time}
      </p>
    );
  }

  async nextQuestion() {
    const { history } = this.props;
    await this.setState(({ count }) => ({ count: count + 1, time: 30, gameOn: true }));
    const { count, questions } = this.state;
    if (count >= questions.length) history.push('/feedback');
    else {
      this.saveAtLocalStorage();
      this.runGame();
      this.sortQuestions();
    }
  }

  render() {
    const { question, category, gameOn, shuffleAnswers, correctAnswer } = this.state;
    return (
      <div className="question-content">
        <div>
          <h3 data-testid="question-category">{category}</h3>
          <p data-testid="question-text">{parse(question)}</p>
        </div>
        <div className="options-content">
          {shuffleAnswers.map((query, index) => {
            if (query === correctAnswer) {
              return (
                <p
                  key={ `answer-${index}` }
                >
                  <button
                    data-testid="correct-answer"
                    onClick={ this.selectAnswer }
                    type="button"
                    style={ gameOn ? null : { border: '3px solid rgb(6, 240, 15)' } }
                    disabled={ !gameOn }
                  >
                    { parse(query) }
                  </button>
                </p>);
            }
            return (
              <p key={ `answer-${index}` }>
                <button
                  style={ gameOn ? null : { border: '3px solid rgb(255, 0, 0)' } }
                  data-testid={ `wrong-answer-${index}` }
                  onClick={ this.selectAnswer }
                  type="button"
                  disabled={ !gameOn }
                >
                  { parse(query) }
                </button>
              </p>
            );
          })}
        </div>
        { this.timeCounter() }
        <NextQuestion hidden={ gameOn } nextQuestion={ this.nextQuestion } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.gameData.questions,
  player: state.player,
});

const dispatchStateToProps = (dispatch) => ({
  incrementScore: (score) => dispatch(rightAnswer(score)),
});

Questions.propTypes = {
  questions: arrayOf(object),
}.isRequired;

export default connect(mapStateToProps, dispatchStateToProps)(Questions);
