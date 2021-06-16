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
      isButtonDisabled: false, // vamos precisar disso para o req.8
    };

    this.fetchApi = this.fetchApi.bind(this);
    this.handleStyle = this.handleStyle.bind(this);
    this.shuffleArr = this.shuffleArr.bind(this);
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

  handleStyle() {
    const btnAnswers = document.getElementsByTagName('button');
    [...btnAnswers].map((btn) => {
      if (btn.getAttribute('data-testid') === 'correct-answer') {
        return btn.classList.add('green');
      }
      return btn.classList.add('red');
    });
    this.setState({ isButtonDisabled: true })
    const element = document.querySelector('.hide-button');
    return element.setAttribute('class', 'flex');
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

  render() {
    const { category,
      correctAnswer, incorrectAnswers, question, loading, isButtonDisabled } = this.state;
    const answers = [...incorrectAnswers, correctAnswer];
    const shuffledAnswers = this.shuffleArr(answers);

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
          <p data-testid="question-text">{ question }</p>
          { shuffledAnswers.map((answer, index) => (answer === correctAnswer ? (
            <button
              key={ answer }
              type="button"
              data-testid="correct-answer"
              onClick={ this.handleStyle }
              disabled={ isButtonDisabled }
            >
              { answer }
            </button>
          ) : (
            <button
              type="button"
              key={ answer }
              data-testid={ `wrong-answer-${index}` }
              onClick={ this.handleStyle }
              disabled={ isButtonDisabled }
            >
              { answer }
            </button>
          )))}
        </div>
        <button
          type="button"
          data-testid="btn-next"
          className="hide-button"
        >
          Próxima
        </button>
      </>
    );
  }
}

export default GamePage;

// Referências:
// função shuffleArr adaptada de: https://stackoverflow.com/questions/56501078/randomizing-quiz-answers-fetched-from-a-rest-api
// sobre splice: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
