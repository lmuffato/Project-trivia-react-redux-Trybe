import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from './Button';
import Timer from './Timer';
// import { shuffleListOfAnswers } from '../services/shuffle';
import { scoreAndAssertionsAction,
  isTimerActiveAction, resetTimer, removeResetTimer } from '../actions';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      isButtonDisabled: false,
      hideButton: 'hide-button',
      // resetTimer: false,
      red: '',
      green: '',
    };
    this.handleStyle = this.handleStyle.bind(this);
    this.handleScore = this.handleScore.bind(this);
    this.handleResetColors = this.handleResetColors.bind(this);
    this.restoreTimer = this.restoreTimer.bind(this);
  }

  // componentWillUnmount() {
  //   this.handleLocalStorage();
  // }

  restoreTimer() {
    const { setTimer, removeQuestionTimerReset } = this.props;
    setTimer(true);
    removeQuestionTimerReset();
    // resetQuizTimer();
    // this.setState({ resetTimer: false });
  }

  handleStyle() {
    const { resetQuizTimer } = this.props;
    this.setState({
      green: 'green',
      red: 'red',
      // resetTimer: true,
      hideButton: '',
      isButtonDisabled: true,
    });
    resetQuizTimer();
  }

  // nextButtonReset
  handleResetColors() {
    this.setState({ isButtonDisabled: false, green: '', red: '' });
    const { resetQuizTimer } = this.props;
    resetQuizTimer();
  }

  handleLocalStorage() {
    const { userReducer } = this.props;
    const { email, user, playerScore, assertions } = userReducer;
    const userObject = {
      player: {
        name: user,
        assertions,
        score: playerScore,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(userObject));
  }

  handleScore() {
    const { quiz, time } = this.props;
    const ten = 10;
    const three = 3;
    this.handleLocalStorage();
    switch (quiz.difficulty) {
    case 'hard':
      return ten + (time * three);
    case 'medium':
      return ten + (time * 2);
    default:
      return ten + (time * 1);
    }
  }

  render() {
    const { quiz, getNextQuestion, setScore } = this.props;
    const { correct_answer: correctAnswer, incorrect_answers: incorrectAnswers } = quiz;
    const { isButtonDisabled, red, green, hideButton } = this.state;
    const answers = [correctAnswer].concat(incorrectAnswers).sort();
    const verifyScore = this.handleScore();
    return (
      <>
        <Timer
          handleStyle={ this.handleStyle }
          handleRestartTimer={ this.handleResetColors }
          restoreTimer={ this.restoreTimer }
        />
        <h4 data-testid="question-category">{ quiz.category }</h4>
        <h5>{ quiz.difficulty }</h5>
        <p data-testid="question-text">{ quiz.question }</p>
        { answers.map((answer, index) => (answer === correctAnswer ? (
          <Button
            key={ answer }
            className={ green }
            dataTestid="correct-answer"
            onClick={ () => { this.handleStyle(); setScore(verifyScore); } }
            disabled={ isButtonDisabled }
          >
            { answer }
          </Button>
        ) : (
          <Button
            key={ answer }
            className={ red }
            dataTestid={ `wrong-answer-${index}` }
            onClick={ this.handleStyle }
            disabled={ isButtonDisabled }
          >
            { answer }
          </Button>
        )))}
        <div>
          <Button
            dataTestid="btn-next"
            className={ hideButton }
            onClick={ () => { getNextQuestion(); this.handleResetColors(); } }
          >
            Próxima
          </Button>
        </div>
      </>
    );
  }
}

Question.defaultProps = {
  quiz: {},
  userReducer: {},
};

Question.propTypes = {
  quiz: PropTypes.shape(),
  setScore: PropTypes.func.isRequired,
  getNextQuestion: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  userReducer: PropTypes.shape(),
  setTimer: PropTypes.func.isRequired,
  resetQuizTimer: PropTypes.func.isRequired,
  removeQuestionTimerReset: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  time: state.userReducer.time,
  userReducer: state.userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  setScore: (score) => dispatch(scoreAndAssertionsAction(score)),
  setTimer: (payload) => dispatch(isTimerActiveAction(payload)),
  resetQuizTimer: () => dispatch(resetTimer()),
  removeQuestionTimerReset: () => dispatch(removeResetTimer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);

// Referências:
// Para resolver problema de assincronicidade nas funções que adicionam pontos e acertos ao localStorage e de onde surgiu a ideia de setar as classNames dos buttons via estado do componente:
// ---> PR do grupo 21 - turma 7: https://github.com/tryber/sd-07-project-trivia-react-redux/pull/545/files
// Refactoring da função que embaralha o array de respostas: https://github.com/tspeed90/quiz-game/blob/master/src/components/timer.js
