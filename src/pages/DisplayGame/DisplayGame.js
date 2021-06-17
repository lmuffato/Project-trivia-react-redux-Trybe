import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { questionsApi, setScore } from '../../actions';
import { triviaAPI } from '../../services/api';
import Header from '../../components/Header';
import './styles.css';

class DisplayGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
      timer: 30,
      displayNextButton: false,
    };
    this.checkAnswer = this.checkAnswer.bind(this);
    this.fetchTrivia = this.fetchTrivia.bind(this);
    this.sumPoint = this.sumPoint.bind(this);
  }

  async componentDidMount() {
    await this.fetchTrivia();
    this.timerAnswer();
  }

  async fetchTrivia() {
    const { triviaQuestions, token } = this.props;
    const questions = await triviaAPI(token);

    triviaQuestions(questions);
  }

  timerAnswer() {
    const time = 30000;
    const interval = 1000;
    setInterval(() => {
      const { timer } = this.state;
      if (timer > 0) this.setState({ timer: timer - 1 });
    }, interval);
    setTimeout(() => {
      this.checkAnswer();
    }, time);
  }

  checkDifficulty() {
    const { questionIndex } = this.state;
    const { questionsApiGames } = this.props;
    const { difficulty } = questionsApiGames[questionIndex];
    let level = 0;
    const hardAnswerValue = 3;
    switch (difficulty) {
    case 'easy':
      level = 1;
      return level;
    case 'medium':
      level = 2;
      return level;
    case 'hard':
      level = hardAnswerValue;
      return level;
    default:
      return level;
    }
  }

  sumPoint() {
    const { timer } = this.state;
    const { addScore } = this.props;
    const correctAnswerValue = 10;
    const difficultyValue = this.checkDifficulty();
    const score = correctAnswerValue + (timer * difficultyValue);
    addScore(score);
    localStorage.setItem('state', JSON.stringify({
      player: { score },
    }));
    this.checkAnswer();
  }

  nextButton() {
    return (
      <button
        type="button"
        data-testid="btn-next"
      >
        Next
      </button>
    );
  }

  checkAnswer() {
    const correctButton = document.querySelector('.correct-answer');
    const incorrectButtons = document.querySelectorAll('.wrong-answer');
    correctButton.style.border = '3px solid rgb(6, 240, 15)';
    correctButton.setAttribute('disabled', 'disabled');
    incorrectButtons.forEach((button) => {
      button.style.border = '3px solid rgb(255, 0, 0)';
      button.setAttribute('disabled', 'disabled');
    });
    this.setState({
      displayNextButton: true,
    });
  }

  createAnswers(question) {
    const answers = [question.correct_answer]
      .concat(question.incorrect_answers);

    return answers.map((answer, indexAnswer) => (
      <button
        type="button"
        key={ indexAnswer }
        value={ answer }
        data-testid={ question.correct_answer === answer
          ? 'correct-answer' : `wrong-answer-${indexAnswer}` }
        className={ indexAnswer === 0 ? 'correct-answer' : 'wrong-answer' }
        onClick={ question.correct_answer === answer ? this.sumPoint : this.checkAnswer }
      >
        { answer }
      </button>
    ));
  }

  render() {
    const { questionIndex, displayNextButton } = this.state;
    const { questionsApiGames } = this.props;

    if (questionsApiGames === undefined) {
      return <div>Loading...</div>;
    }
    const { question, category } = questionsApiGames[questionIndex];

    return (
      <>
        <div className="root">
          <span className="categoria" data-testid="question-category">{ category }</span>
          <h2 data-testid="question-text">{ question }</h2>
          <div className="respostas">
            { this.createAnswers(questionsApiGames[questionIndex]) }
          </div>
          { displayNextButton ? this.nextButton() : 0 }
        </div>
        <Header />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  questionsApiGames: state.questionsApi.questions.results,
  token: state.user.token,
  score: state.user.score,
});

const mapDispatchToProps = (dispatch) => ({
  triviaQuestions: (payload) => dispatch(questionsApi(payload)),
  addScore: (payload) => dispatch(setScore(payload)),
});

DisplayGame.propTypes = {
  questionsApi: PropTypes.object,
  setScore: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(DisplayGame);
