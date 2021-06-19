import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, string, number, objectOf, shape } from 'prop-types';
import {
  lastQuestion,
  nextQuestion,
  resetTimer,
  setAnswerVisibility,
  timerThunk,
} from '../redux/actions/actions';
import { saveRanking } from '../helpers/storage';

class NextQuestionBtn extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const {
      nextQuestionDispatch,
      setAnswerVisibilityDispatch,
      lastQuestionDispatch,
      questions,
      currentQuestionIndex,
      resetTimerDispatch,
      startTimer,
      player,
    } = this.props;

    if (currentQuestionIndex === questions.length - 1) {
      lastQuestionDispatch(true);
      saveRanking(player);
    } else {
      nextQuestionDispatch();
      resetTimerDispatch();
      startTimer();
    }
    setAnswerVisibilityDispatch('hide');
  }

  render() {
    return (
      <button
        type="button"
        className="button-next"
        data-testid="btn-next"
        onClick={ this.handleClick }
      >
        Próxima Pergunta
      </button>
    );
  }
}

const mapStateToProps = ({ game }) => ({
  questions: game.questions,
  currentQuestionIndex: game.currentQuestionIndex,
  player: game.player,
});

const mapDispatchToProps = (dispatch) => ({
  nextQuestionDispatch: () => dispatch(nextQuestion()),
  setAnswerVisibilityDispatch: (visibility) => dispatch(setAnswerVisibility(visibility)),
  lastQuestionDispatch: (redirect) => dispatch(lastQuestion(redirect)),
  resetTimerDispatch: () => dispatch(resetTimer()),
  startTimer: () => dispatch(timerThunk()),
});

NextQuestionBtn.propTypes = {
  nextQuestionDispatch: func,
  setAnswerVisibilityDispatch: func,
  resetTimerDispatch: func,
  player: objectOf(shape({
    name: string,
    gravatarEmail: string,
    score: number,
    assertions: number,
  })),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(NextQuestionBtn);
