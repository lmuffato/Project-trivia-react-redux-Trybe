import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import {
  lastQuestion,
  nextQuestion,
  setAnswerVisibility,
} from '../redux/actions/actions';

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
    } = this.props;

    if (currentQuestionIndex === questions.length - 1) {
      lastQuestionDispatch(true);
    } else {
      nextQuestionDispatch();
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
});

const mapDispatchToProps = (dispatch) => ({
  nextQuestionDispatch: () => dispatch(nextQuestion()),
  setAnswerVisibilityDispatch: (visibility) => dispatch(setAnswerVisibility(visibility)),
  lastQuestionDispatch: (redirect) => dispatch(lastQuestion(redirect)),
});

NextQuestionBtn.propTypes = {
  nextQuestionDispatch: func,
  setAnswerVisibilityDispatch: func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(NextQuestionBtn);
