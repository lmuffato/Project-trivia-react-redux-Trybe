import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/question.css';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: false,
    };
    this.changeColorAnswer = this.changeColorAnswer.bind(this);
  }

  changeColorAnswer() {
    this.setState({
      color: true,
    });
  }

  render() {
    const { color } = this.state;
    const { currQuestion, handleClick } = this.props;
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
          onClick={ () => {
            handleClick(difficulty);
            this.changeColorAnswer();
          } }
          className={ color ? 'correct-selected' : 'no-color' }
        >
          { correctAnswer }
        </button>
        { incorrectAnswer.map((quest, index) => (
          <button
            key={ index }
            data-testid={ `wrong-answer-${index}` }
            type="button"
            onClick={ this.changeColorAnswer }
            className={ color ? 'wrong-selected' : 'no-color' }
          >
            { quest }
          </button>
        )) }
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
  handleClick: PropTypes.func.isRequired,
};

export default Question;
