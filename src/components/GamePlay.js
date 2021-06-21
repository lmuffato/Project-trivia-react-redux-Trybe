import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import userScore from '../redux/actions/userScore.action';
import assertionsAction from '../redux/actions/assertions.action';
import resetTimer from '../redux/actions/resetTimer.action';
import SoundCorrect from './Sounds/SoundCorrect';

class GamePlay extends React.Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
      indexQuestions: 0,
      redirect: false,
      correctClicked: false,
    };
    this.clickOnOption = this.clickOnOption.bind(this);
    this.scoreCount = this.scoreCount.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.conditional = this.conditional.bind(this);
  }

  clickOnOption() {
    this.setState({
      clicked: true,
    });
  }

  scoreCount(event) {
    const { indexQuestions, assertions } = this.state;
    const { time, dispatchScore, questions, dispatchAssertion } = this.props;
    const { id } = event.target;
    console.log(id);
    const difficultyQuestions = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    if (id === 'correct-answer') {
      this.setState(({ oldScore }) => ({
        assertions: oldScore + 1,
        correctClicked: true,
      }));
      setTimeout(() => { this.setState({ correctClicked: false }); }, 1000)
      console.log(assertions);
      const pointsRate = 10;
      const pointsPlayer = pointsRate
      + (Number(time)
      * Number(difficultyQuestions[questions[indexQuestions].difficulty]));
      dispatchScore(pointsPlayer);
      dispatchAssertion();
    }
    this.clickOnOption();
  }

  saveOnLocalStorage() {
    // player: {
    //   name,
    //   assertions,
    //   score,
    //   gravatarEmail
    // }
  }

  handleNext() {
    const { indexQuestions } = this.state;
    const { questions, dispatchReset } = this.props;
    if (indexQuestions < questions.length - 1) {
      this.setState((pastState) => ({
        indexQuestions: pastState.indexQuestions + 1,
      }));
      this.setState({ clicked: false });
      dispatchReset();
    } else {
      this.setState({
        redirect: true,
      });
    }
  }

  conditional() {
    const { clicked } = this.state;
    const { time } = this.props;
    console.log('teste');
    if (clicked || time === 0) return '';
    return 'none';
  }

  render() {
    const { clicked, indexQuestions, redirect, correctClicked } = this.state;
    const { questions, time } = this.props;
    return (
      <div>
        <SoundCorrect correctClicked={ correctClicked } />
        <h1 data-testid="question-category">
          Category:
          {
            questions[indexQuestions].category
          }
        </h1>
        <h2 data-testid="question-text">{ questions[indexQuestions].question }</h2>
        <button
          onClick={ this.scoreCount }
          id="correct-answer"
          type="button"
          data-testid="correct-answer"
          className={ clicked ? 'green-border' : '' }
          disabled={ time === 0 || clicked }
        >
          { questions[indexQuestions].correct_answer }
        </button>
        {questions[indexQuestions].incorrect_answers
          .map((incorretAnsewr, index) => (
            <button
              type="button"
              onClick={ this.scoreCount }
              id={ `wrong-answer-${index}` }
              className={ clicked ? 'red-border' : '' }
              data-testid={ `wrong-answer-${index}` }
              key={ index }
              disabled={ time === 0 || clicked }
            >
              { incorretAnsewr }
            </button>))}
        <div>
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.handleNext }
            className={ this.conditional() }
          >
            Proxima
          </button>
        </div>
        { redirect ? <Redirect to="/feedback" /> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  time: state.timerReducer.time,
  questions: state.gameReducer.questions,
  score: state.loginReducer.score,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchScore: (score) => dispatch(userScore(score)),
  dispatchAssertion: () => dispatch(assertionsAction()),
  dispatchReset: () => dispatch(resetTimer()),
});

GamePlay.propTypes = {
  time: propTypes.number.isRequired,
  questions: propTypes.arrayOf().isRequired,
  dispatchScore: propTypes.func.isRequired,
  dispatchAssertion: propTypes.func.isRequired,
  dispatchReset: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePlay);
