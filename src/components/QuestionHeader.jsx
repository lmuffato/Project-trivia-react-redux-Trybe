import React, { Component } from 'react';
import PropTypes from 'prop-types';

class QuestionHeader extends Component {
  render() {
    const { question } = this.props;
    return (
      <div>
        <p data-testid="question-category">{question.category}</p>
        <p>{question.difficulty}</p>
        <p data-testid="question-text">{question.question}</p>
      </div>
    );
  }
}

QuestionHeader.propTypes = {
  question: PropTypes.arrayOf(Object),
}.isRequired;

export default QuestionHeader;
