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

  // link: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffle(array) {
    let currentIndex = array.length; let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  render() {
    const { currentIndex } = this.state;
    const { questions } = this.props;

    const currentQuestion = questions[currentIndex];
    console.log(currentQuestion);

    const answers = [
      currentQuestion.correct_answer,
      ...currentQuestion.incorrect_answers];

    const aleatoryAnswers = this.shuffle(answers);

    return (
      <Alternatives
        question={ currentQuestion }
        aleatoryAnswers={ aleatoryAnswers }
        correctAnswer={ currentQuestion.correct_answer }
      />);
  }
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      correct_answer: PropTypes.string,
      incorrect_answers: PropTypes.arrayOf(PropTypes.string) }),
  ).isRequired,
};

// to commit
