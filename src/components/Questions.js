import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, object } from 'prop-types';
import permutate from '../service/permutate';
import decoder from '../service/decoder';

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
    const { questions } = this.props;
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
        <h3 data-testid="question-category">{category}</h3>
        <h4 data-testid="question-text">{questionDecoded}</h4>
        {permutate(...answers).map((answer, index) => {
          const answerDecoded = decoder(answer);
          return (
            <button type="button" data-testid={ this.getID(answer) } key={ index }>
              {answerDecoded}
            </button>
          );
        })}
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

export default connect(mapStateToProps, null)(Questions);
