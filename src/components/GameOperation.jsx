import React, { Component } from 'react';
import { arrayOf, object } from 'prop-types';
import { connect } from 'react-redux';
import { rightAnswer } from '../actions';
import '../styles/question.css';
import NextQuestion from './Buttons/NextQuestion';
import Questions from './Questions';

class GameOperation extends Component {
  constructor(props) {
    super(props);

    this.selectAnswer = this.selectAnswer.bind(this);
    this.sortQuestions = this.sortQuestions.bind(this);
    this.runGame = this.runGame.bind(this);
    this.saveAtLocalStorage = this.saveAtLocalStorage.bind(this);
    this.timeCounter = this.timeCounter.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.saveRankAtLocalStorage = this.saveRankAtLocalStorage.bind(this);

    this.state = {
      question: '',
      category: '',
      difficulty: '',
      count: 0,
      gameOn: true,
      shuffleAnswers: [],
      correctAnswer: '',
      time: 30,
      scoreMultiplicators: {
        hard: 3,
        medium: 2,
        easy: 1,
      },
    };
  }

  componentDidMount() {
    this.sortQuestions();
    this.runGame();
  }

  saveRankAtLocalStorage() {
    const { player } = this.props;
    const { name, score } = player;
    const saveNewPlayerRank = {
      name,
      score,
    };
    const rankingStorage = JSON.parse(localStorage.getItem('ranking') || '[]');
    rankingStorage.push(saveNewPlayerRank);
    localStorage.setItem('ranking', JSON.stringify(rankingStorage));
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
    clearInterval(this.timer);

    const { correctAnswer, time, difficulty, scoreMultiplicators } = this.state;
    const { incrementScore } = this.props;
    const rightAnswerScore = 10;
    const score = rightAnswerScore + (time * scoreMultiplicators[difficulty]);
    if (correctAnswer === target.innerText) {
      await incrementScore(score);
    }
    this.saveAtLocalStorage();
  }

  sortQuestions() {
    const { count } = this.state;
    const { questions } = this.props;

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
    const { gameOn, time } = this.state;

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
    const { history, questions } = this.props;
    await this.setState(({ count }) => ({ count: count + 1, time: 30, gameOn: true }));

    const { count } = this.state;

    if (count >= questions.length) {
      this.saveRankAtLocalStorage();
      history.push('/feedback');
    } else {
      this.runGame();
      this.sortQuestions();
    }
  }

  render() {
    const { question, category, gameOn, shuffleAnswers, correctAnswer } = this.state;
    const gameData = { question, category, gameOn, shuffleAnswers, correctAnswer };
    return (
      <div className="question-content">
        <Questions gameData={ gameData } selectAnswer={ this.selectAnswer } />
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

GameOperation.propTypes = {
  questions: arrayOf(object),
}.isRequired;

export default connect(mapStateToProps, dispatchStateToProps)(GameOperation);
