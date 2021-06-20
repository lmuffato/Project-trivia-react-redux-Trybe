import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { arrayOf, object } from 'prop-types';
import Questions from '../components/Questions';
import {
  disableAnswer as disableAnswerAction,
  updateTime as updateTimeAction,
  markAnswered as markAnsweredAction,
} from '../actions';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getGravatarImg from '../components/getGravatarImg';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      questions: [],
      answers: [],
      questionIndex: 0,
      newQuestion: false,
    };
    this.setLoading = this.setLoading.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.setAnswers = this.setAnswers.bind(this);
    this.buildRanking = this.buildRanking.bind(this);
    this.resetStyle = this.resetStyle.bind(this);
    this.setLoadingNewQuestion = this.setLoadingNewQuestion.bind(this);
    this.showNextButton = this.showNextButton.bind(this);
  }

  componentDidMount() {
    this.setLoading();
  }

  setLoading() {
    const timeOut = 3000;
    setTimeout(() => {
      const { questions } = this.props;
      if (questions.length) {
        // const answers = questions.map((question) => [
        //   question.correct_answer,
        //   ...question.incorrect_answers,
        // ]);
        this.setAnswers();
        this.setState({
          questions,
          isLoading: false,
        });
      }
    }, timeOut);
  }

  setLoadingNewQuestion() {
    const timeNweQuestion = 3000;
    this.setState({ newQuestion: true }, () => setTimeout(() => {
      this.setAnswers();
      this.setState({ newQuestion: false });
    }, timeNweQuestion));
  }

  setAnswers() {
    const { questionIndex } = this.state;
    const { questions } = this.props;
    if (questions.length) {
      const {
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      } = questions[questionIndex];
      this.setState({
        answers: [correctAnswer, ...incorrectAnswers],
      });
    }
  }

  showNextButton() {
    const { isAnswered, timesUp } = this.props;
    if (isAnswered === false || timesUp === false) {
      return { display: 'none' };
    }
    if (timesUp === true || isAnswered === true) {
      return { display: 'initial' };
    }
    return { display: 'initial' };
  }

  handleClickNext() {
    const initialTime = 30;
    const { disableAnswer, markAnswered, updateTime } = this.props;
    markAnswered(false);
    this.resetStyle();
    updateTime(initialTime);
    disableAnswer(false);
    this.setState(
      ({ questionIndex }) => ({
        questionIndex: questionIndex + 1,
      }),
      () => {
        const { questionIndex } = this.state;
        if (questionIndex <= Number('4')) {
          this.setLoadingNewQuestion();
        }
      },
    );
  }

  buildRanking() {
    const playerInfo = JSON.parse(localStorage.getItem('state')).player;
    let ranking = JSON.parse(localStorage.getItem('ranking'));

    if (!Array.isArray(ranking)) {
      ranking = [];
    }

    ranking.push({
      name: playerInfo.name,
      score: playerInfo.score,
      picture: getGravatarImg(playerInfo.gravatarEmail),
    });

    ranking.sort((a, b) => b.score - a.score);

    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  resetStyle() {
    Array.from(document.querySelectorAll('.answer')).forEach((child) => {
      child.className = 'answer';
    });
  }

  render() {
    const { isAnswered, timesUp } = this.props;
    const { isLoading, questions, answers, questionIndex, newQuestion } = this.state;
    if (isLoading) return <Loading />;
    if (questionIndex > Number('4')) {
      this.buildRanking();
      return <Redirect to="/feedback" />;
    }
    return (
      <section>
        <Link to="/feedback">Teste</Link>
        <Header />
        {newQuestion ? (
          <Loading />
        ) : (
          <Questions
            questions={ questions }
            answers={ answers }
            questionIndex={ questionIndex }
          />
        )}
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.handleClickNext }
          // style={ this.showNextButton() }
          hidden={ !isAnswered }
        >
          Next
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  timesUp: state.gameMatch.timesUp,
  isAnswered: state.gameMatch.isAnswered,
});

const mapDispatchToProps = (dispatch) => ({
  disableAnswer: () => dispatch(disableAnswerAction()),
  markAnswered: (bool) => dispatch(markAnsweredAction(bool)),
  updateTime: (timer) => dispatch(updateTimeAction(timer)),
});

Game.propTypes = {
  questions: arrayOf(object),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
