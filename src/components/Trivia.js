import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setQuestions as setQuestionsAction,
  timerOut as timerOutAction } from '../actions';
import suffleArray from '../services/suffleArray';
import fetchTrivia from '../services/fetchTrivia';
import Timer from './Timer';
import handleColors from '../services/handlers';

const TEN = 10; const
  THREE = 3;

const correct = 'correct-answer';

class Trivia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trivia: [],
      positionQuestion: 0,
    };
    this.handleCickInAnswer = this.handleCickInAnswer.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
    this.renderBtnNext = this.renderBtnNext.bind(this);
    this.setTriviaStateLocalAndGlobal = this.setTriviaStateLocalAndGlobal.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.setLS = this.setLS.bind(this);
  }

  async componentDidMount() {
    const { token } = this.props;
    const trivia = await fetchTrivia(token);
    this.setTriviaStateLocalAndGlobal(trivia);
  }

  setLS(points) {
    // const { points } = this.state;
    const { user } = this.props;
    const objToLS = {
      name: user.name,
      assertions: 0,
      score: points,
    };
    const stateString = localStorage.getItem('state');
    const stateObj = JSON.parse(stateString);
    if (stateString) {
      objToLS.score = stateObj.score + objToLS.score;
    }
    localStorage.setItem('state', JSON.stringify(objToLS));
  }

  setTriviaStateLocalAndGlobal(trivia) { // seta nao somente estado local como tb estado global.
    this.setState({
      trivia,
    });
    const { setQuestions } = this.props;
    setQuestions(trivia); // disparo de action.
  }

  handleCickInAnswer(e) {
    this.clearStyleButtons();
    const { target } = e;
    const { altTimeOut } = this.props;
    if (target.className === correct) {
      const counter = Number(document.querySelector('.counter').innerText);
      let nivel = document.querySelector('h2').id;
      switch (nivel) {
      case 'hard':
        nivel = Number(THREE);
        break;
      case 'medium':
        nivel = 2;
        break;
      case 'easy':
        nivel = 1;
        break;
      default:
        nivel = null;
      }
      const points = TEN + (counter * nivel);
      altTimeOut(points);
      this.setLS(points);
    } else {
      altTimeOut(0);
    }
    handleColors();
  }

  clearStyleButtons() {
    const btns = document.querySelectorAll('button');
    btns.forEach((btn) => {
      if (btn.className !== 'btnNextClass') {
        btn.removeAttribute('style');
      }
    });
  }

  handleNext() {
    const { positionQuestion } = this.state;
    this.setState({ positionQuestion: positionQuestion + 1 });
    const { altTimeOut } = this.props;
    altTimeOut(0);
    this.clearStyleButtons();
  }

  renderQuestion(question, { timeOut }) {
    // esta função renderiza apenas 1 questão, fiz ela p/ utilizar num switch na render do componente.
    // ela é uma cópia da 'renderQuestionS()'.
    const { positionQuestion } = this.state;
    let options = question.incorrect_answers;
    if (!options.includes(question.correct_answer)) {
      options.push(question.correct_answer);
      options = suffleArray(options); // embaralhando array
    }
    return (
      <div>
        <h1>{`Question ${positionQuestion + 1}`}</h1>
        <h1 data-testid="question-category">{`Category: ${question.category}`}</h1>
        <h2
          data-testid="question-text"
          id={ question.difficulty }
        >
          {`Question : ${question.question}`}
        </h2>
        { options.map((answer, key) => (
          <button
            type="button"
            data-testid={ answer === question.correct_answer
              ? correct : `wrong-answer-${key}` }
            className={ answer === question.correct_answer
              ? correct : `wrong-answer-${key}` }
            onClick={ (e) => this.handleCickInAnswer(e) }
            disabled={ timeOut }
            key={ key }
          >
            { answer }
          </button>
        ))}
        { !timeOut ? (<Timer />) : ( // timer só será exibido enquanto tempo ainda nao tiver excedido
          <>
            <h3>Contador</h3>
            <span>0</span>
          </>
        )}
        { this.renderBtnNext() }
      </div>
    );
  }

  renderBtnNext() { // renderiza botão next
    const { timeOut } = this.props;
    return (
      <button
        type="button"
        onClick={ this.handleNext }
        data-testid="btn-next"
        className="btnNextClass"
        hidden={ !timeOut }
      >
        Próximo
      </button>
    );
  }

  render() {
    const { trivia } = this.state;
    const { timeOut } = this.props;
    if (trivia.length === 0) {
      return <h1>Loading...</h1>;
    }
    if (timeOut) handleColors();
    const { positionQuestion } = this.state;
    // const THREE = 3;
    switch (positionQuestion) {
    case 0:
      return this.renderQuestion(trivia[0], this.props);
    case 1:
      return this.renderQuestion(trivia[1], this.props);
    case 2:
      return this.renderQuestion(trivia[2], this.props);
    case THREE:
      return this.renderQuestion(trivia[3], this.props);
    default:
      return (<h1>Loading questions</h1>);
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  token: state.token.token,
  trivia: state.trivia.trivia,
  timeOut: state.trivia.timeOut,
});

const mapDispatchToProps = (dispatch) => ({
  // getTrivia: (trivia) => dispatch(getTriviaThunk(trivia)),
  setQuestions: (trivia) => dispatch(setQuestionsAction(trivia)),
  altTimeOut: (seconds) => dispatch(timerOutAction(seconds)),
});

Trivia.propTypes = {
  token: PropTypes.string,
  setQuestions: PropTypes.func,
  altTimeOut: PropTypes.func,
  timeOut: PropTypes.bool,
  user: PropTypes.object,
}.isRequerid;

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
