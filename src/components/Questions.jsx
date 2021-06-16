import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alternatives from './Alternatives';

export default class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
    };
  }

  render() {
    const { currentIndex } = this.state;
    const { questions, revelaBorda, setRevelaBorda } = this.props;

    const currentQuestion = questions[currentIndex];

    const aleatoryAnswers = currentQuestion.aleatory_answers;

    return (
      <Alternatives
        question={ currentQuestion }
        aleatoryAnswers={ aleatoryAnswers }
        correctAnswer={ currentQuestion.correct_answer }
        revelaBorda={ revelaBorda }
        setRevelaBorda={ setRevelaBorda }
      />);
  }
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      correct_answer: PropTypes.string,
      incorrect_answers: PropTypes.arrayOf(PropTypes.string),
      aleatory_answers: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
  revelaBorda: PropTypes.string.isRequired,
  setRevelaBorda: PropTypes.func.isRequired,
};
