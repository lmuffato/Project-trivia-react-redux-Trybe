import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setQuestions as setQuestionsAction } from '../actions';

import Timer from './Timer';

class Trivia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trivia: [],
      // correctAnswerQuantity: 0,
      positionQuestion: 0,
      // isAnswerCorrect: false,
      // timerOutLocal: false,
    };
    this.fetchTrivia = this.fetchTrivia.bind(this);
    this.handleColors = this.handleColors.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
    this.renderBtn = this.renderBtn.bind(this);
    this.blockButtons = this.blockButtons.bind(this);
  }

  componentDidMount() {
    // const { getTrivia } = this.props;
    this.fetchTrivia();
  }

  handleColors() {
    const buttons = document.querySelectorAll('button');
    for (let index = 0; index < buttons.length; index += 1) {
      if (buttons[index].className === 'correct-answer') {
        buttons[index].style.border = '3px solid rgb(6, 240, 15)';
      } else {
        buttons[index].style.border = '3px solid rgb(255, 0, 0)';
      }
    }
    // const { checkAnswer } = this.state;
    // console.log(target.className);
    // if (target.className === 'correct-answer') {

    //   target.style.borderColor = 'green';
    // } else {
    //   target.style.borderColor = 'red';
    // }
    // target.id === 'correct-answer' ? target.style.borderColor = 'green' : target.style.borderColor = 'red';
    // this.setState({ checkAnswer: true });
  }

  async fetchTrivia() {
    const { token } = this.props;
    const questionsAmount = 5;
    const endpoint = `https://opentdb.com/api.php?amount=${questionsAmount}&token=${token}`;
    try {
      const fetchQuestions = await fetch(endpoint);
      const responseTrivia = await fetchQuestions.json();
      // console.log(responseTrivia);
      this.setState({
        trivia: responseTrivia.results,
      });
      // console.log(responseTrivia);
      const { setQuestions } = this.props;
      setQuestions(responseTrivia.results); // disparando action q seta perguntas no estado global.
      return responseTrivia;
    } catch (error) { console.log(error); }
  }

  blockButtons() {
    const btns = document.querySelectorAll('button');
    console.log(btns);
  }

  renderQuestion(question, { timeOut }) {
    // esta função renderiza apenas 1 questão, fiz ela p/ utilizar num switch na render do componente.
    // ela é uma cópia da 'renderQuestionS()'.
    // console.log(question);
    const { positionQuestion } = this.state;
    return (
      <div>
        <h1>{`Question ${positionQuestion + 1}`}</h1>
        <h1 data-testid="question-category">{`Category: ${question.category}`}</h1>
        <h2 data-testid="question-text">{`Question : ${question.question}`}</h2>
        <button
          type="button"
          data-testid="correct-answer"
          className="correct-answer"
          onClick={ (e) => this.handleColors(e) }
          disabled={ timeOut }
        >
          {`${question.correct_answer}`}
        </button>
        { question.incorrect_answers.map((incorrectAnswer, key) => (
          <button
            type="button"
            data-testid={ `wrong-answer-${key}` }
            className="wrong-answer"
            onClick={ (e) => this.handleColors(e) }
            disabled={ timeOut }
            key={ key }
          >
            {`${incorrectAnswer}`}
            {console.log(incorrectAnswer)}
          </button>
        ))}
        <Timer />
        { this.renderBtn() }
      </div>
    );
  }

  renderBtn() { // renderiza botão next
    const { positionQuestion } = this.state;
    return (
      <button
        type="button"
        onClick={ () => this.setState({ positionQuestion: positionQuestion + 1 }) }
        data-testid="btn-next"
      >
        Próximo
      </button>
    );
  }

  render() {
    const { trivia } = this.state;
    // const { trivia } = this.props;
    // console.log(trivia[0]);
    // return trivia.length === 0 ? <h1>Loading...</h1>
    //   : this.handleSwitch();

    if (trivia.length === 0) {
      return <h1>Loading...</h1>;
    }
    const { positionQuestion } = this.state;
    const THREE = 3;
    const { timeOut } = this.props;
    // console.log(timeOut);
    if (timeOut) {
      this.blockButtons();
      // mostra respostas???
      // só aqui o botao de next é habilitado???
    }
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
  token: state.token.token,
  trivia: state.trivia.trivia,
  timeOut: state.trivia.timeOut,
});

const mapDispatchToProps = (dispatch) => ({
  // getTrivia: (trivia) => dispatch(getTriviaThunk(trivia)),
  setQuestions: (trivia) => dispatch(setQuestionsAction(trivia)),
});

Trivia.propTypes = {
  token: PropTypes.string.isRequired,
  setQuestions: PropTypes.func.isRequired,
  timeOut: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
