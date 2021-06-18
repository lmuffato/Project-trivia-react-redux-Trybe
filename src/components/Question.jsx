import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { decode } from 'he';

class Question extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.getButtonCorrectAnswer = this.getButtonCorrectAnswer.bind(this);
    this.getButtonIncorrectAnswer = this.getButtonIncorrectAnswer.bind(this);
  }

  getButtonCorrectAnswer(index, answer) {
    const { selected } = this.props;
    let borderClass = '';
    if (selected !== undefined) borderClass = 'border-correct';
    return (
      <div>
        <button
          id="correct-answer"
          className={ borderClass }
          data-testid="correct-answer"
          type="button"
          onClick={ this.handleClick }
          value={ answer }
          disabled={ selected }
        >
          {answer}
        </button>
      </div>
    );
  }

  getButtonIncorrectAnswer(index, answer) {
    const { selected } = this.props;
    let borderClass = '';
    if (selected !== undefined) borderClass = 'border-incorrect';
    return (
      <div>
        <button
          key={ index }
          id="incorrect-answer"
          className={ borderClass }
          type="button"
          data-testid={ `wrong-answer-${index}` }
          onClick={ this.handleClick }
          value={ answer }
          disabled={ selected }
        >
          {answer}
        </button>
      </div>
    );
  }

  getQuestion(correctAnswer, incorrectAnswers) {
    return [correctAnswer, ...incorrectAnswers].sort();
  }

  handleClick() {
    const { selectedAnswer } = this.props;
    selectedAnswer();
  }

  render() {
    const { questionData } = this.props;
    const { category } = questionData;
    const currentQuestion = questionData.question;
    const correctAnswer = questionData.correct_answer;
    const incorrectAnswers = questionData.incorrect_answers;

    const dataAnswers = this.getQuestion(correctAnswer, incorrectAnswers);

    return (
      <div>
        <h2 data-testid="question-text">{decode(currentQuestion)}</h2>
        <p data-testid="question-category">{category}</p>
        { dataAnswers.map((answer, index) => {
          if (answer === correctAnswer) {
            return this.getButtonCorrectAnswer(index, answer);
          }
          return this.getButtonIncorrectAnswer(index, answer);
        })}
      </div>
    );
  }
}

Question.propTypes = {
  questionData: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  selectedAnswer: PropTypes.func.isRequired,
};

export default Question;
