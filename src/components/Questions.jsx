import React, { Component } from 'react';
import { string, arrayOf, shape, func } from 'prop-types';
import { connect } from 'react-redux';
import Alternatives from './Alternatives';
import { updateScore } from '../redux/actions/actions';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
    };
    this.setScore = this.setScore.bind(this);
  }

  setScore(shouldCalc) {
    const { currentIndex } = this.state;
    const { questions, timer, time, saveScore } = this.props;
    const currentQuestion = questions[currentIndex];
    const { difficulty } = currentQuestion;
    const THREE_POINTS = 3;
    const SCORE_PARAM = 10;

    const difficultyConditional = () => {
      switch (difficulty) {
      case 'easy':
        return 1;
      case 'medium':
        return 2;
      case 'hard':
        return THREE_POINTS;
      default:
        return 0;
      }
    };

    clearInterval(timer.timer);

    if (shouldCalc === true) {
      const score = SCORE_PARAM + (time * difficultyConditional());
      saveScore(score);
      console.log(score);
      localStorage.setItem('score', score);
    }
  }

  render() {
    const { currentIndex } = this.state;
    const { questions, revelaBorda, setRevelaBorda } = this.props;

    const currentQuestion = questions[currentIndex];

    const aleatoryAnswers = currentQuestion.aleatory_answers;

    return (
      <Alternatives
        setScore={ this.setScore }
        question={ currentQuestion }
        aleatoryAnswers={ aleatoryAnswers }
        correctAnswer={ currentQuestion.correct_answer }
        revelaBorda={ revelaBorda }
        setRevelaBorda={ setRevelaBorda }
      />);
  }
}

Questions.propTypes = {
  questions: arrayOf(
    shape({
      correct_answer: string,
      incorrect_answers: arrayOf(string),
      aleatory_answers: arrayOf(string),
    }),
  ).isRequired,
  revelaBorda: string,
  difficulty: string,
  setRevelaBorda: func,
}.isRequired;

const mapStateToProps = (state) => ({
  timer: state.jogoReducer.time,
});

const mapDispatchToProps = (dispatch) => ({
  saveScore: (payload) => dispatch(updateScore(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
