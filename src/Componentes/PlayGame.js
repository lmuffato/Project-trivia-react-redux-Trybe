// Requisito 5 - Requisição da Api das perguntas e renderixação na tela
import React from 'react';
// import Timer from '../Componentes/Timer';
import { requestTrivia } from '../Api';
import Timer from './Timer';
import './playGame.css';

class PlayGame extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: '',
      loading: true,
      greenBtn: '',
      redBtn: '',
      greenClass: 'gray',
      redClass: 'gray',
    };

    this.fetchApiTrivia = this.fetchApiTrivia.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
    this.nameTheClassBtnAnswer = this.nameTheClassBtnAnswer.bind(this);
    this.colorTheButtons = this.colorTheButtons.bind(this);
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

  // Req 7: Valida se o valor do state é igual ao valor do botão e define o nome da class
  nameTheClassBtnAnswer(answer) {
    let nameTheClass = 'gray';
    const { greenBtn, redBtn } = this.state;
    if (greenBtn === answer) nameTheClass = 'green';
    if (redBtn === answer) nameTheClass = 'red';
    return nameTheClass;
  }

  colorTheButtons(e) {
    // e.prentDefault();
    console.log(e);
  }

  // renderAnswers(correct, incorrect) {
  //   return [...correct, ...incorrect];
  // }

  renderQuestions() {
    const { questions, greenClass, redClass } = this.state;
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
                  name={ question.correct_answer }
                  // Req 7: Evento de clique que atualiza o state com o valor da resposta
                  onClick={ (e) => this.colorTheButtons(e) }
                  // this.setState({ greenBtn: e.target.value, greenClass: 'green' });
                  className={ greenClass }
                >
                  {question.correct_answer}
                </button>
                {question.incorrect_answers.map((incorrect, index) => (
                  <button
                    data-testid={ `wrong-answer-${index}` }
                    type="button"
                    key={ index }
                    // Req 7: Evento de clique que atualiza o state com o valor da resposta
                    onClick={ () => this.setState({
                      redBtn: incorrect, greenClass: 'green', redClass: 'red' }) }
                    className={ redClass }
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
