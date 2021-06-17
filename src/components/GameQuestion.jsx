import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { permutate } from '../services';

class GameQuestion extends Component {
  constructor() {
    super();
    this.state = {
      permutatedAswers: [],
    };
    this.setPermutatedAnswers = this.setPermutatedAnswers.bind(this);
  }

  componentDidMount() {
    this.setPermutatedAnswers();
  }

  componentDidUpdate() {
    const { timeExpired } = this.props;
    if (timeExpired) {
      this.colorButtonsBorder();
      const btnArr = document.getElementsByClassName('btn');
      [...btnArr].forEach((btn) => { btn.disabled = true; });
    }
    console.log('Hi')
    // this.setPermutatedAnswers();
  }

  setPermutatedAnswers() {
    const { questions, currentQuestionIndex } = this.props;
    const currentQuestion = questions[currentQuestionIndex];
    console.log(currentQuestion);
    const answers = [currentQuestion
      .correct_answer, ...currentQuestion.incorrect_answers];
    this.setState({ permutatedAswers: permutate(...answers) });
  }

  getID(answer) {
    const { questions } = this.props;
    if (answer === questions[0].correct_answer) return 'correct-answer';
    return `wrong-answer-${questions[0].incorrect_answers.indexOf(answer)}`;
  }

  handleClick(difficulty) {
    const { updateScore, showNextButton } = this.props;
    return ({ target }) => {
      this.colorButtonsBorder();
      updateScore(difficulty, target);
      showNextButton();
    };
  }

  colorButtonsBorder() {
    const btnArr = document.getElementsByClassName('btn');
    [...btnArr].forEach((btn) => {
      if (btn.getAttribute('data-testid') === 'correct-answer') {
        btn.classList.add('correct');
      } else {
        btn.classList.add('wrong');
      }
    });
  }

  render() {
    const { questions, currentQuestionIndex } = this.props;
    const { category, question, difficulty } = questions[currentQuestionIndex];
    const { permutatedAswers } = this.state;
    return (
      <div>
        <h3 data-testid="question-category">{category}</h3>
        <h2 data-testid="question-text">{question}</h2>
        {permutatedAswers.map((answer, i) => (
          <button
            type="button"
            className="btn"
            onClick={ this.handleClick(difficulty) }
            data-testid={ this.getID(answer) }
            key={ i }
          >
            {answer}
          </button>
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    questions: state.trivia.questions,
    timeExpired: state.trivia.timeExpired,
  };
}

export default connect(mapStateToProps)(GameQuestion);
