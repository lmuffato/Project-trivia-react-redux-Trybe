import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      isButtonDisabled: false,
    };
    this.handleStyle = this.handleStyle.bind(this);
  }

  componentWillUnmount() {
    const { resetTimer } = this.props;
    resetTimer();
  }

  handleStyle() {
    const btnAnswers = document.getElementsByTagName('button');
    [...btnAnswers].map((btn) => {
      if (btn.getAttribute('data-testid') === 'correct-answer') {
        btn.classList.add('green');
      }
      if (btn.getAttribute('data-testid').includes('wrong-answer')) {
        btn.classList.add('red');
      }
      const element = document.querySelector('.hide-button');
      if (element) {
        return element.setAttribute('class', 'flex');
      }
      return '';
    });
  }

  render() {
    const { quiz, isButtonDisabled } = this.props;
    const { correct_answer: correctAnswer } = quiz;
    const { incorrect_answers: incorrectAnswers } = quiz;
    const answers = [correctAnswer].concat(incorrectAnswers).sort();

    return (
      <div>
        <div>
          <h4 data-testid="question-category">
            { quiz.category }
          </h4>
          <h5>{ quiz.difficulty }</h5>
          <p data-testid="question-text">{ quiz.question }</p>
          { answers.map((answer, index) => (answer === correctAnswer ? (
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

// Ref: embaralhar respostas https://github.com/tspeed90/quiz-game/blob/master/src/components/card.js
