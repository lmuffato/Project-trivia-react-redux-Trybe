import React, { Component } from 'react';
import { string, func } from 'prop-types';
import { connect } from 'react-redux';
import './Alternatives.css';
import { setAnswerVisibility } from '../redux/actions/actions';

const CORRECT = 'correct-answer';
const WRONG = 'wrong-answer';

class Alternative extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { setAnswerVisibilityDispatch, verifyAnswer } = this.props;
    setAnswerVisibilityDispatch('show');
    verifyAnswer(e);
  }

  render() {
    const { alternative, correctAnswer, answerVisibility } = this.props;
    console.log(correctAnswer);
    return (
      <button
        type="button"
        className={ `${answerVisibility} btn-answer` }
        data-testid={ alternative === correctAnswer ? CORRECT : WRONG }
        onClick={ this.handleClick }
        disabled={ answerVisibility === 'show' }
      >
        {alternative
          .replace(/&quot;/gi, '"')
          .replace(/&#039;/gi, '\'')
          .replace(/&rsquo;/gi, '\'')
          .replace(/&eacute;/gi, 'é')}
      </button>
    );
  }
}

const mapStateToProps = ({ game }) => ({
  answerVisibility: game.answer_visibility,
});

const mapDispatchToProps = (dispatch) => ({
  setAnswerVisibilityDispatch: (visibility) => dispatch(setAnswerVisibility(visibility)),
});

Alternative.propTypes = {
  alternative: string,
  correctAnswer: string,
  answerVisibility: string,
  setAnswerVisibilityDispatch: func,
  verifyAnswer: func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Alternative);
