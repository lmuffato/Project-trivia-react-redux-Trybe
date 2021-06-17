import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MultipleTypeQuest from './MultipleTypeQuest';

class QuestCard extends Component {
  constructor() {
    super();
    this.getAnswer = this.getAnswer.bind(this);
  }

  getAnswer(answer) {
    const { getUserAnswer } = this.props;
    getUserAnswer(answer);
  }

  render() {
    const { question } = this.props;
    const wrongAlternatives = question.incorrect_answers
      .map((incAns, index) => ({ text: incAns, dataTest: `wrong-answer${index}` }));
    const correctAlternative = {
      text: question.correct_answer,
      dataTest: 'correct-answer',
    };
    const alternatives = {
      alt: [correctAlternative, ...wrongAlternatives],
      difficulty: question.difficulty,
    };
    return (
      <div>
        <p data-testid="question-category">{ question.category }</p>
        <h1 data-testid="question-text">{ question.question }</h1>
        <MultipleTypeQuest alternatives={ alternatives } getAnswer={ this.getAnswer } />
      </div>
    );
  }
}

QuestCard.propTypes = {
  question: PropTypes.arrayOf(PropTypes.object).isRequired,
  getUserAnswer: PropTypes.func.isRequired,
};

export default QuestCard;
