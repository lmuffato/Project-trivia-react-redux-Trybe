import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import HeaderTriviaGame from '../components/HeaderTriviaGame';
import Question from '../components/Question';
import Timer, { disableButtons } from '../components/Timer';
import Answer from '../components/Answer';
import ButtonNext from '../components/ButtonNext';
import { shuffle } from '../helper';
import { timerResetAction, updateTimer, timerIntervalAction } from '../redux/action';

class TriviaGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      goFeedback: false,
    };
    this.handleIndexIncrementOnClick = this.handleIndexIncrementOnClick.bind(this);
    this.changeBorder = this.changeBorder.bind(this);
  }

  changeBorder() {
    const btnAnswers = document.getElementsByName('answer');
    btnAnswers.forEach((btn) => {
      if (btn.getAttribute('data-testid') === 'correct-answer') {
        btn.style = 'border: 3px solid rgb(6, 240, 15)';
      } else {
        btn.style = 'border: 3px solid rgb(255, 0, 0)';
      }
    });
  }

  resetBorder() {
    const btnAnswers = document.getElementsByName('answer');
    btnAnswers.forEach((btn) => {
      btn.style = '';
    });
  }

  handleIndexIncrementOnClick() {
    const { timerReset, decreaseTimer, setTimerInterval } = this.props;
    const { index } = this.state;
    console.log('AQUI handleIndexIncrementOnClick()');
    const NUMBER_QUESTIONS = 4;
    if (index < NUMBER_QUESTIONS) {
      this.setState({
        goFeedback: true,
      });
      return;
    }
    this.setState((oldState) => ({
      index: oldState.index + 1,
    }));
    this.resetBorder();
    disableButtons(false);
    timerReset();
    // ------------------------
    const oneSecond = 1000;
    setTimerInterval(setInterval(() => {
      decreaseTimer();
    }, oneSecond));
  }

  answersRandom(index) {
    const { questions } = this.props;
    if (questions.length) {
      const correct = {
        answer: questions[index].correct_answer,
        dataTestId: 'correct-answer',
      };

      const incorrect = questions[index].incorrect_answers.map((incorrectAnswer, i) => ({
        answer: incorrectAnswer,
        dataTestId: `wrong-answer-${i}`,
      }));

      const answers = [...incorrect,
        correct];
      return shuffle(answers);
    }
  }

  render() {
    const { questions } = this.props;
    const { index, goFeedback } = this.state;
    const questionsRandom = questions.length ? this.answersRandom(index) : 'xablau';
    if (goFeedback) return <Redirect to="/feedback" />;
    return (
      <div>
        <HeaderTriviaGame />
        <div>
          {questions.length && <Question index={ index } />}
          <Timer />
        </div>
        <div>
          {questions.length && <Answer
            answers={ questionsRandom }
            changeBorder={ this.changeBorder }
          />}
          <ButtonNext onClick={ this.handleIndexIncrementOnClick } />
        </div>
      </div>
    );
  }
}

TriviaGame.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.string,
  })),
  timerReset: PropTypes.func.isRequired,
  decreaseTimer: PropTypes.func.isRequired,
  setTimerInterval: PropTypes.func.isRequired,
};

TriviaGame.defaultProps = {
  questions: [],
};

const mapStateToProps = (state) => ({
  // isFetching: state.user.isFetching,
  // timeInterval: state.timer.timeInterval,
  questions: state.user.questions,
});

const mapDispatchToProps = (dispatch) => ({
  timerReset: () => dispatch(timerResetAction()),
  decreaseTimer: () => dispatch(updateTimer()),
  setTimerInterval: (payload) => dispatch(timerIntervalAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TriviaGame);
