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
      correctAnswerQuantity: 0,
      positionQuestion: 0,
      // isAnswerCorrect: false,
    };
    this.fetchTrivia = this.fetchTrivia.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.handleColors = this.handleColors.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
    this.renderBtn = this.renderBtn.bind(this);
  }

  componentDidMount() {
    // const { getTrivia } = this.props;
    this.fetchTrivia();
  }

  // componentDidUpdate() {
  //   const { getTrivia } = this.props;
  //   const { trivia } = this.state;
  //   return trivia.length === 0 ? <span>Loading...</span>
  //     : (getTrivia(trivia));
  // }

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
      console.log(responseTrivia);
      const { setQuestions } = this.props;
      setQuestions(responseTrivia.results); // disparando action q seta perguntas no estado global.
      return responseTrivia;
    } catch (error) { console.log(error); }
  }

  renderQuestions() {
    const { trivia } = this.state;
    return (
      <div>
        <h1>Question</h1>
        <h1 data-testid="question-category">{`Categoria: ${trivia[0].category}`}</h1>
        <h2 data-testid="question-text">{`Questão 1: ${trivia[0].question}`}</h2>
        <button
          type="button"
          data-testid="correct-answer"
          className="correct-answer"
          onClick={ (e) => this.handleColors(e) }
        >
          {`${trivia[0].correct_answer}`}
        </button>
        <button
          type="button"
          data-testid="wrong-answer-0"
          className="wrong-answer"
          onClick={ (e) => this.handleColors(e) }
        >
          {`${trivia[0].incorrect_answers[0]}`}
        </button>
        <button
          type="button"
          data-testid="wrong-answer-1"
          className="wrong-answer"
          onClick={ (e) => this.handleColors(e) }
        >
          {`${trivia[0].incorrect_answers[1]}`}
          {console.log(trivia[0])}
        </button>
        <button
          type="button"
          data-testid="wrong-answer-2"
          className="wrong-answer"
          onClick={ (e) => this.handleColors(e) }
        >
          {`${trivia[0].incorrect_answers[2]}`}
        </button>
        <Timer />
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

  renderQuestion(question) {
    // esta função renderiza apenas 1 questão, fiz ela p/ utilizar num switch na render do componente.
    // ela é uma cópia da 'renderQuestionS()'.
    console.log(question);
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
        >
          {`${question.correct_answer}`}
        </button>
        <button
          type="button"
          data-testid="wrong-answer-0"
          className="wrong-answer"
          onClick={ (e) => this.handleColors(e) }
        >
          {`${question.incorrect_answers[0]}`}
        </button>
        <button
          type="button"
          data-testid="wrong-answer-1"
          className="wrong-answer"
          onClick={ (e) => this.handleColors(e) }
        >
          {`${question.incorrect_answers[1]}`}
          {console.log(question)}
        </button>
        <button
          type="button"
          data-testid="wrong-answer-2"
          className="wrong-answer"
          onClick={ (e) => this.handleColors(e) }
        >
          {`${question.incorrect_answers[2]}`}
        </button>
        <Timer />
        { this.renderBtn() }
      </div>
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
    switch (positionQuestion) {
    case 0:
      return this.renderQuestion(trivia[0]);
    case 1:
      return this.renderQuestion(trivia[1]);
    case 2:
      return this.renderQuestion(trivia[2]);
    case THREE:
      return this.renderQuestion(trivia[3]);
    default:
      return (<h1>Loading questions</h1>);
    }

    /* trivia.length === 0 ? <span>Loading...</span> */
    // : (
    //   <div>
    //     <p>Enxendo a linguiça</p>
    //   </div>
    // );
  }
}

const mapStateToProps = (state) => ({
  token: state.token.token,
  trivia: state.trivia.trivia,
});

const mapDispatchToProps = (dispatch) => ({
  // getTrivia: (trivia) => dispatch(getTriviaThunk(trivia)),
  setQuestions: (trivia) => dispatch(setQuestionsAction(trivia)),
});

Trivia.propTypes = {
  token: PropTypes.string.isRequired,
  setQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
