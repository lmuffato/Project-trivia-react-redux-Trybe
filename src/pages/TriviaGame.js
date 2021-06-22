import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import HeaderTriviaGame from '../components/HeaderTriviaGame';
import Question from '../components/Question';
import Timer from '../components/Timer';
import Answer from '../components/Answer';
import ButtonNext from '../components/ButtonNext';
import { getLocalStorage, setLocalStorage, shuffle } from '../helper';
import {
  timerResetAction,
  updateTimer,
  setIdInterval,
  setCorrectAnswerAction,
} from '../redux/action';

const CORRECT_ANSWER = 'correct-answer';
class TriviaGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      disableBtn: true,
      goFeedback: false,
      disableBtn: true,
      answersRandom: [],
      shouldChangeAnswer: true,
    };
    this.handleIndexIncrementClick = this.handleIndexIncrementClick.bind(this);
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.enableBtnNext = this.enableBtnNext.bind(this);
  }

  componentWillUnmount() {
    const { idInterval } = this.props;
    clearInterval(idInterval);
  }

  setAnswersRandom() {
    const { index } = this.state;
    this.setState({
      answersRandom: this.answersRandom(index),
      shouldChangeAnswer: false,
    }, () => {
      const { answersRandom } = this.state;
      console.table(answersRandom);
    });
  }

  toggleBtn(bool) {
    this.setState({
      disableBtn: bool,
    });
  }

  /**
   * Show correct and inscorrects answers or clear style buttons
   * @param {boolean?} reset Should clear style buttons
   */
  handleShowCorrectClick(reset) {
    const btnAnswers = document.getElementsByName('answer');
    btnAnswers.forEach((btn) => {
      if (reset) { btn.style = ''; btn.removeAttribute('disabled'); return; }
      btn.setAttribute('disabled', true);
      if (btn.getAttribute('data-testid') === CORRECT_ANSWER) {
        btn.style = 'border: 3px solid rgb(6, 240, 15)';
      } else {
        btn.style = 'border: 3px solid rgb(255, 0, 0)';
      }
    });
    this.toggleBtn(false);
  }

  enableBtnNext() {
    this.setState({
      disableBtn: false,
    });
  }

  disableBtnAnwser(bool) {
    const btnAnswers = document.getElementsByName('answer');
    btnAnswers.forEach((btn) => {
      if (bool) {
        btn.setAttribute('disabled', bool);
      } else { btn.removeAttribute('disabled'); }
    });
  }

  handleAnswerClick(ev) {
    const { idInterval } = this.props;
    console.log(ev);
    if (ev.target.getAttribute('data-testid') === CORRECT_ANSWER) {
      const user = getLocalStorage('state');
      user.player.assertions += 1;
      // adicionar score ( esta sendo adicionado em Answer)
      setLocalStorage('state', user);
    }
    this.handleShowCorrectClick();
    // enableBtnNext();
    this.setState({
      disableBtn: false,
      // shouldChangeAnswer: false,
    });
    clearInterval(idInterval);
  }

  handleIndexIncrementClick() {
    const { timerReset, decreaseTimer, setIntervalID, questions } = this.props;
    const { index } = this.state;
    const NUMBER_QUESTIONS = questions.length - 1;
    if (index >= NUMBER_QUESTIONS) {
      // adicionar user e score
      this.setState({
        goFeedback: true,
      });
      return;
    } // Finish
    this.setState((oldState) => ({
      index: oldState.index + 1,
      disableBtn: true,
      shouldChangeAnswer: true,
    }), () => {
      this.setAnswersRandom();
    });
    this.handleShowCorrectClick(true);
    this.disableBtnAnwser(false);
    timerReset();
    // ------------------------
    const oneSecond = 1000;
    setIntervalID(setInterval(() => {
      decreaseTimer();
    }, oneSecond));
  }

  answersRandom(index) {
    const { questions } = this.props;
    const { answersRandom, shouldChangeAnswer } = this.state;
    // const { answersRandom } = this.state;
    if (questions.length && shouldChangeAnswer) {
      const correct = {
        answer: questions[index].correct_answer,
        dataTestId: CORRECT_ANSWER,
        difficulty: questions[index].difficulty,
      };
      const incorrect = questions[index].incorrect_answers.map((incorrectAnswer, i) => ({
        answer: incorrectAnswer,
        dataTestId: `wrong-answer-${i}`,
        difficulty: questions[index].difficulty,
      }));
      const answers = [...incorrect, correct];

      if (index === 0 && shouldChangeAnswer) {
        this.setState({
          answersRandom: shuffle(answers),
          shouldChangeAnswer: false,
        });
      }
      return shuffle(answers);
    }
    return answersRandom;
  }

  render() {
    const { questions } = this.props;
    const { index, goFeedback, disableBtn } = this.state;
    // const questionsRandom = questions.length ? this.answersRandom(index) : 'xablau';
    if (goFeedback) return <Redirect to="/feedback" />;
    return (
      <div>
        <HeaderTriviaGame />
        <div>
          {questions.length && <Question index={ index } />}
          <Timer enableBtnNext={ this.enableBtnNext } />
        </div>
        <div>
          {(questions.length) && <Answer
            answers={ this.answersRandom(index) }
            onClick={ this.handleAnswerClick }
          />}
          <ButtonNext
            onClick={ this.handleIndexIncrementClick }
            disableBtn={ disableBtn }
          />
        </div>
      </div>
    );
  }
}

TriviaGame.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.string,
    difficulty: PropTypes.string,
  })),
  timerReset: PropTypes.func.isRequired,
  decreaseTimer: PropTypes.func.isRequired,
  setIntervalID: PropTypes.func.isRequired,
  idInterval: PropTypes.number.isRequired,
};

TriviaGame.defaultProps = {
  questions: [],
};

const mapStateToProps = (state) => ({
  // isFetching: state.user.isFetching,
  idInterval: state.idInterval.id,
  questions: state.questions.questions,

});

const mapDispatchToProps = (dispatch) => ({
  timerReset: () => dispatch(timerResetAction()),
  decreaseTimer: () => dispatch(updateTimer()),
  setIntervalID: (payload) => dispatch(setIdInterval(payload)),
  setCorrectAnswer: () => dispatch(setCorrectAnswerAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TriviaGame);
