import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestion } from '../redux/actions';
import Header from '../components/Header';

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answersOfRound: [],
      questionNumber: 0,
      questionOfRound: [],
    };

    this.mountRound = this.mountRound.bind(this);
  }

  async componentDidMount() {
    const { callApiToQuestions, questions, token } = this.props;
    if (questions.length === 0) await callApiToQuestions(token);
    this.mountRound();
  }

  mountRound() {
    const { questions } = this.props;
    const { questionNumber } = this.state;
    const { category, question, incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer } = questions[questionNumber];
    let answersOfRound = incorrectAnswers.map((answer, index) => (
      <label htmlFor={ index } key={ index } data-testid={ `wrong-answer-${index}` }>
        <input
          id={ index }
          type="button"
          name="answer"
          value={ answer }
        />
        {/* {answer} */}
      </label>
    ));
    answersOfRound.push(
      <label htmlFor="correct-answer" key="correct-answer" data-testid="correct-answer">
        <input
          id="correct-answer"
          type="button"
          name="answer"
          value={ correctAnswer }
        />
        {/* {correctAnswer} */}
      </label>,
    );
    const probToChangePosition = 0.5;
    answersOfRound = answersOfRound.sort(() => Math.random() - probToChangePosition);
    const questionOfRound = (
      <aside key="question_field">
        <h3 key="category" data-testid="question-category">{`Categoria: ${category}`}</h3>
        <h3 key="question" data-testid="question-text">{question}</h3>
      </aside>
    );
    this.setState({ answersOfRound, questionOfRound });
  }

  nextQuestion() {
    this.setState((previusState) => ({
      questionNumber: previusState.questionNumber + 1,
    }), () => this.mountRound());
  }

  render() {
    const { answersOfRound, questionOfRound } = this.state;
    return (
      <main>
        <Header />
        {questionOfRound}
        <aside>
          {answersOfRound}
        </aside>

        <button type="button" onClick={ () => this.nextQuestion() }>testar</button>
      </main>
    );
  }
}

Play.propTypes = {
  callApiToQuestions: PropTypes.func,
  token: PropTypes.string,
  questions: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

const mapStateToProps = (state) => ({
  questions: state.player.questions,
  token: state.player.token,
});

const mapDispatchToProps = (dispatch) => ({
  callApiToQuestions: (token) => dispatch(fetchQuestion(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Play);
