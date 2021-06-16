import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

const second = 1000;

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      questionNumber: 0,
      displayBtn: false,
      currentTime: 30,
      disableButton: false,
      showAsnwer: false,
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
    this.setState(
      { displayBtn: true,
      showAsnwer:true }
      );
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
  }

  handleNext() {
    const { questionNumber } = this.state;
    const maxQuestion = 4;
    if ( questionNumber <= maxQuestion) {
      this.setState({
        currentTime: 30,
        disableButton:false,
        displayBtn: false,
        showAsnwer: false,
        questionNumber: questionNumber + 1,
      })
    }
  }


  render() {
    const {questions, questionNumber, currentTime, disableButton, showAsnwer } = this.state;
    let question = questions[questionNumber];
    if (questionNumber === 5) return <Redirect to="/feedback"/>
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
            className={ showAsnwer ? "button-green" : "button-uncolor" }
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
              className={ showAsnwer ? "button-red" : "button-uncolor" }
              data-testid={ `wrong-answer-${index}` }
              disabled={ disableButton }
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
