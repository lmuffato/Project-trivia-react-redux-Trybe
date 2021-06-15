import React, { Component } from 'react';
import PropTypes from 'prop-types';

class trueFalse extends Component {
  render() {
    const { question } = this.props;

    return (
      <div>
        <span data-testid="question-category">{question.category}</span>
        <p data-testid="question-text">{question.question}</p>
        <div>
          <button type="button">True</button>
          <button type="button">False</button>
        </div>
      </div>
    );
  }
}
trueFalse.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
};

export default trueFalse;
