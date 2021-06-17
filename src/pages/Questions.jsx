import React, { Component } from 'react';
import Header from '../components/Header';
import Question from '../components/Question';
import { getQuestions } from '../services/api';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: undefined,
      questionIndex: 0,
      selected: undefined,
    };

    this.loadQuestions = this.loadQuestions.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.selectedAnswer = this.selectedAnswer.bind(this);
  }

  componentDidMount() {
    this.loadQuestions();
  }

  getNextButton() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ this.nextQuestion }
      >
        Next
      </button>
    );
  }

  nextQuestion() {
    this.setState(({ questionIndex }) => ({
      questionIndex: questionIndex + 1,
      selected: undefined,
    }));
  }

  loadToken() {
    return localStorage.getItem('token');
  }

  async loadQuestions() {
    const questionsResponse = await getQuestions(this.loadToken());
    this.setState({
      questions: questionsResponse.results,
    });
  }

  selectedAnswer() {
    this.setState({ selected: true });
  }

  render() {
    const { questions, questionIndex, selected } = this.state;

    return (
      <>
        <Header />
        { questions
        && <Question
          nextQuestion={ this.nextQuestion }
          questionData={ questions[questionIndex] }
          selected={ selected }
          selectedAnswer={ this.selectedAnswer }
        /> }
        { selected && this.getNextButton() }
      </>
    );
  }
}

export default Questions;
