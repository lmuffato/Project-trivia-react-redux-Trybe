// Requisito 5 - Requisição da Api das perguntas e renderixação na tela
import React from 'react';
import { requestTrivia } from '../Api';
import Timer from './Timer';
import './playGames.css';

class PlayGame extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: '',
      loading: true,
      index: 0,
    };

    this.fetchApiTrivia = this.fetchApiTrivia.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    // this.fetchFilterQuestion = this.fetchFilterQuestion.bind(this);
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

  // Requisito 10 - Renderiza uma pergunta por vez
  nextQuestion() {
    const { questions, index } = this.state;
    this.setState((prevState) => ({
      index: (prevState.index + 1) % questions.length,
    }));
    console.log(questions[index].category);
  }

  renderQuestions() {
    const { questions, index } = this.state;
    const question = questions[index];
    return (
      <>
        <div>
          {/* Exibe o timer criado para p requisito 8 */}
          <Timer />
        </div>
        <div>
          <div key={ index }>
            <p data-testid="question-category">{question.category}</p>
            <h4 data-testid="question-text">{question.question}</h4>
            <button
              data-testid="correct-answer"
              type="button"
            >
              {question.correct_answer}
            </button>
            {question.incorrect_answers.map((incorrect, indexKey) => (
              <button
                data-testid={ `wrong-answer-${indexKey}` }
                type="button"
                key={ indexKey }
              >
                {incorrect}
              </button>
            ))}
          </div>
        </div>
        <div>
          <button
            data-testid="btn-next"
            type="button"
            onClick={ () => this.nextQuestion() }
          >
            Próxima
          </button>
        </div>
      </>
    );
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
    const { loading } = this.state;
    return (
      <div>
        { loading ? this.renderLoading() : this.renderQuestions() }
      </div>
    );
  }
}

export default PlayGame;
