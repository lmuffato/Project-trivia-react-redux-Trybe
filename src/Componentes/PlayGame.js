// Requisito 5 - Requisição da Api das perguntas e renderixação na tela
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestTrivia } from '../Api';
import Timer from './Timer';
import './playGame.css';

class PlayGame extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: '',
      loading: true,
      answer: '',
      greenClass: 'gray',
      redClass: 'gray',
      clikedClor: 'gray',
      greenPink: 'gray',
      index: 0,
    };

    this.fetchApiTrivia = this.fetchApiTrivia.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
    this.nameTheClassBtnAnswer = this.nameTheClassBtnAnswer.bind(this);
    this.colorSelectAnswer = this.colorSelectAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    // this.fetchFilterQuestion = this.fetchFilterQuestion.bind(this);
    this.calcScore = this.calcScore.bind(this);
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

  // Requisito 9 - Faz a pontuação dinâmica por dificuldade e salva no localStorage
  calcScore() {
    const { questions, index } = this.state;
    const { timeGotten } = this.props;
    const hard = 3;
    const basePoint = 10;
    const localRanking = JSON.parse(localStorage.getItem('state'));
    const { player: { score } } = localRanking;
    if (questions[index].difficulty === 'hard') {
      localRanking.player.score = score + basePoint + (timeGotten * hard);
      localStorage.setItem('state', JSON.stringify(localRanking));
    }
    if (questions[index].difficulty === 'medium') {
      localRanking.player.score = score + basePoint + (timeGotten * 2);
      localStorage.setItem('state', JSON.stringify(localRanking));
    }
    if (questions[index].difficulty === 'easy') {
      localRanking.player.score = score + basePoint + (timeGotten * 1);
      localStorage.setItem('state', JSON.stringify(localRanking));
    }
  }

  // Requisito 10 - Renderiza uma pergunta por vez
  nextQuestion() {
    const { questions, index } = this.state;
    this.setState((prevState) => ({
      index: (prevState.index + 1) % questions.length,
      answer: '',
      greenClass: 'gray',
      redClass: 'gray',
      clikedClor: 'gray',
      greenPink: 'gray',
    }));
    console.log(questions[index].category);
  }

  colorSelectAnswer(e) {
    const FIVE_SECONDS = 5000;
    this.setState({
      clikedClor: 'pink',
      greenPink: 'pink',
      answer: e.target.innerText,
    });
    setTimeout(() => {
      this.setState({
        greenPink: 'green',
        clikedClor: 'red',
        redClass: 'red',
        greenClass: 'green',
      });
    }, FIVE_SECONDS);

    this.calcScore();
  }

  // changeTheColorClass(question) {
  //   const { clikedClor, answer } = this.state;
  //   if (clikedClor === 'pink') {
  //     setTimeout(() => {
  //       if (answer === question) {
  //         this.setState({
  //           clikedClor: 'green',
  //         });
  //       }
  //     }, 5000);
  //   }
  // }

  // renderAnswers(correct, incorrect) {
  //   return [...correct, ...incorrect];
  // }

  renderQuestions() {
    const { questions, greenClass, redClass, index,
      clikedClor, answer, greenPink } = this.state;
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
              onClick={ (e) => this.colorSelectAnswer(e) }
              className={ answer === question.correct_answer ? greenPink : greenClass }
            >
              {question.correct_answer}
            </button>
            {question.incorrect_answers.map((incorrect, indexKey) => (
              <button
                data-testid={ `wrong-answer-${indexKey}` }
                type="button"
                key={ indexKey }
                onClick={ (e) => this.colorSelectAnswer(e) }
                className={ answer === incorrect ? clikedClor : redClass }
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

const mapStateToProps = (state) => ({
  timeGotten: state.triviaReducer.seconds,
});

PlayGame.propTypes = {
  timeGotten: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(PlayGame);
