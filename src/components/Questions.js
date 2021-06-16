import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, object } from 'prop-types';
import { updateScore } from '../actions';
import permutate from '../service/permutate';
import decoder from '../service/decoder';

const CORRECT_ANSWER = 'correct-answer';

// Requisito realizado com a lógica e ajuda de RAFAEL MEDEIROS Turma 10A
class Questions extends React.Component {
  constructor() {
    super();
    this.getID = this.getID.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  getID(answer) {
    const { questions } = this.props;
    if (answer === questions[0].correct_answer) return CORRECT_ANSWER;
    return `wrong-answer-${questions[0].incorrect_answers.indexOf(answer)}`;
  }

  checkAnswer({ target }, difficulty) {
    const { parentElement, id } = target;
    const { dispatchScore } = this.props;
    const pointsDifficulty = { hard: 3, medium: 2, easy: 1 };
    if (id === CORRECT_ANSWER) {
      const score = 10 + timer * pointsDifficulty[difficulty];
      dispatchScore(score);
    }
    Array.from(parentElement.children).forEach((child) => {
      if (child.id === CORRECT_ANSWER) {
        child.className = 'answer correct';
      } else {
        child.className = 'answer wrong';
      }
    });
  }

  render() {
    const { questions } = this.props;
    if (questions.length === 0) return <div>Loading...</div>;
    const { category, question, difficulty } = questions[0];
    console.log(questions[0]);
    const answers = [
      questions[0].correct_answer,
      ...questions[0].incorrect_answers,
    ];
    const questionDecoded = decoder(question);
    return (
      <section>
        <h1>Trivia Game!</h1>
        <div className="game-container">
          <h3 data-testid="question-category">{category}</h3>
          <h4 data-testid="question-text">{questionDecoded}</h4>
          <div className="answers-container">
            {permutate(...answers).map((answer, index) => {
              const answerDecoded = decoder(answer);
              return (
                <button
                  type="button"
                  className="answer"
                  data-testid={ this.getID(answer) }
                  id={ this.getID(answer) }
                  key={ index }
                  onClick={ (event) => this.checkAnswer(event, difficulty) }
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
  questions: state.game.questions,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchScore: (score) => dispatch(updateScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
