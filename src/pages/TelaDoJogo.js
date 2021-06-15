import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuestions } from '../services/api';
import { setQuestions } from '../actions';
import Header from '../components/Header';
import Question from '../components/Question';

class TelaDojogo extends React.Component {
  constructor() {
    super();
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.createQuestion = this.createQuestion.bind(this);
    this.randomOptions = this.randomOptions.bind(this);
    this.state = { index: 0 };
  }

  componentDidMount() {
    const { category, difficulty, type } = this.props;
    this.fetchQuestions(category, difficulty, type);
  }

  async fetchQuestions(category, difficulty, type) {
    const { updateQuestions } = this.props;
    const data = await getQuestions(category, difficulty, type);
    updateQuestions(data);
  }

  createQuestion() {
    const { questions } = this.props;
    if (questions.length > 0) {
      return (
        <Question
          question={ this.randomOptions() }
        />);
    }
  }

  randomOptions() {
    const { questions } = this.props;
    const { index } = this.state;
    let questionArray = [{ correct: questions[index].correct_answer }];
    questions[index].incorrect_answers.forEach((incorrect) => {
      questionArray = [...questionArray, { incorrect }];
    });
    let randomAnswers = [];
    while (questionArray.length !== 0) {
      const randomIndex = Math.floor(Math.random() * questionArray.length);
      randomAnswers = [...randomAnswers, questionArray[randomIndex]];
      questionArray.splice(randomIndex, 1);
    }
    return { ...questions[index], randomAnswers };
  }

  render() {
    return (
      <div>
        <Header />
        { this.createQuestion() }
      </div>
    );
  }
}

TelaDojogo.propTypes = { updateQuestions: PropTypes.arrayOf() }.isRequired;

const mapStateToProps = ({ trivia, settings }) => ({
  questions: trivia.questions,
  category: settings.category,
  difficulty: settings.difficulty,
  type: settings.type,
});

const mapDispatchToProps = (dispatch) => ({
  updateQuestions: (questions) => dispatch(setQuestions(questions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TelaDojogo);
