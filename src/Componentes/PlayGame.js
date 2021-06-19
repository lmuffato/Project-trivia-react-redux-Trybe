// Requisito 5 - Requisição da Api das perguntas e renderixação na tela
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import { requestTrivia } from '../Api';
import Timer from './Timer';
import './playGame.css';
import { timerThunk, nextTimer } from '../actions';
import { getCorrectAnswerStore, calcScore } from './GameMethodsStorage';

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
    this.colorSelectCorrectAnswer = this.colorSelectCorrectAnswer.bind(this);
    this.colorSelectIncorrectAnswer = this.colorSelectIncorrectAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.changeStateDisabeld = this.changeStateDisabeld.bind(this);
    this.getAssertions = this.getAssertions.bind(this);
    this.changeBttNext = this.changeBttNext.bind(this);
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

  getAssertions() {
    const { validAcertion } = this.state;
    if (validAcertion === true) {
      getCorrectAnswerStore();
      this.setState({
        validAcertion: false,
      });
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

  // Requisito 8 - Atualiza a forma que os botões de resposta são renderizados
  changeStateDisabeld() {
    const { secondsTimer } = this.props;
    if (secondsTimer === 0) {
      this.setState({
        isDisabled: true,
      });
    }
  }

  // Requisito 10 - Renderiza uma pergunta por vez
  changeBttNext() {
    return (
      <button
        data-testid="btn-next"
        type="button"
        onClick={ () => this.nextQuestion() }
      >
        Próxima
      </button>);
  }

  // Requisito 10 - Renderiza uma pergunta por vez
  changeBttNext() {
    return (
      <button
        data-testid="btn-next"
        type="button"
        onClick={ () => this.nextQuestion() }
      >
        Próxima
      </button>);
  }

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
    const { handleTimer, timeGotten } = this.props;
    const { questions, index } = this.state;
    this.setState({
      answer: e.target.innerText,
      isDisabled: true,
      greenAnswer: 'green',
      greenClass: 'green',
      redClass: 'red',
      validAcertion: true,
    }, () => this.getAssertions());
    handleTimer(false);
    calcScore(questions, index, timeGotten);
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
          {isDisabled && this.changeBttNext()}
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
