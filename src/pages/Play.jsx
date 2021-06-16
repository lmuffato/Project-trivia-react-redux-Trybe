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
      answered: false,
      time: 30,
    };

    this.mountRound = this.mountRound.bind(this);
    this.countdown = this.countdown.bind(this);
    this.answer = this.answer.bind(this);
  }

  async componentDidMount() {
    const { callApiToQuestions, questions, token } = this.props;
    if (questions.length === 0) await callApiToQuestions(token);
    this.mountRound();
  }

  answer() {
    this.setState({ answered: true });
  }

  mountRound() {
    const { questions } = this.props;
    const { questionNumber, answered } = this.state;
    const {
      category,
      question,
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer,
    } = questions[questionNumber];

    let answersOfRound = incorrectAnswers.map((answer, index) => (
      <label htmlFor={ index } key={ index } data-testid={ `wrong-answer-${index}` }>
        <input
          id={ index }
          type="button"
          name="answer"
          disabled={ answered }
          value={ answer }
          style={ { border: answered ? '3px solid rgb(255, 0, 0)' : '' } }
          onClick={ () => this.answer() }
        />
      </label>
    ));

    answersOfRound.push(
      <label htmlFor="correct-answer" key="correct-answer" data-testid="correct-answer">
        <input
          id="correct-answer"
          type="button"
          name="answer"
          value={ correctAnswer }
          disabled={ answered }
          style={ { border: answered ? '3px solid rgb(6, 240, 15)' : '' } }
          onClick={ () => this.answer() }
        />
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
    this.setState((previousState) => ({
      questionNumber: previousState.questionNumber + 1,
    }), () => this.mountRound());
  }

  countdown() {
    const second = 1000;
    const minTime = 0;
    const { time } = this.state;

    const timer = setInterval(this.setState(
      (old) => ({
        time: old.time - 1,
      }),
    ), second);

    if (time === minTime) {
      this.setState({ answered: true });
      clearInterval(timer);
    }
  }

  render() {
    const { answersOfRound, questionOfRound, time } = this.state;
    return (
      <main>
        <Header />
        {questionOfRound}
        <span>{ time }</span>
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
