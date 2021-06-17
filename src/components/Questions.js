import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, object } from 'prop-types';
import permutate from '../service/permutate';
import {
  disableAnswer as disableAnswerAction,
  updateStorageThunk,
} from '../actions';

import decoder from '../service/decoder';

const CORRECT_ANSWER = 'correct-answer';

// Requisito realizado com a lógica e ajuda de RAFAEL MEDEIROS Turma 10A
class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getID = this.getID.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  getID(answer) {
    const { questions } = this.props;
    if (answer === questions[0].correct_answer) return CORRECT_ANSWER;
    return `wrong-answer-${questions[0].incorrect_answers.indexOf(answer)}`;
  }

  async checkAnswer({ target }, difficulty) {
    const { parentElement, id } = target;
    const TEN = 10;
    const { timer, updateStorage } = this.props;
    const pointsDifficulty = { hard: 3, medium: 2, easy: 1 };
    if (id === CORRECT_ANSWER) {
      const { player: { assertions } } = this.props;
      target.className = 'answer correct';
      const score = TEN + timer * pointsDifficulty[difficulty];
      const sumAssertions = assertions + 1;
      const scoreAssertions = { score, sumAssertions };
      await updateStorage(scoreAssertions, () => {
        const { player } = this.props;
        localStorage.setItem('state', JSON.stringify({ player }));
      });
    }
    Array.from(parentElement.children).forEach((child) => {
      if (child.id === CORRECT_ANSWER) {
        child.className = 'answer correct';
      } else {
        child.className = 'answer wrong';
      }
    });
  }

  handleClickNext() {
    const { disableAnswer } = this.props;
    disableAnswer(false);
  }

  render() {
    const { questions, timesUp, timer } = this.props;
    if (questions.length === 0) return <div>Loading...</div>;
    const { category, question, difficulty } = questions[0];
    const answers = [
      questions[0].correct_answer,
      ...questions[0].incorrect_answers,
    ];
    const questionDecoded = decoder(question);
    if (timer === Number('30')) {
      this.randomAnswers = permutate(...answers);
    }
    return (
      <section>
        <h1>Trivia Game!</h1>
        <div className="game-container">
          <h3 data-testid="question-category">{category}</h3>
          <h4 data-testid="question-text">{questionDecoded}</h4>
          <div className="answers-container">
            {this.randomAnswers.map((answer, index) => {
              const answerDecoded = decoder(answer);
              return (
                <button
                  type="button"
                  className="answer"
                  data-testid={ this.getID(answer) }
                  id={ this.getID(answer) }
                  key={ index }
                  onClick={ (event) => this.checkAnswer(event, difficulty) }
                  disabled={ timesUp }
                >
                  {answerDecoded}
                </button>
              );
            })}
          </div>
        </div>
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.handleClickNext }
        >
          Next
        </button>
      </section>
    );
  }
}

Questions.propTypes = {
  questions: arrayOf(object),
}.isRequired;

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  timesUp: state.gameMatch.timesUp,
  timer: state.gameMatch.timer,
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  disableAnswer: () => dispatch(disableAnswerAction()),
  updateStorage: (score, callback) => dispatch(updateStorageThunk(score, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
