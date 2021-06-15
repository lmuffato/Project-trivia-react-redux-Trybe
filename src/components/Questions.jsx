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
    console.log(questions);
    return (
      // <div />
      <div>
        {questions.map((question, index) => (
          <div key={ index }>
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
            >
              {question.correct_answer}
            </button>
            {question.incorrect_answers.map((incorrect, idx) => (
              <button
                key={ idx }
                type="button"
                data-testid={ `wrong-answer-${index}` }
              >
                {incorrect}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  }
}