import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Alternatives.css';

const CORRECT = 'correct-answer';
const INCORRECT = 'wrong-answer';

class Alternatives extends Component {
  constructor() {
    super();
    this.state = {
      revelaBorda: '',
    };
  }

  render() {
    const { question, aleatoryAnswers, correctAnswer } = this.props;
    const { revelaBorda } = this.state;
    const questionReplaced = question.question
      .replace(/&quot;/gi, '"')
      .replace(/&#039;/gi, '\'');

    return (
      <div>
        <p data-testid="question-category">{question.category}</p>
        <p data-testid="question-text">{questionReplaced}</p>
        <div className="answers">
          {aleatoryAnswers.map((answer, index) => (
            <button
              key={ index }
              className={ revelaBorda }
              type="button"
              data-testid={ answer === correctAnswer ? CORRECT : INCORRECT }
              onClick={ () => { this.setState({ revelaBorda: 'show' }); } }
            >
              { answer }
            </button>
          ))}
        </div>
      </div>
    );
  }
}

Alternatives.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
  aleatoryAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
  correctAnswer: PropTypes.string.isRequired,
};

export default Alternatives;
