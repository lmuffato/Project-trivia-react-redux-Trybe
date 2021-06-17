import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import userScore from '../redux/actions/userScore.action';

class GamePlay extends React.Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
      indexQuestions: 0,
    };
    this.clickOnOption = this.clickOnOption.bind(this);
    this.scoreCount = this.scoreCount.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  clickOnOption() {
    this.setState({
      clicked: true,
    });
  }

  scoreCount(event) {
    const { indexQuestions } = this.state;
    const { time, dispatchScore, questions } = this.props;
    const { id } = event.target;
    console.log(id);
    const difficultyQuestions = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    if (id === 'correct-answer') {
      const pointsRate = 10;
      const pointsPlayer = pointsRate
      + (time * difficultyQuestions[questions[indexQuestions].difficulty]);
      console.log(pointsPlayer);
      dispatchScore(pointsPlayer);
      localStorage.setItem('score', `${pointsPlayer}`);
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
    this.setState(({ index }) => ({
      index: index + 1,
    }));
  }

  render() {
    const { clicked, indexQuestions } = this.state;
    const { questions, time } = this.props;
    // console.log(questions[0].difficulty);
    return (
      <div>
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
          {
            questions[indexQuestions].correct_answer
          }
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
            onClick={ this.handleNext }
          >
            Proxima pergunta
          </button>
        </div>
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
});

GamePlay.propTypes = {
  time: propTypes.number.isRequired,
  questions: propTypes.arrayOf().isRequired,
  dispatchScore: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePlay);
