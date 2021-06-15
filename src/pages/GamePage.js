// tela perguntas em si
// utiliza header component

// Requisição API

import React from 'react';
import Header from '../components/Header';

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      correctAnswer: '',
      incorrectAnswers: [],
      question: '',
    };

    this.fetchApi = this.fetchApi.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
  }

  async fetchApi() {
    const token = localStorage.getItem('token');
    const endpoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const request = await fetch(endpoint);
    const data = await request.json();
    const trivia = data.results[0];
    console.log(data);
    // this.setState({
    //   category: trivia.category,
    //   correctAnswer: trivia.correctAnswer,
    //   incorrectAnswers: trivia.incorrectAnswers,
    //   question: trivia.question,
    // });
  }

  render() {
    const { category, correctAnswer, incorrectAnswers, question } = this.state;
    return (
      <div>
        <Header />
        <h4 data-testid="question-category">
          { category }
        </h4>
        <p data-testid="question-text">
          { question }
        </p>
        <button
          type="button"
          data-testid="correct-answer"
        >
          { correctAnswer }
        </button>
        { incorrectAnswers.map((incorrect, index) => (
          <button
            type="button"
            key={ incorrect }
            data-testid={ `wrong-answer-${index}` }
          >
            {incorrect}
          </button>
        ))}
      </div>
    );
  }
}

export default GamePage;
