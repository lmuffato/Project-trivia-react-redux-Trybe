import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/question.css';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: false,
      displayButton: false,
    };
    this.changeColorAnswer = this.changeColorAnswer.bind(this);
    this.handleSelectAnswer = this.handleSelectAnswer.bind(this);
  }

  handleSelectAnswer(isRightAnswer = false, difficulty = null) {
    const { handleClick, stopTimer } = this.props;
    if (isRightAnswer) handleClick(difficulty);
    stopTimer();
    this.changeColorAnswer();
  }

  changeColorAnswer() {
    this.setState({
      color: true,
      displayButton: true,
    });
  }

  nextButton() {
    const { displayButton } = this.state;
    if (displayButton) {
      return (
        <button
          type="button"
          data-testid="btn-next"
          id="btn-next"
        //  onClick={ }
        >
          Próxima
        </button>
      );
    }
  }

  render() {
    const { currQuestion, timeLeft } = this.props;
    const { color } = this.state;
    const isTimeUp = timeLeft === 0;
    const {
      category,
      question,
      incorrect_answers: incorrectAnswer,
      correct_answer: correctAnswer,
      difficulty,
    } = currQuestion;
    return (
      <section className="question-card">
        <header>
          <h3 data-testid="question-category">
            { category }
          </h3>
          <p data-testid="question-text">
            { question }
          </p>
        </header>
        <button
          type="button"
          data-testid="correct-answer"
          disabled={ isTimeUp }
          onClick={ () => this.handleSelectAnswer(true, difficulty) }
          className={ color ? 'correct-selected' : 'no-color' }
        >
          { correctAnswer }
        </button>
        { incorrectAnswer.map((quest, index) => (
          <button
            key={ index }
            data-testid={ `wrong-answer-${index}` }
            type="button"
            disabled={ isTimeUp }
            onClick={ () => this.handleSelectAnswer(false) }
            className={ color ? 'wrong-selected' : 'no-color' }
          >
            { quest }
          </button>
        )) }
        displayButton && ( <button
          type="button"
          data-testid="btn-next"
          id="btn-next"
        >
          Próxima
        </button> )
      </section>
    );
  }
}

Question.propTypes = {
  currQuestion: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    correct_answer: PropTypes.string,
    difficulty: PropTypes.string,
  }).isRequired,
  stopTimer: PropTypes.func.isRequired,
  timeLeft: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Question;
