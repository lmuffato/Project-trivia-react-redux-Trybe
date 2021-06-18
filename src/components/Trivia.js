import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTrivia as getTriviaThunk } from '../actions';
import Timer from './Timer';

class Trivia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trivia: [],
      correctAnswers: 0,
      timer: 30,
    };
    this.fetchTrivia = this.fetchTrivia.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.handleColors = this.handleColors.bind(this);
    this.handleAnswers = this.handleAnswers.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetchTrivia();
  }

  handleClick(e) {
    this.handleAnswers(e);
    this.handleColors();
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
  }

  handleAnswers({ target: { className } }) {
    const { correctAnswers } = this.state;
    if (className === 'correct-answer') {
      this.setState({ correctAnswers: correctAnswers + 1 });
    }
  }

  async fetchTrivia() {
    const { token } = this.props;
    const questionsAmount = 5;
    const endpoint = `https://opentdb.com/api.php?amount=${questionsAmount}&token=${token}`;
    try {
      const fetchQuestions = await fetch(endpoint);
      const responseTrivia = await fetchQuestions.json();
      this.setState({
        trivia: responseTrivia.results,
      });
      return responseTrivia;
    } catch (error) { console.log(error); }
  }

  renderQuestions() {
    const { trivia } = this.state;
    return (
      <div>
        <h1>TESTE</h1>
        <h1 data-testid="question-category">{`Categoria: ${trivia[0].category}`}</h1>
        <h2 data-testid="question-text">{`Questão 1: ${trivia[0].question}`}</h2>
        <button
          type="button"
          data-testid="correct-answer"
          className="correct-answer"
          onClick={ (e) => this.handleClick(e) }
        >
          {`${trivia[0].correct_answer}`}
        </button>
        <button
          type="button"
          data-testid="wrong-answer-0"
          className="wrong-answer"
          onClick={ (e) => this.handleClick(e) }
        >
          {`${trivia[0].incorrect_answers[0]}`}
        </button>
        <button
          type="button"
          data-testid="wrong-answer-1"
          className="wrong-answer"
          onClick={ (e) => this.handleClick(e) }
        >
          {`${trivia[0].incorrect_answers[1]}`}
        </button>
        <button
          type="button"
          data-testid="wrong-answer-2"
          className="wrong-answer"
          onClick={ (e) => this.handleClick(e) }
        >
          {`${trivia[0].incorrect_answers[2]}`}
        </button>
      </div>
    );
  }

  render() {
    const { trivia, timer } = this.state;
    return trivia.length === 0 ? <h1>Loading...</h1>
      : (
        <div>
          <Timer timer={ timer } />
          <p>Olá mundo!</p>
          { this.renderQuestions() }
        </div>
      );
  }
}

const mapStateToProps = (state) => ({
  token: state.token.token,
  trivia: state.trivia.trivia,
});

const mapDispatchToProps = (dispatch) => ({
  getTrivia: (trivia) => dispatch(getTriviaThunk(trivia.results)),
});

Trivia.propTypes = {
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
