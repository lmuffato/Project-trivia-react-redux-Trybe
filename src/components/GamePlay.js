import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import userScore from '../redux/actions/userScore.action';

class GamePlay extends React.Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
      sorePlayer: 0,
    };
    this.clickOnOption = this.clickOnOption.bind(this);
    this.scoreCount = this.scoreCount.bind(this);
  }

  clickOnOption() {
    this.setState({
      clicked: true,
    });
  }

  scoreCount(event) {
    const { time, score, dispatchScore, questions } = this.props;
    // console.log(event.target)
    const id = event.target.id
    console.log(id);
    const difficultyQuestions = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    if (id === 'correct-answer') {
      const pointsRate = 10;
      const pointsPlayer = pointsRate
      + (time * difficultyQuestions[questions[0].difficulty]);
      console.log(pointsPlayer);
      dispatchScore(pointsPlayer);
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

  render() {
    const { clicked } = this.state;
    const { questions, time } = this.props;
    // console.log(questions[0].difficulty);
    return (
      <div>
        <h1 data-testid="question-category">
          Category:
          {
            questions[0].category
          }
        </h1>
        <h2 data-testid="question-text">{ questions[0].question }</h2>
        <button
          onClick={ this.scoreCount }
          id="correct-answer"
          type="button"
          data-testid="correct-answer"
          className={ clicked ? 'green-border' : '' }
          disabled={ time === 0 || clicked }
        >
          {
            questions[0].correct_answer
          }
        </button>
        {questions[0].incorrect_answers
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
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePlay);
