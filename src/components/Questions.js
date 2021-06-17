import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, object } from 'prop-types';
import permutate from '../service/permutate';
import {
  updateStorageThunk,
  verifyAnswered as verifyAnsweredAction,
} from '../actions';

import decoder from '../service/decoder';

const CORRECT_ANSWER = 'correct-answer';

// Requisito realizado com a lógica e ajuda de RAFAEL MEDEIROS Turma 10A
class Questions extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      randomAnswers: permutate(props.answers),
    };
    this.getID = this.getID.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  getID(answer) {
    const { questions, questionIndex } = this.props;
    if (answer === questions[questionIndex].correct_answer) {
      return CORRECT_ANSWER;
    }
    return `wrong-answer-${questions[questionIndex].incorrect_answers.indexOf(
      answer,
    )}`;
  }

  async checkAnswer({ target }, difficulty) {
    const { parentElement, id } = target;
    const TEN = 10;
    const { timer, updateStorage, verifyAnswered } = this.props;
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
    verifyAnswered(false);
  }

  render() {
    const { timesUp, questions, questionIndex, answers } = this.props;
    this.answers = answers;
    if (!questions.length) return <div>Loading...</div>;
    const { randomAnswers } = this.state;
    const { question, category, difficulty } = questions[questionIndex];
    const questionDecoded = decoder(question);
    console.log(questionIndex, randomAnswers);

    return (
      <section>
        <h1>Trivia Game!</h1>
        <div className="game-container">
          <h3 data-testid="question-category">{category}</h3>
          <h4 data-testid="question-text">{questionDecoded}</h4>
          <div className="answers-container">
            {randomAnswers[questionIndex].map((answer, index) => {
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
      </section>
    );
  }
}

Questions.propTypes = {
  questions: arrayOf(object),
}.isRequired;

const mapStateToProps = (state) => ({
  // questions: state.game.questions,
  timesUp: state.gameMatch.timesUp,
  timer: state.gameMatch.timer,
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  updateStorage: (score, callback) => dispatch(updateStorageThunk(score, callback)),
  verifyAnswered: (bool) => dispatch(verifyAnsweredAction(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
