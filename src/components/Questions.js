import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, object } from 'prop-types';
import { disableAnswer as disableAnswerAction } from '../actions';
import decoder from '../service/decoder';
import permutate from '../service/permutate';


// Requisito realizado com a lógica e ajuda de RAFAEL MEDEIROS Turma 10A
class Questions extends React.Component {
  constructor() {
    super();
    this.getID = this.getID.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);

  }

  getID(answer) {
    const { questions } = this.props;
    if (answer === questions[0].correct_answer) return 'correct-answer';
    return `wrong-answer-${questions[0].incorrect_answers.indexOf(answer)}`;
  }


  handleClickNext() {
    const { disableAnswer } = this.props;
    disableAnswer(false);
  }

  checkAnswer({ target: { parentElement } }) {
    Array.from(parentElement.children).forEach((child) => {
      if (child.id === 'correct-answer') {
        child.className = 'answer correct';
      } else {
        child.className = 'answer wrong';
      }
    });

  render() {
    const { questions, timesUp } = this.props;
    if (questions.length === 0) return <div>Loading...</div>;
    const { category, question } = questions[0];
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
                  onClick={ this.checkAnswer }
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
});

const mapDispatchToProps = (dispatch) => ({
  disableAnswer: () => dispatch(disableAnswerAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
