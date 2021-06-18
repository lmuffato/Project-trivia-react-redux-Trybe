import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Questions.css';
import Timer from './Timer';

const correctTestId = 'correct-answer';

class Questions extends Component {
  constructor() {
    super();
    this.stopCountdown = this.stopCountdown.bind(this);
    this.addBorderOnClick = this.addBorderOnClick.bind(this);
    this.disableAlternativeButtons = this.disableAlternativeButtons.bind(this);
    this.updateScoreToLS = this.updateScoreToLS.bind(this);
    this.alternativeClick = this.alternativeClick.bind(this);
    this.createAlternativesButtons = this.createAlternativesButtons.bind(this);
    this.mockAlternatives = this.mockAlternatives.bind(this);
  }

  stopCountdown() {
    const { props: { timerID } } = this;
    clearInterval(timerID);
  }

  addBorderOnClick() {
    const altButtons = document.querySelectorAll('.alternative-button');
    altButtons.forEach((button) => {
      const isCorrect = button.getAttribute('data-testid') === correctTestId;
      if (isCorrect) {
        button.classList.add('correct-color');
      } else {
        button.classList.add('wrong-color');
      }
    });
  }

  disableAlternativeButtons() {
    const altButtons = document.querySelectorAll('.alternative-button');
    altButtons.forEach((button) => {
      button.setAttribute('disabled', true);
    });
  }

  updateScoreToLS(timer, diff) {
    const basePoints = 10;
    const difficultyReference = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    const questionPoints = basePoints + (timer * difficultyReference[diff]);
    const ls = JSON.parse(localStorage.getItem('state'));
    const updatedPlayer = {
      ...ls.player,
      score: ls.player.score + questionPoints,
    };

    localStorage.setItem('state', JSON.stringify({ player: updatedPlayer }));
  }

  alternativeClick(event) {
    event.persist();
    const {
      props: { questions, seconds },
      stopCountdown,
      addBorderOnClick,
      disableAlternativeButtons,
      updateScoreToLS } = this;

    stopCountdown();
    addBorderOnClick();
    disableAlternativeButtons();

    const isCorrect = event.target.getAttribute('data-testid') === correctTestId;

    if (isCorrect) {
      updateScoreToLS(seconds, questions[0].difficulty);
    }
  }

  createAlternativesButtons(question) {
    const shuffledAltArray = question.shuffledAlternatives;
    return shuffledAltArray.map((alt, index) => {
      const isCorrect = (alt === question.correct_answer);
      return (
        <button
          key={ index }
          type="button"
          data-testid={ isCorrect ? correctTestId : `wrong-answer-${index}` }
          className="alternative-button"
          onClick={ this.alternativeClick }
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
    const {
      props: { questions },
      createAlternativesButtons,
      mockAlternatives,
      stopCountdown,
      addBorderOnClick,
      disableAlternativeButtons } = this;
    const validQuestions = questions.length > 0;

    return (
      <div>
        <Timer
          stopCountdown={ stopCountdown }
          addBorderOnClick={ addBorderOnClick }
          disableAlternativeButtons={ disableAlternativeButtons }
        />
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

const mapStateToProps = (state) => ({
  timerID: state.timer.timerID,
  seconds: state.timer.seconds,
});

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

export default connect(mapStateToProps, null)(Questions);
