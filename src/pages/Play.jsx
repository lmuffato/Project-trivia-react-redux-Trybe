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
      time: 30,
      answered: false,
      isLoading: true,
    };

    this.mountRound = this.mountRound.bind(this);
    this.countdown = this.countdown.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.createOptions = this.createOptions.bind(this);
  }

  async componentDidMount() {
    const { callApiToQuestions, questions, token } = this.props;
    if (questions.length === 0) await callApiToQuestions(token);
    this.mountRound();
  }

  mountRound() {
    const { questions } = this.props;
    const { questionNumber } = this.state;
    const {
      category,
      question,
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer,
    } = questions[questionNumber];
    // const probToChangePosition = 0.5;
    // answersOfRound = answersOfRound.sort(() => Math.random() - probToChangePosition);
    const questionOfRound = (
      <aside key="question_field">
        <h3 key="category" data-testid="question-category">{`Categoria: ${category}`}</h3>
        <h3 key="question" data-testid="question-text">{question}</h3>
      </aside>
    );
    this.setState((old) => ({
      ...old,
      answersOfRound: [incorrectAnswers, correctAnswer],
      questionOfRound,
      isLoading: false,
    }));
  }

  changeColor() {
    this.setState(({
      answered: true,
    }));
    this.mountRound();
  }

  nextQuestion() {
    this.setState((previusState) => ({
      questionNumber: previusState.questionNumber + 1,
      answered: false,
    }), () => this.mountRound());
  }

  countdown() {
    const second = 1000;
    const minTime = 0;
    const { time } = this.state;
    if (time > minTime) {
      setInterval(this.setState(
        (old) => ({
          time: old.time - 1,
        }),
      ), second);
    } else {
      this.setState({ answered: true });
    }
  }

  createOptions() {
    const { answersOfRound, answered } = this.state;
    const options = answersOfRound[0].map((answer, index) => (
      <label htmlFor={ index } key={ index }>
        <input
          id={ index }
          className="wrong-answer"
          type="button"
          name="answer"
          disabled={ answered }
          value={ answer }
          onClick={ () => this.changeColor() }
          style={ { border: answered ? '3px solid rgb(255, 0, 0)' : '' } }
          data-testid={ `wrong-answer-${index}` }
        />
      </label>
    ));

    options.push(
      <label htmlFor="correct-answer" key="correct-answer">
        <input
          data-testid="correct-answer"
          id="correct-answer"
          type="button"
          name="answer"
          className="correct-answer"
          value={ answersOfRound[1] }
          disabled={ answered }
          onClick={ this.changeColor }
          style={ { border: answered ? '3px solid rgb(6, 240, 15)' : '' } }
        />
      </label>,
    );
    return options;
  }

  render() {
    const { answersOfRound, questionOfRound, isLoading } = this.state;
    console.log(answersOfRound);
    return (
      <main>
        <Header />
        {questionOfRound}
        <aside>
          {isLoading ? <div>Carregando...</div> : this.createOptions()}
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
