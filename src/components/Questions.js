import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Questions.css';

class Questions extends Component {
  constructor() {
    super();
    this.addBorderOnClick = this.addBorderOnClick.bind(this);
    this.createAlternativesButtons = this.createAlternativesButtons.bind(this);
    this.mockAlternatives = this.mockAlternatives.bind(this);
  }

  addBorderOnClick() {
    const altButtons = document.querySelectorAll('.alternative-button');
    altButtons.forEach((button) => {
      const isCorrect = button.getAttribute('data-testid') === 'correct-answer';
      if (isCorrect) {
        button.classList.add('correct-color');
      } else {
        button.classList.add('wrong-color');
      }
    });
  }

  createAlternativesButtons(question) {
    const altArray = [...question.incorrect_answers, question.correct_answer];
    const randomNumber = 0.5;
    const shuffledAltArray = altArray.sort(() => Math.random() - randomNumber);
    return shuffledAltArray.map((alt, index) => {
      const isCorrect = (alt === question.correct_answer);
      return (
        <button
          key={ index }
          type="button"
          data-testid={ isCorrect ? 'correct-answer' : `wrong-answer-${index}` }
          className="alternative-button"
          onClick={ this.addBorderOnClick }
        >
          {alt}
        </button>
      );
    });
  }

  mockAlternatives() {
    return (
      <>
        <button type="button" data-testid="correct-answer">Loading...</button>
        <button type="button" data-testid="wrong-answer">Loading...</button>
      </>
    );
  }

  render() {
    const { props: { questions }, createAlternativesButtons, mockAlternatives } = this;
    const validQuestions = questions.length > 0;

    return (
      <div>
        <p data-testid="question-category">
          {validQuestions ? questions[0].category : 'carregando...'}
        </p>
        <p data-testid="question-text">
          {validQuestions ? questions[0].question : 'carrengando...'}
        </p>
        {validQuestions ? createAlternativesButtons(questions[0]) : mockAlternatives()}
      </div>
    );
  }
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
    difficulty: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  })),
}.isRequired;

export default Questions;
