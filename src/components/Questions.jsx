import React, { Component } from 'react';
import { connect } from 'react-redux';

const second = 1000;

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      questionNumber: 0,
      displayBtn: false,
      currentTime: 5,
      disableButton: false,
    };
    this.setTime = this.setTime.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
    setInterval(() => this.setTime(), second);
  }

  setTime() {
    const { currentTime, disableButton } = this.state;
    if (currentTime >= 1) {
      this.setState({ currentTime: currentTime - 1 });
    } if (currentTime === 0 && disableButton === false) {
      this.setState({ disableButton: true });
      this.handleClick();
    } else {
      return null;
    }
  }

  async getQuestions() {
    const getToken = localStorage.getItem('token');
    const fetchApi = await fetch(`https://opentdb.com/api.php?amount=5&token=${getToken}`);
    const response = await fetchApi.json();
    const questions = await response.results;
    this.setState({ questions });
  }

  handleClick() {
    const green = '3px solid rgb(6, 240, 15)';
    const red = '3px solid rgb(255, 0, 0)';
    const right = document.getElementById('correct-answer');
    right.style.border = green;
    const wrong = document.getElementsByClassName('wrong-answer');
    const array = Array.prototype.slice.call(wrong);
    array.map((button) => {
      button.style.border = red;
      return button.style.border;
    });
    this.setState({ displayBtn: true });
  }

  nextButton() {
    const { displayBtn } = this.state;
    if (displayBtn) {
      return (
        <button
          type="button"
          data-testid="btn-next"
          id="btn-next"
          onClick={ () => this.handleNext() }
        >
          Próxima
        </button>
      );
    }
    return <div />;
  }

  handleNext() {
    const { questionNumber } = this.state;
    this.setState({
      questionNumber: questionNumber + 1,
      currentTime: 5,
    });
  }

  render() {
    const { questions, questionNumber, currentTime, disableButton } = this.state;
    const question = questions[questionNumber];
    return !question ? (
      <p>Loading!</p>
    ) : (
      <div>
        <div>
          { currentTime }
        </div>
        <div>
          <h4
            data-testid="question-category"
          >
            {question.category}
          </h4>
          <p
            data-testid="question-text"
          >
            {question.question}
          </p>
          <button
            type="button"
            data-testid="correct-answer"
            disabled={ disableButton }
            id="correct-answer"
            onClick={ () => this.handleClick() }
          >
            {question.correct_answer}
          </button>
          {question.incorrect_answers.map((incorrect, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${index}` }
              disabled={ disableButton }
              className="wrong-answer"
              onClick={ () => this.handleClick() }
            >
              {incorrect}
            </button>
          ))}
          {this.nextButton()}
        </div>
      </div>
    );
  }
}

export default connect(null, null)(Questions);
