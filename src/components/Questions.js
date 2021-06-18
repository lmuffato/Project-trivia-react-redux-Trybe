import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../pages/game.module.css';
import Loading from './Loading';
import Timer from './Timer';
import './questions.css';
import {
  setDifficultyAction,
  updateScoreAction,
  calcPointsAction,
} from '../redux/actions/index';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsIndex: 0,
      isVisible: 'false',
      borderColor: [],
      reset: false,
      stop: false,
      disabled: false,
    };
    this.handleClickAnswer = this.handleClickAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.handleZero = this.handleZero.bind(this);
    this.resetDifficulty = this.resetDifficulty.bind(this);
  }

  componentDidUpdate() {
    const { calc } = this.props;
    if (calc) {
      this.addPoints();
      this.addToLocalStorage();
    }
  }

  addPoints() {
    const { updateScoreProps, timer, difficulty } = this.props;
    let questionDif = 0;
    const pointsForDifficultyHard = 3;
    if (difficulty) {
      switch (difficulty) {
      case 'easy':
        questionDif = 1;
        break;
      case 'medium':
        questionDif = 2;
        break;
      case 'hard':
        questionDif = pointsForDifficultyHard;
        break;
      default:
        questionDif = 0;
      }
    }
    let points = 0;
    let assertions = 0;
    if (timer !== 0 && questionDif !== 0) {
      const value = 10;
      points = value + timer * questionDif;
      assertions = 1;
      updateScoreProps({ points, assertions });
    }
    this.resetDifficulty();
  }

  nextQuestion(NumberOfQuestions) {
    this.setState((prevState) => ({
      questionsIndex: (prevState.questionsIndex + 1) % NumberOfQuestions,
      borderColor: [],
      isVisible: 'false',
      reset: true,
      stop: false,
      disabled: false,
    }));
  }

  resetDifficulty() {
    const { setDifficultyProps } = this.props;
    const difficulty = '';
    setDifficultyProps({ difficulty });
  }

  handleClickAnswer(e) {
    const alternatives = Array.from(document
      .getElementsByClassName(styles.question__alternatives));
    const classAnswerCorrect = 'question__alternatives__correct';
    const classAnswerIncorrect = 'question__alternatives__incorrect';
    alternatives.forEach((alternative) => {
      if (/wrong/gi.test(alternative.getAttribute('data-testid'))) {
        this.setState((prevState) => ({
          borderColor: [...prevState.borderColor, classAnswerIncorrect],
        }));
      } else {
        this.setState((prevState) => ({
          borderColor: [...prevState.borderColor, classAnswerCorrect],
        }));
      }
    });
    this.setState({ isVisible: 'true', stop: true, reset: false, disabled: true });
    if (e && e.target.getAttribute('data-testid') === 'correct-answer') {
      const difficulty = e.target.getAttribute('difficulty');
      const { setDifficultyProps } = this.props;
      setDifficultyProps({ difficulty });
    }
  }

  addToLocalStorage() {
    const { name, email, score, assertions } = this.props;
    const player = { name, email, score, assertions };
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  handleZero() {
    this.handleClickAnswer();
  }

  render() {
    const { borderColor, isVisible, questionsIndex, reset, stop, disabled } = this.state;
    const { loading, questions } = this.props;
    const questionsFiltered = questions[questionsIndex];
    console.log(questionsFiltered);
    if (loading || questions.length < 1) {
      return <Loading />;
    }
    return (
      <div>
        <div>
          <h2 data-testid="question-category">{questionsFiltered.category}</h2>
          <p data-testid="question-text">{questionsFiltered.question}</p>
        </div>
        <div className={ styles.question__card }>
          <ul className={ styles.question__list }>
            {questionsFiltered.alternatives.map((question, index) => (
              <li key={ index }>
                <button
                  onClick={ this.handleClickAnswer }
                  type="button"
                  className={ [styles
                    .question__alternatives, borderColor[index]].join(' ') }
                  data-testid={ Object.values(question) }
                  disabled={ disabled }
                  difficulty={ questionsFiltered.difficulty }
                >
                  {Object.keys(question)}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          data-testid="btn-next"
          onClick={ () => this.nextQuestion(questions.length) }
          className={
            [styles.question__button, `question__button__${isVisible}`]
              .join(' ')
          }
        >
          Próxima
        </button>
        <Timer reset={ reset } stop={ stop } handleZero={ this.handleZero } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.data,
  loading: state.questionsReducer.loading,
  timer: state.timerReducer.timer,
  difficulty: state.timerReducer.difficulty,
  calc: state.timerReducer.calc,
  name: state.playerReducer.name,
  email: state.playerReducer.email,
  score: state.playerReducer.score,
  assertions: state.playerReducer.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  setDifficultyProps: (payload) => dispatch(setDifficultyAction(payload)),
  updateScoreProps: (payload) => dispatch(updateScoreAction(payload)),
  calcPointsProps: () => dispatch(calcPointsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    alternatives: PropTypes.arrayOf(PropTypes.object),
    difficulty: PropTypes.string.isRequired,
  })).isRequired,
  loading: PropTypes.bool,
  setDifficultyProps: PropTypes.func.isRequired,
  calc: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  updateScoreProps: PropTypes.func.isRequired,
  timer: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
};

Questions.defaultProps = {
  loading: true,
};
