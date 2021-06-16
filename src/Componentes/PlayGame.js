// Requisito 5 - Requisição da Api das perguntas e renderixação na tela
import React from 'react';
// import Timer from '../Componentes/Timer';
import { requestTrivia } from '../Api';
import Timer from './Timer';

class PlayGame extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: '',
      loading: true,
      colorBtn: '',
    };

    this.fetchApiTrivia = this.fetchApiTrivia.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
    // this.getButtonClicked = this.getButtonClicked.bind(this);
  }

  componentDidMount() {
    this.fetchApiTrivia();
  }

  // getButtonClicked(answer) {
  //   this.setState({
  //     colorButton: answer,
  //   });
  // }

  // getButtonClicked(e) {
  //   const { name, value } = e.target;
  //   this.setState({
  //     [name]: value,
  //   });
  // }

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

  // renderAnswers(correct, incorrect) {
  //   return [...correct, ...incorrect];
  // }

  renderQuestions() {
    const { questions, colorBtn } = this.state;
    return (
      <>
        <div>
          {/* Exibe o timer criado para p requisito 8 */}
          <Timer />
        </div>
        <div>
          {
            questions.map((question, indexKey) => (
              <div key={ indexKey }>
                <p data-testid="question-category">{question.category}</p>
                <h3 data-testid="question-text">{question.question}</h3>
                <button
                  data-testid="correct-answer"
                  type="button"
                  // Req 7: Evento de clique que atualiza o state com o valor da resposta
                  onClick={ () => this.setState({ colorBtn: question.correct_answer }) }
                  // Req 7: Valida se o valor do state é igual ao valor do botão e define o nome da class
                  className={ colorBtn === question.correct_answer ? 'green' : 'red' }
                >
                  {question.correct_answer}
                </button>
                {question.incorrect_answers.map((incorrect, index) => (
                  <button
                    data-testid={ `wrong-answer-${index}` }
                    type="button"
                    key={ index }
                    // Req 7: Evento de clique que atualiza o state com o valor da resposta
                    onClick={ () => this.setState({ colorBtn: incorrect }) }
                    // Req 7: Valida se o valor do state é igual ao valor do botão e define o nome da class
                    className={ colorBtn === incorrect ? 'green' : 'red' }
                  >
                    {incorrect}
                  </button>
                ))}
              </div>
            ))
          }
        </div>
      </>
    );
  }

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
