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
    this.handleClickCorrectAnswer = this.handleClickCorrectAnswer.bind(this);
    this.handleClickIncorrectAnswer = this.handleClickIncorrectAnswer.bind(this);
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

  handleClickCorrectAnswer() {
    console.log('correct answer click');
    const element = document.querySelector('.hide-button');
    return element.setAttribute('class', 'flex');
  }

  handleClickIncorrectAnswer() {
    console.log('incorrect answer click');
    const element = document.querySelector('.hide-button');
    return element.setAttribute('class', 'flex');
  }

  render() {
    const { category, correctAnswer, incorrectAnswers, question, loading } = this.state;
    if (loading) {
      return 'Carregando...'; // solução provisória --> podemos componentizar isto depois
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
            onClick={ this.handleClickCorrectAnswer }
          >
            { correctAnswer }
          </button>
          { incorrectAnswers.map((incorrect, index) => (
            <button
              type="button"
              key={ incorrect }
              data-testid={ `wrong-answer-${index}` }
              onClick={ this.handleClickIncorrectAnswer }
            >
              {incorrect}
            </button>
          ))}
        </div>
        <div>
          <button
            type="button"
            data-testid="btn-next"
            className="hide-button"
          >
            Próxima
          </button>
        </div>
      </>
    );
  }
}

export default GamePage;
