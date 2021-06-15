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
      loading: true,
    };

    this.fetchApi = this.fetchApi.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
  }

  async fetchApi() {
    const getToken = localStorage.getItem('token');
    const endpoint = `https://opentdb.com/api.php?amount=5&token=${getToken}`;
    try {
      const request = await fetch(endpoint);
      const data = await request.json();
      console.log(data);
      const trivia = data.results[0];
      this.setState({
        loading: false,
        category: trivia.category,
        correctAnswer: trivia.correct_answer,
        incorrectAnswers: trivia.incorrect_answers,
        question: trivia.question,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { category, correctAnswer, incorrectAnswers, question, loading } = this.state;
    if (loading) {
      return 'Carregando...'; // solução provisória
    }

    return (
      <>
        <Header />
        <div>
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
      </>
    );
  }
}

export default GamePage;
