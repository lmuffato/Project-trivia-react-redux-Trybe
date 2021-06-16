import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import setAttribute from '../services/setAttribute';
import shuffle from '../services/shuffle';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.renderQuestion = this.renderQuestion.bind(this);
  }

  renderQuestion(results, index) {
    const correctAnswer = [{
      answer: results[index].correct_answer,
      attribute: 'correct-answer',
    }];
    const incorrectAnswers = [...results[index].incorrect_answers];
    const incorrectWAtt = setAttribute(incorrectAnswers);
    const answers = [...correctAnswer, ...incorrectWAtt];
    const randomAnswers = shuffle(answers);
    console.log(randomAnswers);
    return (
      <>
        <h3>{results[index].question}</h3>
        <p data-testid="question-category">
          Category:
          { results[index].category }
        </p>
        <div>Respostas ;</div>
        {randomAnswers.map((elem) => (
          <button
            key={ elem.answer }
            type="button"
            data-testid={ elem.attribute }
          >
            {elem.answer}
          </button>))}
      </>
    );
  }

  render() {
    const index = 0;
    const { results } = this.props;
    return (
      <div>
        {results.length !== 0
        && this.renderQuestion(results, index)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.game.perguntas,
});

Question.propTypes = {
  results: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps)(Question);
