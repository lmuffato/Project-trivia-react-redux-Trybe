import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      isButtonDisabled: false,
    };
    this.shuffleArr = this.shuffleArr.bind(this);
    this.handleStyle = this.handleStyle.bind(this);
    // this.handleCorrectAnswer = this.handleCorrectAnswer.bind(this);
  }

  shuffleArr(answersArray) {
    const answers = answersArray;
    const randomizedArray = [];
    while (answers.length > 0) {
      const randomIndex = Math.floor(Math.random() * answers.length);
      randomizedArray.push(answers[randomIndex]);
      answers.splice(randomIndex, 1);
    }
    return randomizedArray;
  }

  handleStyle() {
    const btnAnswers = document.getElementsByTagName('button');
    [...btnAnswers].map((btn) => {
      if (btn.getAttribute('data-testid') === 'correct-answer') {
        btn.setAttribute('class', 'green');
      }
      if (btn.getAttribute('data-testid').includes('wrong-answer')) {
        btn.setAttribute('class', 'red');
      }
      this.setState({ isButtonDisabled: true });
      const element = document.querySelector('.hide-button');
      if (element) {
        return element.setAttribute('class', 'flex');
      }
      return '';
    });
  }

  // handleCorrectAnswer() {
  //   const btnAssertion = document.querySelector('.correct');
  //   const btnError = document.querySelectorAll('.incorrect');
  //   if (btnAssertion.getAttribute('class') === 'correct') {
  //     console.log('Você acertou!!');
  //     btnAssertion.classList.add('green');
  //     return btnError.map((btn) => btn.classList.add('red'));
  //   }
  // }

  render() {
    const { quiz } = this.props;
    const { correct_answer: correctAnswer } = quiz;
    const { incorrect_answers: incorrectAnswers } = quiz;
    const { isButtonDisabled } = this.state;
    const answers = [...incorrectAnswers, correctAnswer];
    const shuffledAnswers = this.shuffleArr(answers);

    return (
      <div>
        <div>
          <h4 data-testid="question-category">
            { quiz.category }
          </h4>
          <h5>{ quiz.difficulty }</h5>
          <p data-testid="question-text">{ quiz.question }</p>
          { shuffledAnswers.map((answer, index) => (answer === correctAnswer ? (
            <Button
              key={ answer }
              className="correct"
              dataTestid="correct-answer"
              onClick={ this.handleStyle }
              disabled={ isButtonDisabled }
            >
              { answer }
            </Button>
          ) : (
            <Button
              key={ answer }
              className="incorrect"
              dataTestid={ `wrong-answer-${index}` }
              onClick={ this.handleStyle }
              disabled={ isButtonDisabled }
            >
              { answer }
            </Button>
          )))}
        </div>
      </div>
    );
  }
}

Question.defaultProps = {
  quiz: {},
};

Question.propTypes = {
  quiz: PropTypes.shape(),
};

export default Question;
