import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from './Button';
import Timer from './Timer';
import { scoreAction } from '../actions';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      isButtonDisabled: false,
      score: 0,
      assertions: 0,
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

  // Tive que alterar aqui, pois estava mudando a cor da borda do botão de próxima pergunta,
  // toda vez que mudava a pergunta do array
  handleStyle() {
    const btnAnswers = document.getElementsByTagName('button');
    [...btnAnswers].map((btn) => {
      if (btn.getAttribute('data-testid') === 'correct-answer') {
        btn.classList.toggle('green');
      }
      if (btn.getAttribute('data-testid').includes('wrong-answer')) {
        btn.classList.toggle('red');
      }
      this.setState({ isButtonDisabled: true });
      const element = document.querySelector('.hide-button');
      if (element) {
        return element.setAttribute('class', 'flex');
      }
      return '';
    });
  }

  handleScore() {
    const scoreStorage = localStorage.getItem('score');
    const { quiz, setScore } = this.props;
    const timer = 2; // provisório, só até termos a lógica do timer concluída
    const ten = 10;
    const three = 3;
    let { score } = this.state;
    if (!scoreStorage) {
      localStorage.setItem('score', score);
    }
    let totalPts = 0;
    switch (quiz.difficulty) {
    case 'hard':
      totalPts = ten + (timer * three);
      this.setState({ score: score += totalPts });
      setScore(score);
      return localStorage.setItem('score', score);
    case 'medium':
      totalPts = ten + (timer * 2);
      this.setState({ score: score += totalPts });
      setScore(score);
      return localStorage.setItem('score', score);
    case 'easy':
      totalPts = ten + (timer * 1);
      this.setState({ score: score += totalPts });
      setScore(score);
      return localStorage.setItem('score', score);
    default:
      return score;
    }
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
          <Timer />
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
  setScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setScore: (score) => dispatch(scoreAction(score)),
});

export default connect(null, mapDispatchToProps)(Question);
