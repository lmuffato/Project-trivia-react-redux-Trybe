import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestion, updateScore } from '../redux/actions';
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
    };

    this.mountRound = this.mountRound.bind(this);
    this.countdown = this.countdown.bind(this);
    this.calcScore = this.calcScore.bind(this);
  }

  async componentDidMount() {
    const { callApiToQuestions, questions, token } = this.props;
    if (questions.length === 0) await callApiToQuestions(token);
    this.mountRound();
  }

  calcScore() {
    const { time, questionNumber } = this.state;
    const { questions, assertations, score, callUpdateScore } = this.props;
    const difficultyOfQuestion = questions[questionNumber].difficulty;
    const weigth = { easy: 1, medium: 2, hard: 3 };
    const baseScoreAssertation = 10;
    const roundScore = baseScoreAssertation + time * weigth[difficultyOfQuestion];
    const newScore = { assertations: assertations + 1, score: score + roundScore };
    callUpdateScore(newScore);
  }

  mountRound() {
    const { questions } = this.props;
    const { questionNumber, answered } = this.state;
    const { category, question, incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer } = questions[questionNumber];
    let answersOfRound = incorrectAnswers.map((answer, index) => (
      <label htmlFor={ index } key={ index } data-testid={ `wrong-answer-${index}` }>
        <input
          id={ index }
          type="button"
          name="answer"
          disabled={ answered }
          value={ answer }
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
    this.setState((previusState) => ({
      questionNumber: previusState.questionNumber + 1,
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
        <button type="button" onClick={ () => this.calcScore() }>Acertei!</button>
      </main>
    );
  }
}

Play.propTypes = {
  callApiToQuestions: PropTypes.func,
  token: PropTypes.string,
  questions: PropTypes.arrayOf(PropTypes.object),
  score: PropTypes.number,
  assertation: PropTypes.number,
  callUpdateScore: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  questions: state.player.questions,
  token: state.player.token,
  score: state.player.score,
  assertations: state.player.assertations,
});

const mapDispatchToProps = (dispatch) => ({
  callApiToQuestions: (token) => dispatch(fetchQuestion(token)),
  callUpdateScore: (newScore) => dispatch(updateScore(newScore)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Play);
