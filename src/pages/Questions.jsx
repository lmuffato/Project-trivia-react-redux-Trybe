import React, { Component } from 'react';
import Header from '../components/Header';
import Question from '../components/Question';
import { getQuestions } from '../services/api';
import Timer from '../components/Timer';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: undefined,
      questionIndex: 0,
      selected: undefined,
      seconds: 30,
    };

    this.loadQuestions = this.loadQuestions.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.selectedAnswer = this.selectedAnswer.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
    this.time = this.time.bind(this);
  }

  componentDidMount() {
    this.loadQuestions();
  }

  getNextButton() {
    const { questionIndex, questions } = this.state;
    if (questionIndex >= questions.length - 1) {
      return (
        <form action="/feedback">
          <button
            type="submit"
            data-testid="btn-next"
          >
            Finish
          </button>
        </form>
      );
    }
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
      seconds: 30,
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

  updateTimer(seconds) {
    this.setState({ seconds });
    if (seconds === 0) {
      this.setState({ selected: true });
    }
  }

  time() {
    const { seconds, selected } = this.state;
    return (<Timer
      seconds={ seconds }
      selected={ selected }
      updateTimer={ this.updateTimer }
    />);
  }

  render() {
    const { questions, questionIndex, selected } = this.state;

    return (
      <>
        <Header />
        <div className="container">
          { questions
          && <Question
            nextQuestion={ this.nextQuestion }
            questionData={ questions[questionIndex] }
            selected={ selected }
            selectedAnswer={ this.selectedAnswer }
          /> }
          { this.time() }
          { selected && this.getNextButton() }
        </div>
      </>
    );
  }
}

export default Questions;