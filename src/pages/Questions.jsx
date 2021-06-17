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
    };

    this.loadQuestions = this.loadQuestions.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    this.loadQuestions();
  }

  nextQuestion() {
    this.setState(({ questionIndex }) => ({
      questionIndex: questionIndex + 1,
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

  render() {
    const { questions, questionIndex } = this.state;

    return (
      <>
        <Header />
        { questions && <Question questionData={ questions[questionIndex] } /> }
        <button type="button" data-testid="btn-next" onClick={ this.nextQuestion }>
          Next
        </button>
      </>
    );
  }
}

export default Questions;
