import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, object } from 'prop-types';
import permutate from '../service/permutate';
// Requisito realizado com a lógica e ajuda de RAFAEL MEDEIROS Turma 10A
class Questions extends React.Component {
  constructor() {
    super();
    this.getID = this.getID.bind(this);
  }

  getID(answer) {
    const { questions } = this.props;
    if (answer === questions[0].correct_answer) return 'correct-answer';
    return `wrong-answer-${questions[0].incorrect_answers.indexOf(answer)}`;
  }

  render() {
    const { questions, timesUp } = this.props;
    if (questions.length === 0) return <div>Loading...</div>;
    const { category, question } = questions[0];
    const answers = [
      questions[0].correct_answer,
      ...questions[0].incorrect_answers,
    ];
    console.log(answers);
    return (
      <section>
        <h1>Trivia Game!</h1>
        <h3 data-testid="question-category">{ category }</h3>
        <h4 data-testid="question-text">{ question }</h4>
        {permutate(...answers).map((answer, index) => (
          <button
            type="button"
            data-testid={ this.getID(answer) }
            key={ index }
            disabled={ timesUp }
          >
            {answer}
          </button>
        ))}
        <button
          type="button"
          data-testid="btn-next"
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

export default connect(mapStateToProps, null)(Questions);
