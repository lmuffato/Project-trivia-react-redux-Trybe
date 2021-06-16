// Requisito 5 - Requisição da Api das perguntas e renderixação na tela
import React from 'react';
import { requestTrivia } from '../Api';

class PlayGame extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: '',
      loading: true,
    };

    this.fetchApiTrivia = this.fetchApiTrivia.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
  }

  componentDidMount() {
    this.fetchApiTrivia();
  }

  async fetchApiTrivia() {
    const token = localStorage.getItem('token');
    const tokenStorage = JSON.parse(token);
    const numberQuestions = 5;
    if (tokenStorage !== null) {
      const dataTrivia = await requestTrivia(numberQuestions, tokenStorage);
      this.setState({
        questions: dataTrivia.results,
        loading: false,
      });
    }
  }

  renderAnswers(correct, incorrect) {
    return [...correct, ...incorrect];
  }

  renderQuestions() {
    const { questions } = this.state;
    return questions.map((question, indexKey) => (
      <div key={ indexKey }>
        <p data-testid="question-category">{question.category}</p>
        <h3 data-testid="question-text">{question.question}</h3>
        <button
          data-testid="correct-answer"
          type="button"
        >
          {question.correct_answer}
        </button>
        {question.incorrect_answers.map((incorrect, index) => (
          <button
            data-testid={ `wrong-answer-${index}` }
            type="button"
            key={ index }
          >
            {incorrect}
          </button>
        ))}
      </div>
    ));
  }

  // category: "Entertainment: Music"
  // correct_answer: "Syd Barrett"
  // difficulty: "medium"
  // incorrect_answers: Array(3)
  // 0: "John Lennon"
  // 1: "David Gilmour"
  // 2: "Floyd"
  // length: 3
  // __proto__: Array(0)
  // question: "Who is the Pink Floyd song &quot;Shine On You Crazy Diamond&quot; written about?"
  // type: "multiple"

  renderLoading() {
    return <h3>Loading...</h3>;
  }

  render() {
    const { loading, questions } = this.state;
    console.log(questions);
    return (
      <div>
        Game
        { loading ? this.renderLoading() : this.renderQuestions() }
      </div>
    );
  }
}

export default PlayGame;
