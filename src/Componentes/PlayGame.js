// Requisito 5 - Requisição da Api das perguntas e renderixação na tela
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import { requestTrivia } from '../Api';
import Timer from './Timer';
import './playGame.css';
import { timerThunk, nextTimer } from '../actions';

const history = createBrowserHistory();
class PlayGame extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: '',
      loading: true,
      answer: '',
      greenClass: 'gray',
      redClass: 'gray',
      redAnswer: 'gray',
      greenAnswer: 'gray',
      index: 0,
      isDisabled: false,
      validAcertion: false,
    };

    this.fetchApiTrivia = this.fetchApiTrivia.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
    this.nameTheClassBtnAnswer = this.nameTheClassBtnAnswer.bind(this);
    this.colorSelectCorrectAnswer = this.colorSelectCorrectAnswer.bind(this);
    this.colorSelectIncorrectAnswer = this.colorSelectIncorrectAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.calcScore = this.calcScore.bind(this);
    this.changeStateDisabeld = this.changeStateDisabeld.bind(this);
    this.getCorrectAnswerStore = this.getCorrectAnswerStore.bind(this);
  }

  componentDidMount() {
    this.fetchApiTrivia();
  }

  componentDidUpdate(_, prevState) {
    const { isDisabled } = this.state;
    if (prevState.isDisabled === isDisabled) {
      this.changeStateDisabeld();
    }
  }

  // Requisito 13 - passando a soma dos acertions para o local storage
  getCorrectAnswerStore() {
    const localRanking = JSON.parse(localStorage.getItem('state'));
    // const { player: { assertions } } = localRanking;
    const { validAcertion } = this.state;
    const assertion = 0;
    if (validAcertion === true) {
      const sumAcertions = assertion + 1;
      localRanking.player.assertions = sumAcertions;
      localStorage.setItem('state', JSON.stringify(localRanking));
    }
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

  // Requisito 8 - Atualiza a forma que os botões de resposta são renderizados
  changeStateDisabeld() {
    const { secondsTimer } = this.props;
    if (secondsTimer === 0) {
      this.setState({
        isDisabled: true,
      });
    }
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
    const { handleTimer, getStateTimer } = this.props;
    const btnClickedFourTimes = 4;
    if (index === btnClickedFourTimes) {
      history.push('/feedback');
      return window.location.reload(true);
    }
    this.setState((prevState) => ({
      index: (prevState.index + 1) % questions.length,
      answer: '',
      greenClass: 'gray',
      redClass: 'gray',
      redAnswer: 'gray',
      greenAnswer: 'gray',
      isDisabled: false,
      validAcertion: false,
    }));
    handleTimer(true);
    getStateTimer(false);
  }

  colorSelectCorrectAnswer(e) {
    const { handleTimer } = this.props;
    this.setState({
      answer: e.target.innerText,
      isDisabled: true,
      greenAnswer: 'green',
      greenClass: 'green',
      redClass: 'red',
      validAcertion: true,
    });
    handleTimer(false);
    this.calcScore();
    this.getCorrectAnswerStore();
  }

  colorSelectIncorrectAnswer(e) {
    const { handleTimer } = this.props;
    this.setState({
      answer: e.target.innerText,
      isDisabled: true,
      redAnswer: 'red',
      redClass: 'red',
      greenClass: 'green',
    });
    handleTimer(false);
  }

  renderQuestions() {
    const { questions, greenClass, redClass, index,
      redAnswer, answer, greenAnswer, isDisabled } = this.state;
    const question = questions[index];
    return (
      <>
        <div>
          <Timer />
        </div>
        <div>
          <div key={ index }>
            <p data-testid="question-category">{question.category}</p>
            <h4 data-testid="question-text">{question.question}</h4>
            <button
              data-testid="correct-answer"
              type="button"
              onClick={ (e) => this.colorSelectCorrectAnswer(e) }
              className={ answer === question.correct_answer ? greenAnswer : greenClass }
              disabled={ isDisabled }
            >
              {question.correct_answer}
            </button>
            {question.incorrect_answers.map((incorrect, indexKey) => (
              <button
                data-testid={ `wrong-answer-${indexKey}` }
                type="button"
                key={ indexKey }
                onClick={ (e) => this.colorSelectIncorrectAnswer(e) }
                className={ answer === incorrect ? redAnswer : redClass }
                disabled={ isDisabled }
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
        { loading ? this.renderLoading() : this.renderQuestions()}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  timeGotten: state.triviaReducer.seconds,
  secondsTimer: state.triviaReducer.secondsTimer,
});
const mapDispatchToProps = (dispatch) => ({
  handleTimer: (bool) => dispatch(timerThunk(bool)),
  getStateTimer: (bool) => dispatch(nextTimer(bool)),
});
PlayGame.propTypes = {
  timeGotten: PropTypes.number,
  handleTimer: PropTypes.func,
}.isRequired;
export default connect(mapStateToProps, mapDispatchToProps)(PlayGame);
