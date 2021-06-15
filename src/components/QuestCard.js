import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MultipleTypeQuest from './MultipleTypeQuest';

class QuestCard extends Component {
  render() {
    const { question } = this.props;
    const wrongAlternatives = question.incorrect_answers
      .map((incAns, index) => ({ text: incAns, dataTest: `wrong-answer${index}` }));
    const correctAlternative = {
      text: question.correct_answer,
      dataTest: 'correct-answer',
    };
    const alternatives = [correctAlternative, ...wrongAlternatives];
    return (
      <div>
        <p data-testid="question-category">{ question.category }</p>
        <h1 data-testid="question-text">{ question.question }</h1>
        <MultipleTypeQuest alternatives={ alternatives } />
      </div>
    );
  }
}

QuestCard.propTypes = {
  question: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default QuestCard;
