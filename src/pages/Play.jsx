import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestion, updateScore } from '../redux/actions';
import Header from '../components/Header';

const correctAnswerId = 'correct-answer';

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answersOfRound: [],
      questionNumber: 0,
      questionOfRound: [],
      answered: false,
      time: 30,
      isLoading: true,
    };

    this.mountRound = this.mountRound.bind(this);
    this.countdown = this.countdown.bind(this);
    this.calcScore = this.calcScore.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.createOptions = this.createOptions.bind(this);
    this.finishingRound = this.finishingRound.bind(this);
    // this.changeStyle = this.changeStyle.bind(this);
  }

  async componentDidMount() {
    const { callApiToQuestions, questions, token } = this.props;
    if (questions.length === 0) await callApiToQuestions(token);
    this.mountRound();
    this.countdown();
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

  finishingRound({ target = { className: '' } }) {
    console.log('entrou na funishingRound');
    this.setState({
      answered: true,
    });
    if (target.className === correctAnswerId) this.calcScore();
  }

  createOptions() {
    const { questions } = this.props;
    const { questionNumber } = this.state;
    const {
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer,
    } = questions[questionNumber];
    let options = incorrectAnswers.map((answer, index) => (
      {
        id: index,
        className: 'wrong-answer',
        type: 'button',
        name: 'answer',
        value: answer,
        'data-testid': `wrong-answer-${index}`,
        onClick: this.finishingRound,
      }));
    options.push(
      {
        id: correctAnswerId,
        className: correctAnswerId,
        type: 'button',
        name: 'answer',
        value: correctAnswer,
        'data-testid': correctAnswerId,
        onClick: this.finishingRound,
      },
    );
    const probToChange = 0.5;
    options = options.sort(() => Math.random() - probToChange);
    return options;
  }

  mountRound() {
    const { questions } = this.props;
    const { questionNumber } = this.state;
    const {
      category,
      question,
    } = questions[questionNumber];
    const questionOfRound = (
      <aside key="question_field">
        <h3 key="category" data-testid="question-category">{`Categoria: ${category}`}</h3>
        <h3 key="question" data-testid="question-text">{question}</h3>
      </aside>
    );

    this.setState({
      answersOfRound: this.createOptions(),
      // Checar se esta dinâmico
      questionOfRound,
      isLoading: false,
    });
  }

  changeColor() {
    const { answered } = this.state;
    return answered;
  }

  nextQuestion() {
    const { questions, history } = this.props;
    const { questionNumber } = this.state;

    if (questionNumber + 1 < questions.length) {
      this.setState((previousState) => ({
        questionNumber: previousState.questionNumber + 1,
        answered: false,
        time: 30,
      }), () => {
        this.mountRound();
        this.countdown();
      });
    } else {
      return history.push('/ranking');
    }
  }

  countdown() {
    const second = 1000;
    const minTime = 0;
    const counter = setInterval(() => {
      this.setState((previousState) => {
        if (previousState.time === minTime || previousState.answered) {
          this.finishingRound({});
          clearInterval(counter);
        } else {
          return ({ time: previousState.time - 1 });
        }
      });
    }, second);
  }

  render() {
    const { questionOfRound, isLoading, time, answersOfRound, answered } = this.state;
    const color = {
      'wrong-answer': '3px solid rgb(255, 0, 0)',
      'correct-answer': '3px solid rgb(6, 240, 15)',
    };
    const { changeColor } = this;
    return (
      <main>
        <Header />
        {questionOfRound}
        <span>{time}</span>
        <aside>
          {isLoading
            ? <div>Carregando...</div>
            : answersOfRound.map((answer) => (
              <input
                { ...answer }
                key={ answer.id }
                disabled={ changeColor() }
                style={ { border: changeColor() ? color[answer.className] : '' } }
              />
            ))}
        </aside>

        <button
          type="button"
          onClick={ () => this.nextQuestion() }
          data-testid="btn-next"
          style={ {
            visibility: answered ? 'visible' : 'hidden',
          } }
        >
          Próxima
        </button>
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
