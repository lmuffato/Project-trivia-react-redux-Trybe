import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuestionsSuccess, getTokenThunk } from '../redux/actions';

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      questionsPosition: 0,
      questions: [],
    };
    this.onClick = this.onClick.bind(this);
    this.requisitions = this.requisitions.bind(this);
    this.boolean = this.boolean.bind(this);
    this.multiple = this.multiple.bind(this);
  }

  componentDidMount() {
    this.requisitions();
  }

  onClick() {
    this.setState((previous) => ({
      questionsPosition: previous.questionsPosition + 1,
    }));
  }

  async requisitions() {
    const { token, getQuestions } = this.props;
    getQuestions(token);
    const response = await fetch(
      `https://opentdb.com/api.php?amount=5&token=${token}`,
    );
    const data = await response.json();
    console.log(data.results);
    this.setState({ loading: false, questions: data.results });
    getQuestions(data.results);
  }

  boolean() {
    const { questions, questionsPosition } = this.state;
    const dataTestIdCorrect = 'correct-answer';
    return (
      <>
        <h2 data-testid="question-category">
          {questions[questionsPosition].category}
        </h2>
        <h3 data-testid="question-text">
          {questions[questionsPosition].question}
        </h3>
        <button
          type="button"
          data-testid={
            questions[questionsPosition].correct_answer === 'True'
              ? dataTestIdCorrect
              : `wrong-answer-${0}`
          }
        >
          True
        </button>
        <button
          type="button"
          data-testid={
            !questions[questionsPosition].correct_answer === 'True'
              ? dataTestIdCorrect
              : `wrong-answer-${0}`
          }
        >
          False
        </button>
      </>
    );
  }

  multiple() {
    const { questions, questionsPosition } = this.state;
    const incorrectAnswers = [
      ...questions[questionsPosition].incorrect_answers,
    ];
    const randomIndex = Math.floor(
      Math.random() * (incorrectAnswers.length + 1),
    );
    incorrectAnswers.splice(
      randomIndex,
      0,
      questions[questionsPosition].correct_answer,
    );
    return (
      <>
        <h2 data-testid="question-category">
          {questions[questionsPosition].category}
        </h2>
        <h3 data-testid="question-text">
          {questions[questionsPosition].question}
        </h3>
        {incorrectAnswers.map((question, index) => (
          <button
            data-testid={
              index === randomIndex ? 'correct-answer' : `wrong-answer-${index}`
            }
            key={ index }
            type="button"
          >
            {question}
          </button>
        ))}
      </>
    );
  }

  render() {
    const { questions, loading, questionsPosition } = this.state;
    console.log(questions);
    if (loading) {
      return 'Carregando...';
    }
    return (
      <div>
        {questions[questionsPosition].type === 'multiple'
          ? this.multiple()
          : this.boolean()}
        <button type="button" onClick={ this.onClick }>
          Próxima pergunta
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (questions) => dispatch(getQuestionsSuccess(questions)),
  getToken: () => dispatch(getTokenThunk()),
});

const mapStateToProps = (state) => ({
  token: state.game.token,
  questions: state.game.questions,
  loadingQuestions: state.game.loadingQuestions,
  loadingToken: state.game.loadingToken,
});

Questions.propTypes = {
  getQuestions: PropTypes.func,
  token: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
