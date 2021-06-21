import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { decode } from 'he';
import Button from './button/Button';
import Badge from './badge/Badge';

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
        <Button
          id="correct-answer"
          classList={ borderClass }
          dataTestId="correct-answer"
          type="button"
          handleClick={ this.handleClick }
          value={ answer }
          disabled={ selected }
          text={ decode(answer) }
          key="correct-answer-button"
        />
      </div>
    );
  }

  getButtonIncorrectAnswer(index, answer) {
    const { selected } = this.props;
    let borderClass = '';
    if (selected !== undefined) borderClass = 'border-incorrect';
    return (
      <div>
        <Button
          key={ index }
          id="incorrect-answer"
          classList={ borderClass }
          dataTestId={ `wrong-answer-${index}` }
          type="button"
          handleClick={ this.handleClick }
          value={ answer }
          disabled={ selected }
          text={ decode(answer) }
        />
      </div>
    );
  }

  getQuestion(correctAnswer, incorrectAnswers) {
    return [correctAnswer, ...incorrectAnswers].sort();
  }

  handleClick(event) {
    const { selectedAnswer } = this.props;
    selectedAnswer(event);
  }

  render() {
    const { questionData } = this.props;
    const { category, question, difficulty } = questionData;
    const correctAnswer = questionData.correct_answer;
    const incorrectAnswers = questionData.incorrect_answers;

    const dataAnswers = this.getQuestion(correctAnswer, incorrectAnswers);

    return (
      <div>
        <h2 data-testid="question-text">{decode(question)}</h2>
        { dataAnswers.map((answer, index) => {
          if (answer === correctAnswer) {
            return this.getButtonCorrectAnswer(index, answer);
          }
          return this.getButtonIncorrectAnswer(index, answer);
        })}
        <div className="box-question-opt">
          <Badge
            text="Category"
            value={ category }
            classList="badge-primary-white exact small no-icon"
            dataTestId="question-category"
          />
          <Badge
            text="Difficulty"
            value={ difficulty }
            classList="badge-primary-white exact small no-icon"
          />
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  questionData: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    difficulty: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  selectedAnswer: PropTypes.func.isRequired,
};

export default Question;
