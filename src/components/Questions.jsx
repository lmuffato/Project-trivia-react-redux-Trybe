import React, { Component } from 'react';

export default class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const getToken = localStorage.getItem('token');
    const fetchApi = await fetch(`https://opentdb.com/api.php?amount=5&token=${getToken}`);
    const response = await fetchApi.json();
    const questions = await response.results;
    this.setState({ questions });
  }

  render() {
    const { questions } = this.state;
    const question = questions[0];
    console.log(questions);
    
    return !question ? (
      <p>Loading!</p>
    ) : (
      <div>
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
            onClick={ (e) => {
              const green = '3px solid rgb(6, 240, 15)';
              e.target.style.border = green;
            } }
          >
            {question.correct_answer}
          </button>
          {question.incorrect_answers.map((incorrect, index) => (
            <button
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${index}` }
              onClick={ (e) => {
                const red = '3px solid rgb(255, 0, 0)';
                e.target.style.border = red;
              } }
            >
              {incorrect}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
