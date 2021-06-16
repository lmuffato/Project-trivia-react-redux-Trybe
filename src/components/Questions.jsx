import React, { Component } from 'react';
import { arrayOf, object } from 'prop-types';
import { connect } from 'react-redux';
import { rightAnswer } from '../actions';

class Questions extends Component {
  constructor(props) {
    super(props);

    const { questions } = this.props;
    this.selectAnswer = this.selectAnswer.bind(this);
    this.sortQuestions = this.sortQuestions.bind(this);
    this.runGame = this.runGame.bind(this);
    this.saveAtLocalStorage = this.saveAtLocalStorage.bind(this);

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
    this.saveAtLocalStorage();
  }

  runGame() {
    const oneSecond = 1000;
    const timer = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.time > 0 && prevState.gameOn) {
          return { time: prevState.time - 1 };
        }
        clearInterval(timer);
        this.saveAtLocalStorage();
        return { gameOn: false };
      });
    }, oneSecond);
  }

  saveAtLocalStorage() {
    const { player } = this.props;
    const storagePlayer = { ...player };
    delete storagePlayer.picture;
    const data = { storagePlayer };
    localStorage.setItem('state', JSON.stringify(data));
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
    console.log(score);
    if (correctAnswer === target.innerText) {
      console.log('acertou');
      await incrementScore(score);
    } else console.log('errou');
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

  render() {
    const { question, category, gameOn, shuffleAnswers, correctAnswer } = this.state;
    const { time } = this.state;

    return (
      <div>
        <div>
          <h3 data-testid="question-category">{category}</h3>
          <p data-testid="question-text">{question}</p>
        </div>
        <div>
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
                    { query }
                  </button>
                </p>);
            }
            return (
              <p
                key={ `answer-${index}` }
              >
                <button
                  style={ gameOn ? null : { border: '3px solid rgb(255, 0, 0)' } }
                  data-testid={ `wrong-answer-${index}` }
                  onClick={ this.selectAnswer }
                  type="button"
                  disabled={ !gameOn }
                >
                  { query }
                </button>
              </p>
            );
          })}
        </div>
        <p>{time}</p>
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
