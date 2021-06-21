import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Question from '../components/Question';
import { getQuestions } from '../services/api';
import Timer from '../components/timer/Timer';
import { setScore } from '../actions';
import Button from '../components/button/Button';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: undefined,
      questionIndex: 0,
      selected: undefined,
      seconds: 30,
      redirectToFeedback: false,
    };

    this.score = 0;
    this.assertions = 0;
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
        <Button
          text="Finalizar"
          type="button"
          dataTestId="btn-next"
          handleClick={ () => this.setState({ redirectToFeedback: true }) }
          classList="button-primary"
          key="Finalizar"
        />
      );
    }
    return (
      <Button
        text="Proximo"
        type="button"
        dataTestId="btn-next"
        handleClick={ this.nextQuestion }
        classList="button-primary"
        key="Proximo"
      />
    );
  }

  getScoreDifficulty(difficulty) {
    const easy = 1;
    const medium = 2;
    const hard = 3;

    switch (difficulty.toLowerCase()) {
    case 'easy':
      return easy;
    case 'medium':
      return medium;
    case 'hard':
      return hard;
    default:
      return easy;
    }
  }

  calculateScore(event) {
    const { seconds, questions, questionIndex } = this.state;
    const { id } = event.target;
    const { difficulty } = questions[questionIndex];
    const defaultScore = 10;

    if (id === 'correct-answer') {
      const scoreDifficulty = this.getScoreDifficulty(difficulty);
      this.assertions += 1;
      this.score += defaultScore + (seconds * scoreDifficulty);
    }

    const { toScore } = this.props;
    toScore(this.assertions, this.score);
  }

  nextQuestion() {
    this.setState(({ questionIndex }) => ({
      questionIndex: questionIndex + 1,
      selected: undefined,
      seconds: 30,
    }));
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

  selectedAnswer(event) {
    this.setState({ selected: true });
    this.calculateScore(event);
  }

  async loadQuestions() {
    const { settings } = this.props;
    const { category, quantity, difficulty } = settings;
    const token = this.loadToken();
    const questionsResponse = await getQuestions(token, quantity, category, difficulty);
    this.setState({
      questions: questionsResponse.results,
    });
  }

  loadToken() {
    return localStorage.getItem('token');
  }

  render() {
    const { questions, questionIndex, selected, redirectToFeedback } = this.state;

    if (redirectToFeedback) {
      return <Redirect to="/feedback" />;
    }

    return (
      <>
        <Header />
        <div className="container box-accent">
          { this.time() }
          { questions
          && <Question
            nextQuestion={ this.nextQuestion }
            questionData={ questions[questionIndex] }
            selected={ selected }
            selectedAnswer={ this.selectedAnswer }
          /> }
          { selected && this.getNextButton() }
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  toScore: (assertions, score) => dispatch(setScore(assertions, score)),
});

const mapStateToProps = (state) => ({
  settings: state.settings,
});

Questions.propTypes = {
  toScore: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    category: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    difficulty: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
