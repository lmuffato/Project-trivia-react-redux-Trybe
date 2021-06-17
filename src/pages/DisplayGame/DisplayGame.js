import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { questionsApi, setScore } from '../../actions';
import { triviaAPI } from '../../services/api';
import Header from '../../components/Header';

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
    const { addScore, score: totalScore, assertions } = this.props;
    const correctAnswerValue = 10;
    const difficultyValue = this.checkDifficulty();
    const score = totalScore + (correctAnswerValue + (timer * difficultyValue));
    const totalAssertions = assertions + 1;
    addScore({ score, totalAssertions });
    localStorage.setItem('state', JSON.stringify({
      player: { score },
    }));
    this.checkAnswer();
  }

  nextButton() {
    const { questionIndex } = this.state;
    const { history } = this.props;
    const lastQuestion = 4;

    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ () => {
          if (questionIndex >= lastQuestion) {
            history.push('/feedback');
          } else {
            this.setState({ questionIndex: questionIndex + 1, displayNextButton: false });
            this.createQuestion();
            this.timerAnswer();
            this.checkAnswer();
          }
        } }
      >
        Next
      </button>
    );
  }

  checkAnswer() {
    const correctButton = document.querySelector('.correct-answer');
    const incorrectButtons = document.querySelectorAll('.wrong-answer');
    const { displayNextButton } = this.state;

    if (!displayNextButton) {
      correctButton.style.border = '3px solid rgb(6, 240, 15)';
      correctButton.setAttribute('disabled', 'disabled');
      incorrectButtons.forEach((button) => {
        button.style.border = '3px solid rgb(255, 0, 0)';
        button.setAttribute('disabled', 'disabled');
      });
      this.setState({
        displayNextButton: true,
      });
    } else {
      correctButton.style.border = '';
      correctButton.removeAttribute('disabled');
      incorrectButtons.forEach((button) => {
        button.style.border = '';
        button.removeAttribute('disabled');
      });
      this.setState({
        displayNextButton: false,
      });
    }
  }

  createQuestion() {
    const { questionIndex } = this.state;
    const { questionsApiGames } = this.props;
    if (questionsApiGames === undefined) {
      return <div>Loading...</div>;
    }
    const { question, category } = questionsApiGames[questionIndex];
    return (
      <div>
        <span data-testid="question-category">{ category }</span>
        <h2 data-testid="question-text">{ question }</h2>
        <div>
          { this.createAnswers(questionsApiGames[questionIndex]) }
        </div>
      </div>
    );
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
    const { displayNextButton, questionIndex } = this.state;
    const { questionsApiGames } = this.props;
    const indexCheck = 5;

    if (questionsApiGames === undefined) {
      return <div>Loading...</div>;
    }

    return (
      <>
        <Header />
        { questionIndex < indexCheck ? this.createQuestion() : '' }
        { displayNextButton ? this.nextButton() : '' }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  questionsApiGames: state.questionsApi.questions.results,
  token: state.user.token,
  score: state.user.score,
  assertions: state.user.assertions,
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
